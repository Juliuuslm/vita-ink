/**
 * Artists Section - "Meet Our Talented Artists"
 * Grid de 4 artistas con fotos y roles
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ARTISTS } from '../../lib/constants';

gsap.registerPlugin(ScrollTrigger);

export default function Artists() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

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
      className="section-spacing bg-[var(--color-bg-dark)]"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="artists-header-animate text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Meet Our Talented Artists
            </h2>
            <p className="artists-header-animate text-lg md:text-xl text-white/80">
              Get ready to discover the incredibly talented artists who will
              bring your next tattoo idea to life with their unique skills and
              creativity.
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
