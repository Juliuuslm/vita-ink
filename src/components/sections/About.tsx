/**
 * About Section - "We Get What You're Looking For"
 * Layout asimétrico con 3 cards y animaciones scroll reveal
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_ITEMS = [
  {
    id: 1,
    title: "No Idea? We'll Help You Create One.",
    description: "That's what we're here for. You'll collaborate one-on-one with an artist who helps bring your ideas to life — or create something from scratch that fits your vibe perfectly.",
    image: '/placeholders/about-1.webp',
    imageWidth: 400,
  },
  {
    id: 2,
    title: "First Tattoo? We'll Walk You Through It.",
    description: "We've got you. Our artists take the time to explain everything — from the pain level to aftercare — so you feel confident and comfortable before we even pick up the needle.",
    image: '/placeholders/about-2.webp',
    imageWidth: 400,
  },
  {
    id: 3,
    title: "Worried About Safety? We're Obsessed With It.",
    description: "Your health is our priority. We use top-grade, sterile equipment and maintain studio hygiene that exceeds industry standards — always.",
    image: '/placeholders/about-3.webp',
    imageWidth: 608,
  },
  {
    id: 4,
    title: "Free Consultation. Always.",
    description: "Talk with our artists about your vision. We'll help bring your ideas to life — no commitment required. Let's explore what's possible together.",
    image: '/placeholders/about-1.webp',
    imageWidth: 400,
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animación para el header (título, descripción, botón)
      gsap.from('.about-header-animate', {
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

      // Animación para cada card (imagen y contenido)
      ABOUT_ITEMS.forEach((item) => {
        gsap.from(`[data-about-item="${item.id}"]`, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `[data-about-item="${item.id}"]`,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about-us"
      ref={sectionRef}
      className="section-spacing bg-[var(--color-bg-light)] text-[var(--color-text-dark)] relative overflow-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundPosition: 'right center',
      }}
    >
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <div className="max-w-3xl">
            <h2 className="about-header-animate text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              We Get What You're Looking For.
            </h2>
            <p className="about-header-animate text-lg md:text-xl text-[var(--color-text-dark)]/80 mb-8">
              At our tattoo studio, we believe every tattoo tells a story. Our
              artists are dedicated to bringing your vision to life with
              precision and creativity.
            </p>
            <div className="about-header-animate">
              <a
                href="#contact"
                className="inline-block bg-[var(--color-accent-gold)] text-[var(--color-bg-dark)] px-8 py-4 rounded-full font-semibold hover:bg-[var(--color-accent-gold-hover)] transition-all duration-300 hover:-translate-y-1"
              >
                Let's Get Started
              </a>
            </div>
          </div>
        </div>

        {/* Grid de cards - Layout asimétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Item 1 - Columna completa en móvil, izquierda en desktop */}
          <div
            data-about-item="1"
            className="flex flex-col max-w-md mx-auto lg:mx-0"
          >
            <div className="mb-6 overflow-hidden rounded-2xl">
              <img
                src={ABOUT_ITEMS[0].image}
                alt={ABOUT_ITEMS[0].title}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {ABOUT_ITEMS[0].title}
            </h3>
            <p className="text-base text-[var(--color-text-dark)]/80 leading-relaxed">
              {ABOUT_ITEMS[0].description}
            </p>
          </div>

          {/* Items 2 y 3 - Stack vertical en la columna derecha */}
          <div className="flex flex-col gap-8 lg:gap-12">
            {/* Item 2 */}
            <div
              data-about-item="2"
              className="flex flex-col max-w-md mx-auto lg:mx-0"
            >
              <div className="mb-6 overflow-hidden rounded-2xl">
                <img
                  src={ABOUT_ITEMS[1].image}
                  alt={ABOUT_ITEMS[1].title}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {ABOUT_ITEMS[1].title}
              </h3>
              <p className="text-base text-[var(--color-text-dark)]/80 leading-relaxed">
                {ABOUT_ITEMS[1].description}
              </p>
            </div>

            {/* Item 3 - Imagen más grande */}
            <div
              data-about-item="3"
              className="flex flex-col max-w-lg mx-auto lg:mx-0"
            >
              <div className="mb-6 overflow-hidden rounded-2xl">
                <img
                  src={ABOUT_ITEMS[2].image}
                  alt={ABOUT_ITEMS[2].title}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {ABOUT_ITEMS[2].title}
              </h3>
              <p className="text-base text-[var(--color-text-dark)]/80 leading-relaxed">
                {ABOUT_ITEMS[2].description}
              </p>
            </div>

            {/* Item 4 - Nueva card */}
            <div
              data-about-item="4"
              className="flex flex-col max-w-md mx-auto lg:mx-0"
            >
              <div className="mb-6 overflow-hidden rounded-2xl">
                <img
                  src={ABOUT_ITEMS[3].image}
                  alt={ABOUT_ITEMS[3].title}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {ABOUT_ITEMS[3].title}
              </h3>
              <p className="text-base text-[var(--color-text-dark)]/80 leading-relaxed">
                {ABOUT_ITEMS[3].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
