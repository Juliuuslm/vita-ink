/**
 * Gallery Section - "A Collection of Artistic Expression and Personal Stories"
 * Mosaico horizontal de 2 filas con alturas mixtas y anchos variables
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Estructura del mosaico: 8 columnas con 12 imágenes
// Columnas con altura completa (full) o media altura (half - 2 imágenes apiladas)
interface GalleryColumn {
  id: number;
  type: 'full' | 'half';
  width: number; // px
  images: number[]; // IDs de imágenes (1-12)
}

const GALLERY_COLUMNS: GalleryColumn[] = [
  { id: 1, type: 'full', width: 400, images: [1] },
  { id: 2, type: 'half', width: 350, images: [2, 3] },
  { id: 3, type: 'full', width: 450, images: [4] },
  { id: 4, type: 'half', width: 300, images: [5, 6] },
  { id: 5, type: 'full', width: 500, images: [7] },
  { id: 6, type: 'half', width: 380, images: [8, 9] },
  { id: 7, type: 'full', width: 420, images: [10] },
  { id: 8, type: 'half', width: 340, images: [11, 12] },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !galleryRef.current) return;

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

      // Animación para las columnas
      gsap.from('.gallery-column', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: galleryRef.current,
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

        {/* Mosaico horizontal con scroll */}
        <div
          ref={galleryRef}
          className="gallery-mosaic-container"
          data-lenis-prevent
        >
          <div className="gallery-mosaic-content">
            {GALLERY_COLUMNS.map((column) => (
              <div
                key={column.id}
                className="gallery-column"
                style={{ width: `${column.width}px` }}
              >
                {column.type === 'full' ? (
                  // Columna con 1 imagen de altura completa
                  <div className="gallery-image-full">
                    <img
                      src={`/placeholders/gallery-${column.images[0]}.jpg`}
                      alt={`Tattoo work ${column.images[0]}`}
                      className="gallery-img"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  // Columna con 2 imágenes apiladas (media altura)
                  <div className="gallery-images-half">
                    <div className="gallery-image-half-top">
                      <img
                        src={`/placeholders/gallery-${column.images[0]}.jpg`}
                        alt={`Tattoo work ${column.images[0]}`}
                        className="gallery-img"
                        loading="lazy"
                      />
                    </div>
                    <div className="gallery-image-half-bottom">
                      <img
                        src={`/placeholders/gallery-${column.images[1]}.jpg`}
                        alt={`Tattoo work ${column.images[1]}`}
                        className="gallery-img"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="mt-6 text-center text-sm text-[var(--color-text-dark)]/60">
          ← Scroll para ver más trabajos →
        </div>
      </div>

      {/* Estilos del mosaico */}
      <style jsx>{`
        /* Contenedor principal - altura fija y scroll horizontal */
        .gallery-mosaic-container {
          width: 100%;
          height: 60vh;
          min-height: 400px;
          max-height: 700px;
          overflow-x: auto;
          overflow-y: hidden;
          overscroll-behavior-x: contain;
          -webkit-overflow-scrolling: touch;
        }

        /* Contenido scrolleable - flexbox horizontal */
        .gallery-mosaic-content {
          display: flex;
          gap: 1rem;
          height: 100%;
          width: max-content;
        }

        /* Cada columna */
        .gallery-column {
          flex-shrink: 0;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        /* Imagen de altura completa (ocupa toda la columna) */
        .gallery-image-full {
          height: 100%;
          width: 100%;
          overflow: hidden;
          border-radius: 1rem;
          position: relative;
        }

        /* Contenedor de imágenes de media altura */
        .gallery-images-half {
          display: grid;
          grid-template-rows: 1fr 1fr;
          gap: 1rem;
          height: 100%;
          width: 100%;
        }

        /* Imagen superior de media altura */
        .gallery-image-half-top,
        .gallery-image-half-bottom {
          overflow: hidden;
          border-radius: 1rem;
          position: relative;
        }

        /* Todas las imágenes */
        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        /* Hover effect en imágenes */
        .gallery-column:hover .gallery-img {
          transform: scale(1.05);
        }

        /* Scrollbar personalizada */
        .gallery-mosaic-container::-webkit-scrollbar {
          height: 8px;
        }

        .gallery-mosaic-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
        }

        .gallery-mosaic-container::-webkit-scrollbar-thumb {
          background: var(--color-accent-gold);
          border-radius: 4px;
        }

        .gallery-mosaic-container::-webkit-scrollbar-thumb:hover {
          background: var(--color-accent-gold-hover);
        }

        /* Responsive: ajustar altura en móviles */
        @media (max-width: 768px) {
          .gallery-mosaic-container {
            height: 50vh;
            min-height: 350px;
          }

          .gallery-mosaic-content {
            gap: 0.75rem;
          }

          .gallery-images-half {
            gap: 0.75rem;
          }
        }

        /* Tablet */
        @media (min-width: 768px) and (max-width: 1024px) {
          .gallery-mosaic-container {
            height: 55vh;
            min-height: 400px;
          }
        }
      `}</style>
    </section>
  );
}
