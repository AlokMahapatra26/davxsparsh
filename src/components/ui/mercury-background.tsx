"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  #define MAX_STEPS 90
  #define MAX_DIST 40.0
  #define SURF_DIST 0.001

  // Smooth Union for fluid merging
  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  // SDF Scene - High-Density Mercury Soup
  float getSceneSDF(vec3 p) {
    float t = uTime * 0.12;
    vec2 mPos = (uMouse - 0.5) * 6.5;
    
    // Attractor
    float d = length(p - vec3(mPos.x, mPos.y, 1.2)) - 0.9;
    
    // Large Fluid Bodies (8 bodies) - Squash & Stretch
    for(int i = 0; i < 8; i++) {
        float fi = float(i);
        vec3 pos = vec3(
            sin(t * 0.7 + fi * 1.5) * 3.8,
            cos(t * 0.5 + fi * 2.2) * 2.2,
            sin(t * 0.9 + fi * 0.8) * 1.0
        );
        vec3 p_str = p - pos;
        p_str.y *= 0.8 + 0.3 * sin(t + fi); // Organic pulse
        float r = 0.5 + 0.3 * sin(t * 0.8 + fi);
        d = smin(d, length(p_str) - r, 1.1); 
    }
    
    // Micro Beads (16 beads for density)
    for(int j = 0; j < 16; j++) {
        float fj = float(j);
        vec3 pos = vec3(
            sin(t * 1.3 + fj * 4.1) * 5.2,
            cos(t * 1.0 + fj * 2.8) * 3.6,
            sin(t * 1.6 + fj * 0.7) * 0.8
        );
        float r = 0.08 + 0.2 * abs(cos(t * 1.8 + fj * 1.2));
        d = smin(d, length(p - pos) - r, 0.45); 
    }
    
    d += sin(p.x * 2.5 + t) * sin(p.y * 2.5 + t) * 0.06;
    return d;
  }

  // Normal via gradient
  vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.001, 0.0);
    vec3 n = vec3(
        getSceneSDF(p + e.xyy) - getSceneSDF(p - e.xyy),
        getSceneSDF(p + e.yxy) - getSceneSDF(p - e.yxy),
        getSceneSDF(p + e.yyx) - getSceneSDF(p - e.yyx)
    );
    return normalize(n);
  }

  // Studio Lighting Environment (Ultra-Chrome Studio)
  vec3 getEnvironment(vec3 r) {
    // Neural High-Key Base
    vec3 col = vec3(1.0);
    
    // Top Studio Softbox (High Energy)
    float overhead = smoothstep(-0.5, 0.5, r.y);
    col = mix(vec3(0.85, 0.9, 0.96), vec3(1.0), overhead);
    
    // SHARP Side Light Bars (The "Chrome" Definition)
    // We use tight dot products to simulate actual studio lamps
    float bar1 = pow(max(0.0, dot(r, normalize(vec3(1.5, 0.2, -0.8)))), 24.0);
    float bar2 = pow(max(0.0, dot(r, normalize(vec3(-1.2, 0.1, -0.4)))), 32.0);
    col += vec3(1.8) * bar1 * overhead;
    col += vec3(1.2) * bar2 * (1.0 - overhead);
    
    // Deep Studio Occluders (Black Panels)
    // This creates the "Mirror" contrast
    float panelA = smoothstep(0.4, 0.9, abs(r.x));
    float panelB = smoothstep(0.2, 0.7, abs(r.z));
    col = mix(col, vec3(0.0), panelA * 0.85 * (1.0 - overhead));
    col = mix(col, vec3(0.01), panelB * 0.65);
    
    // Crisp Studio Strips (Secondary Gloss)
    float strips = pow(abs(cos(r.x * 2.5 + r.z * 1.5 + uTime * 0.05)), 60.0);
    col = mix(col, vec3(1.5), strips * 0.4 * overhead);
    
    return col;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
    
    // High-Aperture Macro Camera
    vec3 ro = vec3(0.0, 0.0, -8.2);
    vec3 rd = normalize(vec3(uv, 3.2)); 
    
    float dTotal = 0.0;
    for(int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * dTotal;
        float dS = getSceneSDF(p);
        dTotal += dS;
        if(dTotal > MAX_DIST || abs(dS) < SURF_DIST) break;
    }
    
    // Pure White Background
    vec3 col = vec3(1.0);
    
    if(dTotal < MAX_DIST) {
        vec3 p = ro + rd * dTotal;
        vec3 n = getNormal(p);
        vec3 v = -rd;
        vec3 r = reflect(rd, n);
        
        // --- ULTRA-CHROME MIRROR BRDF ---
        vec3 reflection = getEnvironment(r);
        
        // Polished Silver Base
        col = reflection * vec3(0.98, 0.99, 1.0);
        
        // METALLIC GLOSS ENGINE
        vec3 lightPos = normalize(vec3((uMouse.x - 0.5) * 15.0, (uMouse.y - 0.5) * 15.0 + 5.0, -3.5));
        
        // 1. Terminal Specular Glint (Sharp Peak)
        float specPeak = pow(max(0.0, dot(reflect(-lightPos, n), v)), 4000.0);
        col += vec3(3.5) * specPeak;
        
        // 2. Anisotropic Rim Glow
        float fres = pow(1.0 - max(0.0, dot(n, v)), 6.0);
        col = mix(col, vec3(1.0), fres * 0.75); // Extreme edge brightness
        
        // 3. Pearlescent Interference (High-end metallic detail)
        col += fres * vec3(0.6, 0.8, 1.2) * 0.6;
        
        // 4. Studio Specular Bloom
        float specSoft = pow(max(0.0, dot(reflect(-lightPos, n), v)), 64.0);
        col += vec3(0.4, 0.6, 1.0) * specSoft * 0.35;
        
        // Ambient Occlusion / Mass Definition
        float curve = 1.0 - abs(dot(n, vec3(0,0,1)));
        col *= mix(1.0, 0.7, pow(curve, 3.5));
    }
    
    // Final Toning (Contrast & Dynamic Range)
    col = pow(col, vec3(0.85)); // Deepen chrome, pop highlights
    col = clamp(col, 0.0, 1.0);
    
    gl_FragColor = vec4(col, 1.0);
  }
