import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { WEBSITE_KNOWLEDGE } from "@/data/website-knowledge";

const SYSTEM_PROMPT = `You are the official support assistant for DAVLabs × Sparsh Design.

LANGUAGE POLICY:
1. PRIMARY / DEFAULT LANGUAGE: English. Always initiate and converse in English by default.
2. DYNAMIC LANGUAGE SWITCHING:
   - If the user explicitly asks to change languages (e.g., "Hindi me baat karo", "Speak in Hindi", "Hinglish me bolo", "Talk in Hinglish", "Switch back to English", etc.), immediately switch to that language and continue all subsequent replies in that language.
   - If the user talks in Hindi or Hinglish, respond back naturally in that language.
   - Keep answers short, friendly, professional, and clear.

STRICT GROUNDING & SCOPE RULES:
1. GROUNDED IN WEBSITE DATA ONLY: Answer only based on the provided website knowledge base. If an answer is not in the data, do NOT guess. Politely advise the user to contact the respective team:
   - Engineering & IT (DAVLabs): contact@davlabs.in
   - Design, Brand & Craft (Sparsh Design): contact@sparshdesign.com
2. SENSITIVE INFO PROTECTION: Never ask for or accept passwords, OTPs, bank/card details, or payment credentials.
3. OFF-TOPIC QUESTIONS: If the user asks about anything unrelated to DAVLabs × Sparsh Design (such as generic coding questions, sports, weather, politics, general trivia), politely state that you can only assist with DAVLabs × Sparsh Design services and offerings.

Website Data / Knowledge Base:
${WEBSITE_KNOWLEDGE}
`;

export async function POST(req: NextRequest) {
  try {
    const rawApiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    const apiKey = rawApiKey?.trim();

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "API_KEY_MISSING",
          reply:
            "Google Gemini API key configure nahi hai. Google AI Studio se API key generate karein aur .env.local file me GEMINI_API_KEY=your_key set karein.",
        },
        { status: 200 }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required." },
        { status: 400 }
      );
    }

    // Google Gemini Strict Multi-Turn Conversation Rules:
    // 1. Roles must be 'user' or 'model'.
    // 2. Turns must strictly alternate (user -> model -> user).
    // 3. Conversation must start with 'user'.
    const normalizedContents: Array<{
      role: "user" | "model";
      parts: [{ text: string }];
    }> = [];

    for (const msg of messages) {
      if (!msg || typeof msg.content !== "string") continue;
      const text = msg.content.trim();
      if (!text) continue;

      const role: "user" | "model" =
        msg.role === "assistant" || msg.role === "model" ? "model" : "user";

      const last = normalizedContents[normalizedContents.length - 1];
      if (last && last.role === role) {
        // Coalesce consecutive messages from the same role to prevent Gemini 400 errors
        last.parts[0].text += `\n${text}`;
      } else {
        normalizedContents.push({ role, parts: [{ text }] });
      }
    }

    // Ensure the conversation begins with a 'user' turn
    while (normalizedContents.length > 0 && normalizedContents[0].role !== "user") {
      normalizedContents.shift();
    }

    if (normalizedContents.length === 0) {
      return NextResponse.json(
        { error: "At least one valid user message is required." },
        { status: 400 }
      );
    }

    // Initialize Google Gen AI client with provided key
    const ai = new GoogleGenAI({ apiKey });

    // Ordered list of candidate Gemini models (gemini-3.5-flash first as requested)
    const candidateModels = Array.from(
      new Set(
        [
          process.env.GEMINI_MODEL,
          "gemini-3.5-flash",
          "gemini-3.5-flash-lite",
          "gemini-3.8-flash",
          "gemini-2.0-flash",
          "gemini-1.5-flash",
        ].filter(Boolean) as string[]
      )
    );

    let reply: string | null = null;
    let lastError: any = null;

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: normalizedContents,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.2, // Low temperature for high factual accuracy
            maxOutputTokens: 800,
          },
        });

        if (response.text) {
          reply = response.text;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${model} failed, trying next candidate:`, err?.message || err);
      }
    }

    if (reply) {
      return NextResponse.json({ reply });
    }

    throw lastError || new Error("All candidate Gemini models failed to generate content.");
  } catch (error: any) {
    console.error("Gemini Chatbot API error:", error);

    return NextResponse.json(
      {
        error: "INTERNAL_ERROR",
        reply:
          "Maaf kijiye, abhi assistant se sampark karne me thodi samasya aa rahi hai. Kripya hamari team se contact@davlabs.in ya contact@sparshdesign.com par sampark karein.",
      },
      { status: 500 }
    );
  }
}
