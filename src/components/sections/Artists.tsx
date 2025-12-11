/**
 * Artists Section - "Meet Our Talented Artists"
 * Grid de 4 artistas con fotos y roles
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ARTISTS } from '../../lib/constants';

export default function Artists() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Importar ScrollTrigger dinámicamente para evitar problemas SSR
    import('gsap/ScrollTrigger').then((module) => {
      const ScrollTrigger = module.default;
      gsap.registerPlugin(ScrollTrigger);
    }).catch(() => {
      console.warn('[Artists] ScrollTrigger initialization failed');
    });

    const ctx = gsap.context(() => {
      // Animación para el header (título y descripción)
      gsap.from('.artists-header-animate', {
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

      // Animación para cada artist card
      gsap.from('.artist-card', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.artists-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="artists"
      ref={sectionRef}
      className="pb-[var(--spacing-section-mobile)] md:pb-[var(--spacing-section)] bg-[var(--color-bg-dark)]"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="artists-header-animate text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Conoce a Nuestros Artistas
            </h2>
            <p className="artists-header-animate text-lg md:text-xl text-white/80">
              Prepárate para conocer los talentosos artistas que traerán
              tu próxima idea de tatuaje a la vida con sus habilidades únicas y
              creatividad.
            </p>
          </div>
        </div>

        {/* Grid de artistas */}
        <div className="artists-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {ARTISTS.map((artist) => (
            <div key={artist.id} className="artist-card group">
              {/* Imagen del artista */}
              <div className="mb-6 overflow-hidden rounded-2xl">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-auto aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Información del artista */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  {artist.name}
                </h3>
                <p className="text-base text-white/70">{artist.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
