/**
 * CTA Section - "THE BEST"
 * Marquee vertical infinito con texto stroke (STUDIO / TATTOO alternando)
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const strokeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !strokeContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Animación fade-in del título principal "THE BEST"
      gsap.from('.cta-main-title', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Animación marquee vertical infinito (similar al Hero pero vertical)
      // Duplicamos la lista para loop seamless
      const container = strokeContainerRef.current;
      if (container) {
        const totalHeight = container.scrollHeight / 2; // Mitad porque duplicamos

        gsap.to(container, {
          y: `-${totalHeight}px`,
          duration: 6,
          ease: 'none',
          repeat: -1,
        });
      }

      // Animación del párrafo
      gsap.from('.cta-paragraph', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Animación del botón
      gsap.from('.cta-button-wrapper', {
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        delay: 0.5,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="section-spacing bg-[var(--color-bg-dark)] relative overflow-hidden"
    >
      {/* Background decorativo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-gold)]/5 via-transparent to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Título principal "THE BEST" */}
          <h2 className="cta-main-title text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] mb-8">
            THE BEST
          </h2>

          {/* Contenedor del marquee vertical con texto stroke */}
          <div className="stroke-marquee-container relative h-[200px] md:h-[280px] lg:h-[350px] overflow-hidden mb-8">
            <div
              ref={strokeContainerRef}
              className="stroke-marquee-track absolute inset-0 flex flex-col items-center justify-start"
            >
              {/* Primera lista */}
              <div className="stroke-text-item">TATTOO</div>
              <div className="stroke-text-item">STUDIO</div>
              {/* Segunda lista duplicada para loop seamless */}
              <div className="stroke-text-item">TATTOO</div>
              <div className="stroke-text-item">STUDIO</div>
            </div>
          </div>

          {/* Párrafo descriptivo */}
          <p className="cta-paragraph text-lg md:text-xl lg:text-2xl text-[var(--color-text-primary)] mb-12 max-w-2xl mx-auto font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fermentum quis enim eget
            pharetra. Ut mattis malesuada ante quis posuere.
          </p>

          {/* CTA Button */}
          <div className="cta-button-wrapper">
            <Button
              variant="primary"
              size="large"
              href="#contact"
              className="text-base md:text-lg lg:text-xl px-6 md:px-10 py-5 inline-flex items-center gap-3"
            >
              Connect Now
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Estilos para texto stroke con marquee vertical */}
      <style jsx>{`
        .stroke-text-item {
          font-size: clamp(4rem, 15vw, 12rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.02em;
          color: transparent;
          -webkit-text-stroke: 2px var(--color-accent-gold);
          text-stroke: 2px var(--color-accent-gold);
          font-family: var(--font-heading);
          text-transform: uppercase;
          flex-shrink: 0;
          margin-bottom: 2rem;
        }

        .stroke-marquee-container {
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 20%,
            black 80%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 20%,
            black 80%,
            transparent 100%
          );
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .stroke-text-item {
            -webkit-text-stroke: 1.5px var(--color-accent-gold);
            text-stroke: 1.5px var(--color-accent-gold);
          }
        }
      `}</style>
    </section>
  );
}
