/**
 * Testimonials Section - Slider de testimonios de clientes
 * Autoplay cada 2 segundos con navegación manual
 */
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from '../../lib/constants';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  const totalSlides = TESTIMONIALS.length;

  // Autoplay - avanza cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 2000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  // Animación de entrada de la sección
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.testimonials-content', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animación al cambiar de slide
  useEffect(() => {
    if (!slideRef.current) return;

    gsap.fromTo(
      slideRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [currentSlide]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const currentTestimonial = TESTIMONIALS[currentSlide];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-spacing bg-[var(--color-bg-dark)]"
    >
      <div className="container-custom">
        <div className="testimonials-content max-w-4xl mx-auto">
          {/* Slide actual */}
          <div
            ref={slideRef}
            className="testimonial-slide bg-[var(--color-bg-dark)] rounded-3xl p-8 md:p-12 lg:p-16"
          >
            {/* Estrellas de rating */}
            <div className="flex justify-center gap-2 mb-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 md:w-7 md:h-7"
                  fill="var(--color-accent-gold)"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-center mb-10">
              <p className="text-xl md:text-2xl lg:text-3xl text-[var(--color-text-primary)] font-light leading-relaxed">
                "{currentTestimonial.quote}"
              </p>
            </blockquote>

            {/* Author info */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[var(--color-accent-gold)]">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <div className="text-lg md:text-xl font-semibold text-[var(--color-text-primary)] mb-1">
                  {currentTestimonial.name}
                </div>
                <div className="text-sm md:text-base text-[var(--color-text-secondary)]">
                  {currentTestimonial.role}
                </div>
              </div>
            </div>
          </div>

          {/* Controles de navegación */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {/* Botón Previous */}
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full border-2 border-[var(--color-accent-gold)] text-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)] hover:text-[var(--color-bg-dark)] transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Dots Navigation */}
            <div className="flex gap-3">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-[var(--color-accent-gold)] scale-125'
                      : 'bg-[var(--color-text-secondary)] opacity-50 hover:opacity-100'
                  }`}
                />
              ))}
            </div>

            {/* Botón Next */}
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full border-2 border-[var(--color-accent-gold)] text-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)] hover:text-[var(--color-bg-dark)] transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
