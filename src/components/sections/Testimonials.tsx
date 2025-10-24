/**
 * Testimonials Section - "What Our Clients Say"
 * Slider automático con navegación de flechas y dots
 */
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { TESTIMONIALS } from '../../lib/constants';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = TESTIMONIALS.length;

  // Función para ir al slide siguiente
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  // Función para ir al slide anterior
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Función para ir a un slide específico
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Animación de transición con GSAP
  useEffect(() => {
    if (!slideRef.current) return;

    // Animar entrada del slide actual
    gsap.fromTo(
      slideRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }
    );
  }, [currentIndex]);

  // Auto-play cada 5 segundos
  useEffect(() => {
    // Limpiar timeout anterior
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }

    // Configurar nuevo timeout
    autoPlayRef.current = setTimeout(() => {
      nextSlide();
    }, 5000);

    // Cleanup al desmontar
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentIndex]);

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section
      id="testimonials"
      className="section-spacing bg-[var(--color-bg-light)]"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Slide Container */}
          <div
            ref={slideRef}
            className="testimonial-slide bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-lg"
          >
            {/* Estrellas de rating */}
            <div className="flex justify-center gap-2 mb-8">
              {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                <svg
                  key={i}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="var(--color-accent-gold)"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl lg:text-3xl text-center text-[var(--color-text-dark)] font-medium mb-8 leading-relaxed">
              "{currentTestimonial.quote}"
            </blockquote>

            {/* Author Info */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <div className="font-bold text-lg text-[var(--color-text-dark)]">
                  {currentTestimonial.name}
                </div>
                <div className="text-[var(--color-text-dark)]/60">
                  {currentTestimonial.role}
                </div>
              </div>
            </div>
          </div>

          {/* Navegación */}
          <div className="mt-8 flex items-center justify-center gap-6">
            {/* Botón Anterior */}
            <button
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full bg-[var(--color-accent-gold)] text-[var(--color-text-dark)] flex items-center justify-center hover:bg-[var(--color-accent-gold-hover)] transition-colors duration-300"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Dots de navegación */}
            <div className="flex gap-3">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[var(--color-accent-gold)] w-8'
                      : 'bg-[var(--color-text-dark)]/30 hover:bg-[var(--color-text-dark)]/50'
                  }`}
                />
              ))}
            </div>

            {/* Botón Siguiente */}
            <button
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full bg-[var(--color-accent-gold)] text-[var(--color-text-dark)] flex items-center justify-center hover:bg-[var(--color-accent-gold-hover)] transition-colors duration-300"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
