/**
 * CTA Section - "THE BEST Tattoo Studio"
 * Animación de texto stroke con loop vertical infinito
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const stroketextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !stroketextRef.current) return;

    const ctx = gsap.context(() => {
      // Scroll reveal para título, párrafo y botón
      gsap.from('.cta-header-animate', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.cta-para-animate', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.cta-button-animate', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Animación loop vertical infinito para stroke text
      // Las palabras suben continuamente en loop
      const strokeTexts = stroketextRef.current.querySelectorAll('.stroke-text-item');

      gsap.set(strokeTexts, {
        yPercent: 0,
      });

      // Crear timeline con loop infinito
      const tl = gsap.timeline({
        repeat: -1,
        ease: 'none',
      });

      // Animar cada texto hacia arriba (-100% cada uno)
      // Total de 3 textos, cada uno muestra 2s
      tl.to(strokeTexts, {
        yPercent: -100,
        duration: 2,
        ease: 'power2.inOut',
        stagger: 2, // Cada texto espera 2s antes de moverse
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="section-spacing bg-[var(--color-bg-dark)] text-white overflow-hidden"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Título */}
          <h2 className="cta-header-animate text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            THE BEST
          </h2>

          {/* Stroke Text Animated - Loop Vertical Infinito */}
          <div
            ref={stroketextRef}
            className="stroke-text-container relative h-[120px] md:h-[160px] lg:h-[200px] overflow-hidden mb-8"
          >
            <div className="stroke-text-wrapper absolute inset-0 flex flex-col">
              <div className="stroke-text-item text-6xl md:text-8xl lg:text-9xl font-bold stroke-text">
                Tattoo
              </div>
              <div className="stroke-text-item text-6xl md:text-8xl lg:text-9xl font-bold stroke-text">
                Studio
              </div>
              <div className="stroke-text-item text-6xl md:text-8xl lg:text-9xl font-bold stroke-text">
                Tattoo
              </div>
              {/* Duplicados para loop seamless */}
              <div className="stroke-text-item text-6xl md:text-8xl lg:text-9xl font-bold stroke-text">
                Studio
              </div>
            </div>
          </div>

          {/* Párrafo */}
          <p className="cta-para-animate text-base md:text-lg lg:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            En nuestro estudio, transformamos tus ideas en arte permanente.
            Trabajamos con los mejores artistas para garantizar que cada tatuaje
            sea una obra maestra única.
          </p>

          {/* Botón CTA */}
          <div className="cta-button-animate">
            <a
              href="#contact"
              className="inline-block bg-[var(--color-accent-gold)] text-[var(--color-text-dark)] px-8 py-4 rounded-full font-bold text-lg hover:bg-[var(--color-accent-gold-hover)] transition-colors duration-300"
            >
              Conecta Ahora
            </a>
          </div>
        </div>
      </div>

      {/* Estilos para stroke text */}
      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 2px var(--color-accent-gold);
          -webkit-text-fill-color: transparent;
          text-stroke: 2px var(--color-accent-gold);
          text-fill-color: transparent;
          line-height: 1;
        }

        @media (min-width: 768px) {
          .stroke-text {
            -webkit-text-stroke: 3px var(--color-accent-gold);
            text-stroke: 3px var(--color-accent-gold);
          }
        }

        .stroke-text-container {
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 20%,
            black 80%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 20%,
            black 80%,
            transparent 100%
          );
        }
      `}</style>
    </section>
  );
}
