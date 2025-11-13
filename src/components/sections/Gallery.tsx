/**
 * Gallery Section - "A Collection of Artistic Expression and Personal Stories"
 * Scroll horizontal con imágenes cinematográficas (landscape 16:9 / 21:9)
 * Usa ScrollTrigger pin para convertir scroll vertical en desplazamiento horizontal
 * En móvil: grid vertical simple sin ScrollTrigger para evitar overlap con otras secciones
 */
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 12 imágenes de galería con diferentes aspect ratios cinematográficos
// Calculamos widths explícitos para asegurar que el scrollWidth sea correcto
const GALLERY_IMAGES = Array.from({ length: 12 }, (_, i) => {
  const is16by9 = i % 2 === 0;
  // Para 400px de altura:
  // 16:9 = 711px ancho
  // 21:9 = 933px ancho
  return {
    id: i + 1,
    src: `/placeholders/gallery-${i + 1}.webp`,
    alt: `Tattoo work ${i + 1}`,
    aspectRatio: is16by9 ? '16/9' : '21/9',
    width: is16by9 ? 711 : 933, // widths para 400px altura
  };
});

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si estamos en móvil (< 768px = md breakpoint)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    // En móvil, no aplicar ScrollTrigger horizontal
    if (isMobile) {
      // Solo animación de fade-in del header
      const section = sectionRef.current;
      const ctx = gsap.context(() => {
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
      }, section);

      return () => ctx.revert();
    }

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
          const distance = Math.max(0, trackWidth - viewportWidth);

          // Debug info
          console.log('[Gallery ScrollTrigger]', {
            trackWidth,
            viewportWidth,
            distance,
            willScroll: distance > 0
          });

          return distance;
        };

        const distance = getDistance();

        // Solo crear animación si hay contenido que scrollear
        if (distance > 0) {
          const animation = gsap.to(track, {
            x: () => -getDistance(),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 5%', // Buffer de entrada para transición suave
              end: () => `+=${getDistance() + window.innerHeight * 0.2}`, // Buffer de salida (20vh)
              scrub: 1, // Balance entre suavidad y responsividad
              pin: true,
              pinSpacing: true, // CRÍTICO: true previene doble scroll
              anticipatePin: 1,
              invalidateOnRefresh: true,
              markers: false, // Desactivado para producción
              onUpdate: (self) => {
                console.log('[ScrollTrigger] Progress:', self.progress);
              }
            },
          });

          console.log('[Gallery] ScrollTrigger animation created');
        } else {
          console.warn('[Gallery] No se creó animación - distance:', distance);
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
  }, [isMobile]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-spacing bg-[var(--color-bg-light)] overflow-hidden pb-[15vh]"
    >
      {/* Header dentro del container */}
      <div className="container-custom">
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
      </div>

      {/* Track de scroll - Horizontal en desktop, Grid vertical en móvil */}
      <div className="relative">
        <div
          ref={trackRef}
          className={
            isMobile
              ? 'grid grid-cols-1 gap-6 px-6'
              : 'gallery-track flex gap-6 md:gap-8 will-change-transform px-6 md:px-12 lg:px-16'
          }
        >
          {GALLERY_IMAGES.map((image) => (
            <div
              key={image.id}
              className={isMobile ? 'w-full' : 'flex-shrink-0'}
              style={isMobile ? {} : { width: `${image.width}px` }}
            >
              {/* Altura fija con width explícito para scroll horizontal en desktop */}
              <div
                className={
                  isMobile
                    ? 'relative w-full rounded-2xl overflow-hidden group'
                    : 'relative h-[280px] md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden group'
                }
                style={
                  isMobile ? { aspectRatio: image.aspectRatio } : { aspectRatio: image.aspectRatio }
                }
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading={isMobile ? 'lazy' : 'eager'}
                />
                {/* Overlay hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Indicador de scroll - solo en desktop */}
        {!isMobile && (
          <div className="mt-8 text-center text-sm text-[var(--color-text-dark)]/60 px-6">
            ↓ Scroll para explorar la galería →
          </div>
        )}
      </div>
    </section>
  );
}
