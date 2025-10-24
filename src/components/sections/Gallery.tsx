/**
 * Gallery Section - "A Collection of Artistic Expression and Personal Stories"
 * Scroll horizontal con imágenes cinematográficas (landscape 16:9 / 21:9)
 * Usa ScrollTrigger pin para convertir scroll vertical en desplazamiento horizontal
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 12 imágenes de galería con diferentes aspect ratios cinematográficos
const GALLERY_IMAGES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/placeholders/gallery-${i + 1}.jpg`,
  alt: `Tattoo work ${i + 1}`,
  // Alternar entre 16:9 y 21:9 para variedad visual
  aspectRatio: i % 2 === 0 ? '16/9' : '21/9',
}));

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    // Esperar a que todas las imágenes carguen antes de medir
    const waitImagesLoaded = async (container: HTMLElement) => {
      const images = Array.from(container.querySelectorAll('img'));
      await Promise.all(
        images.map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
          });
        })
      );
    };

    const setupAnimation = async () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // Esperar a que las imágenes carguen
      await waitImagesLoaded(track);

      // Crear contexto GSAP para cleanup fácil
      const ctx = gsap.context(() => {
        // Header fade-in
        gsap.from('.gallery-header-animate', {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        // Calcular la distancia total de scroll horizontal
        const getDistance = () => {
          const trackWidth = track.scrollWidth;
          const viewportWidth = window.innerWidth;
          return Math.max(0, trackWidth - viewportWidth);
        };

        const distance = getDistance();

        // Solo crear animación si hay contenido que scrollear
        if (distance > 0) {
          gsap.to(track, {
            x: () => `-${getDistance()}`,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${getDistance()}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      }, section);

      // Cleanup
      return () => ctx.revert();
    };

    let cleanup: (() => void) | undefined;
    setupAnimation().then((fn) => {
      cleanup = fn;
    });

    // Recalcular en resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cleanup?.();
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-spacing bg-[var(--color-bg-light)] overflow-hidden"
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

        {/* Track de scroll horizontal (será animado con ScrollTrigger pin) */}
        <div className="relative">
          <div
            ref={trackRef}
            className="gallery-track flex gap-6 md:gap-8 will-change-transform"
          >
            {GALLERY_IMAGES.map((image) => (
              <div key={image.id} className="flex-shrink-0">
                {/* Altura fija, ancho automático según aspect ratio */}
                <div
                  className="relative h-[280px] md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden group"
                  style={{
                    aspectRatio: image.aspectRatio,
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Indicador de scroll */}
          <div className="mt-8 text-center text-sm text-[var(--color-text-dark)]/60">
            ↓ Scroll para explorar la galería →
          </div>
        </div>
      </div>
    </section>
  );
}
