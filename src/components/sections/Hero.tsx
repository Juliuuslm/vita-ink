/**
 * Hero Section con columnas de imágenes con Infinite Vertical Marquee
 * Efecto automático sin vinculación al scroll - basado en el fetch de Soulmark
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Configuración de columnas de imágenes (4 imágenes por columna)
const COLUMNS = [
  {
    id: 1,
    duration: 20, // Duración en segundos (velocidad del marquee)
    images: ['hero-col-1a', 'hero-col-1b', 'hero-col-1c', 'hero-col-1d'],
  },
  {
    id: 2,
    duration: 25, // Velocidad diferente
    images: ['hero-col-2a', 'hero-col-2b', 'hero-col-2c', 'hero-col-2d'],
  },
  {
    id: 3,
    duration: 20,
    images: ['hero-col-3a', 'hero-col-3b', 'hero-col-3c', 'hero-col-3d'],
  },
  {
    id: 4,
    duration: 25,
    images: ['hero-col-4a', 'hero-col-4b', 'hero-col-4c', 'hero-col-4d'],
  },
  {
    id: 5,
    duration: 20,
    images: ['hero-col-5a', 'hero-col-5b', 'hero-col-5c', 'hero-col-5d'],
  },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Función para esperar a que todas las imágenes carguen
    const waitForImages = (): Promise<void> => {
      const images = Array.from(heroRef.current!.querySelectorAll('img'));
      const promises = images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise<void>((resolve) => {
          img.addEventListener('load', () => resolve(), { once: true });
          img.addEventListener('error', () => resolve(), { once: true });
        });
      });
      return Promise.all(promises).then(() => {});
    };

    const setupAnimations = async () => {
      // Esperar a que las imágenes carguen antes de calcular alturas
      await waitForImages();

      // Pequeño delay adicional para asegurar el layout
      await new Promise(resolve => setTimeout(resolve, 100));

      const ctx = gsap.context(() => {
        // Animación de fade-in para el contenido central
        gsap.from(contentRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
        });

        // Animación del overlay
        gsap.from(overlayRef.current, {
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        });

        // Crear animación de marquee infinito para cada columna
        COLUMNS.forEach((column) => {
          const columnElement = document.querySelector(
            `[data-column="${column.id}"]`
          );

          if (columnElement) {
            // Usar getBoundingClientRect para medición más precisa
            const rect = (columnElement as HTMLElement).getBoundingClientRect();
            const contentHeight = rect.height / 2; // Dividido por 2 porque hay dos listas duplicadas

            // Animación infinita: desplaza desde 0 hasta la mitad de la altura, luego vuelve a 0
            gsap.to(columnElement, {
              y: -contentHeight,
              duration: column.duration,
              repeat: -1, // Loop infinito
              ease: 'none', // Sin easing para movimiento constante
              modifiers: {
                // Asegurar que la animación se mantenga consistente
                y: (y) => {
                  const numY = parseFloat(y);
                  return `${numY % contentHeight}px`;
                }
              }
            });
          }
        });
      }, heroRef);

      return ctx;
    };

    let ctx: gsap.Context | null = null;

    setupAnimations().then((context) => {
      ctx = context;
    });

    // Manejar cambios de orientación y resize en móvil
    const handleResize = () => {
      if (ctx) {
        ctx.revert();
      }
      setupAnimations().then((context) => {
        ctx = context;
      });
    };

    // Debounce para evitar múltiples recalculaciones
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 300);
    };

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('orientationchange', debouncedResize);

    return () => {
      if (ctx) ctx.revert();
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12 md:pb-16"
    >
      {/* Overlay oscuro sobre las imágenes */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 z-10"
      />

      {/* Contenedor de columnas con overflow hidden */}
      <div className="absolute inset-0 flex gap-3 sm:gap-4 overflow-hidden">
        {COLUMNS.map((column) => (
          <div
            key={column.id}
            data-column={column.id}
            className="flex-1 flex flex-col gap-3 sm:gap-4 will-change-transform"
          >
            {/* Primera lista de imágenes */}
            {column.images.map((img, index) => (
              <div key={`${img}-first`} className="relative w-full aspect-[3/4] flex-shrink-0">
                <div className="absolute inset-0 bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={`/placeholders/${img}.webp`}
                    alt={`Hero image ${img}`}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            ))}

            {/* Segunda lista de imágenes (duplicada para loop infinito) */}
            {column.images.map((img) => (
              <div key={`${img}-second`} className="relative w-full aspect-[3/4] flex-shrink-0">
                <div className="absolute inset-0 bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={`/placeholders/${img}.webp`}
                    alt={`Hero image ${img}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Contenido central */}
      <div
        ref={contentRef}
        className="relative z-20 container-custom text-center"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-snug lg:leading-tight">
          Every tattoo should
          <br />
          <span className="text-[var(--color-accent-gold)]">
            mean something.
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10">
          At our tattoo studio, we create custom designs that showcase your
          individuality, ensuring a safe and comfortable experience with our
          talented artists.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#contact"
            className="inline-block bg-[var(--color-accent-gold)] text-[var(--color-bg-dark)] px-8 py-4 rounded-full font-semibold hover:bg-[var(--color-accent-gold-hover)] transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto text-center"
          >
            I'm Ready!
          </a>
          <a
            href="#gallery"
            className="inline-block bg-white text-[var(--color-bg-dark)] px-8 py-4 rounded-full font-semibold hover:bg-[var(--color-accent-gold)] transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto text-center"
          >
            Browse Work
          </a>
        </div>
      </div>
    </section>
  );
}
