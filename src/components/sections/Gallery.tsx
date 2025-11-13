/**
 * Gallery Section - Horizontal Scroll Desacoplado
 * Usa position: fixed + spacer manual para evitar conflictos con Lenis smooth scroll
 * Esta arquitectura elimina los saltos bruscos al entrar/salir de la sección
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 12 imágenes de galería con diferentes aspect ratios cinematográficos
const GALLERY_IMAGES = Array.from({ length: 12 }, (_, i) => {
  const is16by9 = i % 2 === 0;
  return {
    id: i + 1,
    src: `/placeholders/gallery-${i + 1}.webp`,
    alt: `Tattoo work ${i + 1}`,
    aspectRatio: is16by9 ? '16/9' : '21/9',
    width: is16by9 ? 711 : 933,
  };
});

export default function Gallery() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!spacerRef.current || !containerRef.current || !trackRef.current) return;

    const spacer = spacerRef.current;
    const container = containerRef.current;
    const track = trackRef.current;

    // Acceder a Lenis si está disponible
    const lenis = (window as any).lenis;

    const ctx = gsap.context(() => {
      // Header fade-in animation
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: spacer,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Calcular distancia de scroll horizontal
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const distance = Math.max(0, trackWidth - viewportWidth);

        console.log('[Gallery] Scroll calculation:', {
          trackWidth,
          viewportWidth,
          distance,
        });

        return -distance;
      };

      const scrollAmount = getScrollAmount();

      // Solo crear animación si hay contenido que scrollear
      if (scrollAmount < 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: spacer,
            start: 'top top',
            end: () => `+=${Math.abs(scrollAmount) * 1.5}`, // 1.5x para dar más espacio de scroll
            scrub: 1,
            pin: container,
            pinSpacing: false, // Usamos spacer manual, no automático
            anticipatePin: 1,
            invalidateOnRefresh: true,

            // Control de Lenis smooth scroll
            onEnter: () => {
              console.log('[Gallery] Entrando - pausando Lenis');
              lenis?.stop();
            },
            onLeave: () => {
              console.log('[Gallery] Saliendo - reactivando Lenis');
              lenis?.start();
            },
            onEnterBack: () => {
              console.log('[Gallery] Re-entrando - pausando Lenis');
              lenis?.stop();
            },
            onLeaveBack: () => {
              console.log('[Gallery] Saliendo hacia atrás - reactivando Lenis');
              lenis?.start();
            },
          },
        });

        tl.to(track, {
          x: getScrollAmount,
          ease: 'none',
        });

        console.log('[Gallery] Animación horizontal creada');
      } else {
        console.warn('[Gallery] No se creó animación - scrollAmount:', scrollAmount);
      }
    }, container);

    // Recalcular en resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
      lenis?.start(); // Asegurar que Lenis esté activo al desmontar
    };
  }, []);

  return (
    <>
      {/* Spacer manual para controlar el espacio de scroll */}
      <div
        ref={spacerRef}
        id="gallery"
        className="w-full bg-[var(--color-bg-light)]"
        style={{ height: 'calc(100vh * 2.5)' }}
        aria-label="Gallery scroll section"
      />

      {/* Container fixed que se hace pin */}
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-screen bg-[var(--color-bg-light)] overflow-hidden z-10"
      >
        {/* Header */}
        <div
          ref={headerRef}
          className="absolute top-0 left-0 w-full pt-20 md:pt-24 pb-8 z-20 pointer-events-none"
        >
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-dark)] mb-4">
                GALLERY
              </h2>
              <p className="text-lg md:text-xl text-[var(--color-text-dark)]/80">
                A Collection of Artistic Expression and Personal Stories
              </p>
            </div>
          </div>
        </div>

        {/* Track horizontal - centrado verticalmente */}
        <div className="absolute inset-0 flex items-center">
          <div
            ref={trackRef}
            className="flex gap-6 md:gap-8 will-change-transform px-6 md:px-12 lg:px-16"
          >
            {GALLERY_IMAGES.map((image) => (
              <div
                key={image.id}
                className="flex-shrink-0"
                style={{ width: `${image.width}px` }}
              >
                <div
                  className="relative h-[280px] md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden group"
                  style={{ aspectRatio: image.aspectRatio }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="eager"
                  />
                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-0 w-full text-center text-sm text-[var(--color-text-dark)]/60 pointer-events-none">
          ↓ Scroll para explorar la galería →
        </div>
      </div>
    </>
  );
}
