/**
 * Services Section - Servicios ofrecidos con layout alternado
 * 4 servicios con fondos y orden de imagen/texto alternados
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: string;
  title: string;
  description: string;
  cta: string;
  mainImage: string;
  decorativeImages: string[];
  bgColor: 'light' | 'dark';
  reverseLayout: boolean; // true = imagen izq, false = imagen der
}

const SERVICES: Service[] = [
  {
    id: 'temporary',
    title: 'Temporary tattoos',
    description: 'Temporary tattoos are a great way to experiment with body art without making a permanent commitment. They are ideal for special events, short-term style changes, or testing out designs before getting inked.',
    cta: 'Try it on',
    mainImage: '/placeholders/service-temporary.webp',
    decorativeImages: [
      '/placeholders/service-temporary-deco-1.webp',
      '/placeholders/service-temporary-deco-2.webp',
    ],
    bgColor: 'light',
    reverseLayout: false, // texto izq, imagen der
  },
  {
    id: 'minimal',
    title: 'Minimal tattoos',
    description: 'Minimal tattoos focus on simplicity and elegance. They use clean lines, small symbols, and subtle detail to create timeless designs that are perfect for those who prefer a more understated look.',
    cta: 'Start Simple',
    mainImage: '/placeholders/service-minimal.webp',
    decorativeImages: [
      '/placeholders/service-minimal-deco-1.webp',
      '/placeholders/service-minimal-deco-2.webp',
    ],
    bgColor: 'dark',
    reverseLayout: true, // imagen izq, texto der
  },
  {
    id: 'lettering',
    title: 'Lettering Tattoos',
    description: 'Lettering tattoos feature meaningful words, names, or quotes expressed through custom fonts and creative typography. They are a powerful way to carry a message, emotion, or personal story with you.',
    cta: 'Design Yours',
    mainImage: '/placeholders/service-lettering.webp',
    decorativeImages: [
      '/placeholders/service-lettering-deco-1.webp',
      '/placeholders/service-lettering-deco-2.webp',
    ],
    bgColor: 'light',
    reverseLayout: false, // texto izq, imagen der
  },
  {
    id: 'full-coverage',
    title: 'Full Coverage Tattoo',
    description: 'Full coverage tattoos are large-scale artworks that span significant areas of the body. These comprehensive designs tell complete stories and showcase the pinnacle of tattoo artistry.',
    cta: 'Go Big',
    mainImage: '/placeholders/service-full.webp',
    decorativeImages: [
      '/placeholders/service-full-deco-1.webp',
      '/placeholders/service-full-deco-2.webp',
    ],
    bgColor: 'dark',
    reverseLayout: true, // imagen izq, texto der
  },
];

export default function Services() {
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!servicesRef.current) return;

    const ctx = gsap.context(() => {
      // Animación para cada servicio
      SERVICES.forEach((service) => {
        const serviceElement = document.querySelector(`[data-service="${service.id}"]`);

        if (serviceElement) {
          // Animar contenido de texto
          gsap.from(serviceElement.querySelector('.service-content'), {
            opacity: 0,
            x: service.reverseLayout ? 50 : -50,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: serviceElement,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });

          // Animar imagen principal
          gsap.from(serviceElement.querySelector('.service-main-image'), {
            opacity: 0,
            x: service.reverseLayout ? -50 : 50,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: serviceElement,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        }
      });
    }, servicesRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="offerings" ref={servicesRef}>
      {SERVICES.map((service) => (
        <section
          key={service.id}
          data-service={service.id}
          className={`section-spacing ${
            service.id !== 'full-coverage' ? 'pb-[15vh]' : ''
          } ${
            service.bgColor === 'light'
              ? 'bg-[var(--color-bg-light)]'
              : 'bg-[var(--color-bg-dark)]'
          }`}
        >
          <div className="container-custom">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                service.reverseLayout ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Contenido de texto */}
              <div
                className={`service-content ${
                  service.reverseLayout ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="max-w-xl">
                  <h2
                    className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${
                      service.bgColor === 'light'
                        ? 'text-[var(--color-text-dark)]'
                        : 'text-white'
                    }`}
                  >
                    {service.title}
                  </h2>

                  <p
                    className={`text-base md:text-lg mb-8 leading-relaxed ${
                      service.bgColor === 'light'
                        ? 'text-[var(--color-text-dark)]/80'
                        : 'text-white/80'
                    }`}
                  >
                    {service.description}
                  </p>

                  <div className="mb-8">
                    <a
                      href="#contact"
                      className={`inline-block px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 ${
                        service.bgColor === 'light'
                          ? 'bg-[var(--color-accent-gold)] text-[var(--color-bg-dark)] hover:bg-[var(--color-accent-gold-hover)]'
                          : 'bg-white text-[var(--color-bg-dark)] hover:bg-[var(--color-accent-gold)]'
                      }`}
                    >
                      {service.cta}
                    </a>
                  </div>

                  {/* Imágenes decorativas pequeñas */}
                  <div
                    className={`flex gap-4 ${
                      service.reverseLayout ? 'justify-start' : 'justify-start'
                    }`}
                  >
                    {service.decorativeImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-lg overflow-hidden"
                      >
                        <img
                          src={img}
                          alt={`${service.title} detail ${idx + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Imagen principal */}
              <div
                className={`service-main-image ${
                  service.reverseLayout ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={service.mainImage}
                    alt={service.title}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