`;

export interface MercuryBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  canvasClassName?: string;
  /** Controls canvas opacity/visibility (defaults to 0.65 for a refined, subtle backdrop) */
  opacity?: number;
}

export function MercuryBackground({
  children,
  className,
  canvasClassName,
  opacity = 0.65,
}: MercuryBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        powerPreference: "high-performance",
        alpha: false,
      });
    } catch (e) {
      console.error("WebGL failed to initialize:", e);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      depthTest: false,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const mouseCurrent = new THREE.Vector2(0.5, 0.5);
    const mouseTarget = new THREE.Vector2(0.5, 0.5);
    let animId = 0;
    let isVisible = true;

    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.x = e.clientX / window.innerWidth;
      mouseTarget.y = 1.0 - e.clientY / window.innerHeight;
    };

    const handleResize = () => {
      if (!renderer) return;
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && !animId) {
        animId = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      if (!isVisible) {
        animId = 0;
        return;
      }
      animId = requestAnimationFrame(animate);

      // Smooth mouse lerping matching the reference physics
      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.08;
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.08;

      uniforms.uTime.value = performance.now() * 0.001;
      uniforms.uMouse.value.copy(mouseCurrent);

      renderer?.render(scene, camera);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      geometry.dispose();
      material.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <div className={cn("relative w-full min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white font-sans antialiased overflow-x-hidden", className)}>
      {/* High-Performance Fixed Procedural Mercury WebGL Canvas */}
      <canvas
        ref={canvasRef}
        style={{ opacity }}
        className={cn(
          "fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-500",
          canvasClassName
        )}
      />

      {/* Page Content Layer directly above Mercury */}
      <div className="relative z-10 w-full flex flex-col justify-start">
        {children}
      </div>
    </div>
  );
}

export default MercuryBackground;
