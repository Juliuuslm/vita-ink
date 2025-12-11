/**
 * About Section - "We Get What You're Looking For"
 * Layout asimétrico con 3 cards y animaciones scroll reveal
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_ITEMS = [
  {
    id: 1,
    title: "¿Sin idea? Te ayudamos a crear una.",
    description: "Para eso estamos aquí. Colaborarás uno a uno con un artista que te ayuda a traer tus ideas a la vida — o creamos algo desde cero que encaje perfecto con tu estilo.",
    image: '/placeholders/about-1.webp',
    imageWidth: 400,
  },
  {
    id: 2,
    title: "¿Tu primer tatuaje? Te guiamos paso a paso.",
    description: "Tranquilo, te tenemos cubierto. Nuestros artistas dedican tiempo a explicarte todo — desde el nivel de dolor hasta los cuidados posteriores — para que te sientas seguro y cómodo antes de que ni siquiera toquemos la aguja.",
    image: '/placeholders/about-2.webp',
    imageWidth: 400,
  },
  {
    id: 3,
    title: "¿Preocupado por la seguridad? Es nuestra obsesión.",
    description: "Tu salud es nuestra prioridad. Usamos equipos de grado superior, esterilizados y mantenemos una higiene que supera los estándares de la industria — siempre.",
    image: '/placeholders/about-3.webp',
    imageWidth: 608,
  },
  {
    id: 4,
    title: "Consulta gratuita. Siempre.",
    description: "Conversa con nuestros artistas sobre tu visión. Te ayudamos a traer tus ideas a la vida — sin compromisos. Exploremos juntos qué es posible.",
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
              Entendemos lo que Buscas.
            </h2>
            <p className="about-header-animate text-lg md:text-xl text-[var(--color-text-dark)]/80 mb-8">
              En nuestro estudio creemos que cada tatuaje cuenta una historia. Nuestros
              artistas se dedican a traer tu visión a la vida con
              precisión y creatividad.
            </p>
            <div className="about-header-animate">
              <a
                href="#contact"
                className="inline-block bg-[var(--color-accent-gold)] text-[var(--color-bg-dark)] px-8 py-4 rounded-full font-semibold hover:bg-[var(--color-accent-gold-hover)] transition-all duration-300 hover:-translate-y-1"
              >
                Empecemos
              </a>
            </div>
          </div>
        </div>

        {/* Grid de cards - Layout 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {ABOUT_ITEMS.map((item) => (
            <div
              key={item.id}
              data-about-item={item.id}
              className="flex flex-col max-w-md mx-auto lg:mx-0"
            >
              <div className="mb-6 overflow-hidden rounded-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {item.title}
              </h3>
              <p className="text-base text-[var(--color-text-dark)]/80 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
