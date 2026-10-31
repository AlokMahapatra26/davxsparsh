"use client";

import React from 'react';
import { FAQ, FAQItemData } from '@/components/ui/faq-tabs';

export const faqCategories: Record<string, string> = {
  "web-dev": "Web Development",
  "mobile-dev": "Mobile Development", 
  "ui-ux": "UI/UX Design",
  "copywriting": "Copywriting"
};

export const faqData: Record<string, FAQItemData[]> = {
  "web-dev": [
    {
      question: "What is web development?",
      answer: "Web development is the process of building and maintaining websites. It involves a combination of client-side and server-side programming, database management, and other web-related technologies."
    },
    {
      question: "What programming languages are essential for web development?",
      answer: "Essential languages for web development include HTML, CSS, and JavaScript for front-end development. For back-end development, popular languages include Python, Ruby, PHP, Java, and Node.js."
    },
    {
      question: "What's the difference between front-end and back-end development?",
      answer: "Front-end development focuses on the user interface and user experience of a website, while back-end development deals with server-side logic, databases, and application integration."
    },
    {
      question: "How long does it typically take to develop a website?",
      answer: "The time to develop a website can vary greatly depending on its complexity. A simple static website might take a few days, while a complex web application could take several months or even years."
    },
    {
      question: "What is responsive web design?",
      answer: "Responsive web design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes. It ensures that websites are accessible and visually appealing across different platforms."
    }
  ],
  "mobile-dev": [
    {
      question: "What is mobile development?",
      answer: "Mobile development is the process of creating software applications that run on mobile devices such as smartphones and tablets. It involves designing, coding, and testing applications for mobile operating systems like iOS and Android."
    },
    {
      question: "What's the difference between native and cross-platform mobile development?",
      answer: "Native development involves building separate apps for each platform using platform-specific languages (Swift for iOS, Java/Kotlin for Android). Cross-platform development uses frameworks like React Native or Flutter to build a single codebase that works on multiple platforms."
    },
    {
      question: "What are some popular mobile app development frameworks?",
      answer: "Popular mobile app development frameworks include React Native, Flutter, Xamarin, Ionic, and NativeScript. Each has its own strengths and is suited for different types of projects."
    },
    {
      question: "How do you ensure mobile app security?",
      answer: "Mobile app security involves practices such as secure coding, data encryption, secure authentication methods, regular security audits, and staying up-to-date with the latest security patches and best practices."
    },
    {
      question: "What is the typical mobile app development lifecycle?",
      answer: "The typical mobile app development lifecycle includes stages such as planning, design, development, testing, deployment, and maintenance. It often follows an iterative process with continuous updates and improvements."
    }
  ],
  "ui-ux": [
    {
      question: "What is UI/UX design?",
      answer: "UI (User Interface) design focuses on the visual elements of a digital product, while UX (User Experience) design deals with the overall feel and functionality of the product. Together, they aim to create products that are both visually appealing and easy to use."
    },
    {
      question: "What's the difference between UI and UX design?",
      answer: "UI design focuses on the look and layout of a product's interface, including colors, typography, and visual elements. UX design is broader, encompassing the entire user journey and how users interact with the product."
    },
    {
      question: "What tools do UI/UX designers commonly use?",
      answer: "Common tools for UI/UX design include Sketch, Figma, Adobe XD, InVision, and Protopie for design and prototyping. Research and testing tools might include UserTesting, Hotjar, and Optimal Workshop."
    },
    {
      question: "What is a user persona?",
      answer: "A user persona is a fictional representation of your ideal user or customer. It's based on user research and includes details about the persona's background, goals, challenges, and behaviors. Personas help guide design decisions by keeping the focus on the end-user."
    },
    {
      question: "What is the importance of user testing in UI/UX design?",
      answer: "User testing is crucial in UI/UX design as it provides direct feedback from actual users. It helps identify usability issues, validate design decisions, and ensure that the product meets user needs and expectations."
    }
  ],
  "copywriting": [
    {
      question: "What is copywriting?",
      answer: "Copywriting is the act of writing text for the purpose of advertising or other forms of marketing. The product, called copy, is written content that aims to increase brand awareness and ultimately persuade a person or group to take a particular action."
    },
    {
      question: "What's the difference between copywriting and content writing?",
      answer: "While both involve writing, copywriting is specifically aimed at persuasion and driving action (like making a purchase), while content writing is more focused on informing, educating, or entertaining the reader."
    },
    {
      question: "What are some key elements of effective copywriting?",
      answer: "Key elements of effective copywriting include understanding the target audience, crafting compelling headlines, focusing on benefits rather than features, using persuasive language, and including a clear call-to-action."
    },
    {
      question: "How important is SEO in copywriting?",
      answer: "SEO (Search Engine Optimization) is very important in copywriting, especially for digital content. It helps ensure that your copy reaches your target audience by making it more visible in search engine results. This involves using relevant keywords, creating quality content, and following SEO best practices."
    },
    {
      question: "What is a call-to-action (CTA) in copywriting?",
      answer: "A call-to-action (CTA) is a prompt in your copy that tells the reader what to do next. It's usually a command verb like 'Buy Now,' 'Sign Up,' or 'Learn More.' An effective CTA is clear, compelling, and creates a sense of urgency."
    }
  ]
};

const FAQDemo = ({ className, id = "faq" }: { className?: string; id?: string }) => {
  return (
    <FAQ 
      id={id}
      title="Frequently Asked Questions"
      subtitle="Knowledge Base & Answers"
      categories={faqCategories}
      faqData={faqData}
      className={className}
    />
  );
};

import StatsBand from "@/components/ui/stats-band";

export function StatsBandDemo() {
  return (
    <div className="w-full">
      <StatsBand
        layout="divided"
        title="Fast, steady, and close to everyone"
        description="Measured across every region from October 2025 to September 2026."
      />
    </div>
  );
}

export { FAQDemo };
export default FAQDemo;
