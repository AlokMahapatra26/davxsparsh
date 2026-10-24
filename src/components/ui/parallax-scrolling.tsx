'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0,
        },
      });

      const layers = [
        { layer: '1', yPercent: 70 },
        { layer: '2', yPercent: 55 },
        { layer: '3', yPercent: 40 },
        { layer: '4', yPercent: 10 },
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: 'none',
          },
          idx === 0 ? undefined : '<'
        );
      });
    }

    const lenis = new Lenis({
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (triggerElement) {
        gsap.killTweensOf(triggerElement);
      }
      lenis.destroy();
    };
  }, []);

  return (
    <div className="parallax" ref={parallaxRef}>
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>

          <div data-parallax-layers className="parallax__layers">
            {/* Layer 1: Background Sky */}
            <img
              src="https://cdn.21st.dev/assets/mirror/a4/a43f4eae3459c461345ee676f12d6e1ddca65e8a5279a5af00d475b17ff83aea.webp"
              loading="eager"
              width="800"
              data-parallax-layer="1"
              alt="Atmospheric sky"
              className="parallax__layer-img"
            />

            {/* Layer 2: Midground Mountain Ridges */}
            <img
              src="https://cdn.21st.dev/assets/mirror/50/50ca6a0d36d2780bfcb469d6db7eaec0be7e0d2961ba69a63d2a1473b040338d.webp"
              loading="eager"
              width="800"
              data-parallax-layer="2"
              alt="Distant mountains"
              className="parallax__layer-img"
            />

            {/* Layer 3: Minimal Brand Title */}
            <div data-parallax-layer="3" className="parallax__layer-title">
              <h1 className="parallax__title">
                DAVLabs <span className="title-symbol">&times;</span> Sparsh
              </h1>
            </div>

            {/* Layer 4: Foreground Transparent Cutout Peaks */}
            <img
              src="https://cdn.21st.dev/assets/mirror/e1/e1c8137b5f971c3b3ec1a0f9e79b9c17018767005f844a10082b890472afecfb.webp"
              loading="eager"
              width="800"
              data-parallax-layer="4"
              alt="Foreground mountain peaks"
              className="parallax__layer-img parallax__foreground"
            />
          </div>

          <div className="parallax__fade"></div>
        </div>
      </section>

      {/* Clean minimal statement below hero */}
      <section className="parallax__content">
        <div className="content-minimal">
          <h2 className="minimal-headline">
            Systems Engineering <span className="minimal-amp">&amp;</span> Sensory Design
          </h2>
          <p className="minimal-desc">
            An interdisciplinary partnership between DAVLabs and Sparsh Design.
          </p>
        </div>
      </section>
    </div>
  );
}

export default ParallaxComponent;
