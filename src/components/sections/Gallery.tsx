/**
 * Gallery Section - "A Collection of Artistic Expression and Personal Stories"
 * Scroll horizontal con 12 imágenes de trabajos del estudio
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 12 imágenes de galería
const GALLERY_IMAGES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/placeholders/gallery-${i + 1}.jpg`,
  alt: `Tattoo work ${i + 1}`,
}));

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animación para el header
      gsap.from('.gallery-header-animate', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Animación para las imágenes (scroll horizontal reveal)
      gsap.from('.gallery-image-item', {
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-spacing bg-[var(--color-bg-light)]"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="gallery-header-animate text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-dark)] mb-6">
              GALLERY
            </h2>
            <p className="gallery-header-animate text-lg md:text-xl text-[var(--color-text-dark)]/80">
              A Collection of Artistic Expression and Personal Stories
            </p>
          </div>
        </div>

        {/* Scroll Container Horizontal */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="gallery-scroll-container flex gap-4 md:gap-6 overflow-x-auto pb-6"
            style={{
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {GALLERY_IMAGES.map((image) => (
              <div
                key={image.id}
                className="gallery-image-item flex-shrink-0 scroll-snap-align-start"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="relative w-[280px] md:w-[350px] lg:w-[400px] aspect-[3/4] rounded-2xl overflow-hidden group">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Indicador de scroll (opcional - se puede quitar si no gusta) */}
          <div className="mt-6 text-center text-sm text-[var(--color-text-dark)]/60">
            ← Scroll para ver más trabajos →
          </div>
        </div>
      </div>

      {/* Estilos personalizados para scrollbar */}
      <style jsx>{`
        .gallery-scroll-container::-webkit-scrollbar {
          height: 8px;
        }

        .gallery-scroll-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
        }

        .gallery-scroll-container::-webkit-scrollbar-thumb {
          background: var(--color-accent-gold);
          border-radius: 4px;
        }

        .gallery-scroll-container::-webkit-scrollbar-thumb:hover {
          background: var(--color-accent-gold-hover);
        }

        /* Opcional: Ocultar scrollbar pero mantener funcionalidad */
        @media (min-width: 1024px) {
          .gallery-scroll-container::-webkit-scrollbar {
            height: 6px;
          }
        }
      `}</style>
    </section>
  );
}
