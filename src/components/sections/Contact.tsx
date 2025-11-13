/**
 * Contact Section - Formulario de contacto con validación
 * Grid layout con imagen decorativa y formulario
 */
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/Button';
import { CONTACT_INFO } from '../../lib/constants';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    terms: false,
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-content-animate', {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulación de envío (en producción conectar a API)
    console.log('Form submitted:', formData);

    // Mostrar mensaje de éxito
    setFormStatus('success');

    // Reset form
    setFormData({ name: '', email: '', message: '', terms: false });

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      setFormStatus('idle');
    }, 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-spacing bg-[var(--color-bg-light)]"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Card de Ubicación */}
          <div className="contact-image-animate hidden lg:flex items-center justify-center">
            <a
              href={CONTACT_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full aspect-square rounded-3xl bg-gradient-to-br from-[var(--color-accent-gold)]/10 to-transparent flex flex-col items-center justify-center p-8 hover:from-[var(--color-accent-gold)]/20 transition-all duration-500 border-2 border-[var(--color-accent-gold)]/20 hover:border-[var(--color-accent-gold)]/40"
            >
              {/* Map Icon */}
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-24 h-24 text-[var(--color-accent-gold)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              {/* Text */}
              <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-text-dark)] mb-4 text-center">
                Ver Ubicación
              </h3>
              <p className="text-base text-[var(--color-text-dark)]/70 text-center mb-6 max-w-sm">
                {CONTACT_INFO.address}
              </p>

              {/* Arrow/Link indicator */}
              <div className="flex items-center gap-2 text-[var(--color-accent-gold)] font-medium group-hover:gap-4 transition-all duration-300">
                <span>Abrir en Maps</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </a>
          </div>

          {/* Formulario */}
          <div className="contact-content-animate" style={{ opacity: 1 }}>
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-dark)] mb-4">
                Ready to Start Your Tattoo Journey?
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name + Email (Grid 2 columnas) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[var(--color-text-dark)] mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-[var(--color-text-dark)]/20 focus:border-[var(--color-accent-gold)] focus:outline-none transition-colors bg-white text-[var(--color-text-dark)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--color-text-dark)] mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-[var(--color-text-dark)]/20 focus:border-[var(--color-accent-gold)] focus:outline-none transition-colors bg-white text-[var(--color-text-dark)]"
                  />
                </div>
              </div>

              {/* Message (Full width) */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[var(--color-text-dark)] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 rounded-lg border-2 border-[var(--color-text-dark)]/20 focus:border-[var(--color-accent-gold)] focus:outline-none transition-colors resize-none bg-white text-[var(--color-text-dark)] placeholder:text-[var(--color-text-dark)]/40"
                />
              </div>

              {/* Checkbox Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                  className="mt-1 w-5 h-5 rounded border-2 border-[var(--color-text-dark)]/20 text-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)] focus:ring-offset-0 cursor-pointer"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-[var(--color-text-dark)] cursor-pointer"
                >
                  I accept the Terms
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  className="w-full md:w-auto"
                >
                  Book Now
                </Button>
              </div>

              {/* Success Message */}
              {formStatus === 'success' && (
                <div className="p-4 rounded-lg bg-green-100 border-2 border-green-500">
                  <p className="text-green-700 font-medium">
                    Thank you! Your submission has been received!
                  </p>
                </div>
              )}

              {/* Error Message */}
              {formStatus === 'error' && (
                <div className="p-4 rounded-lg bg-red-100 border-2 border-red-500">
                  <p className="text-red-700 font-medium">
                    Oops! Something went wrong while submitting the form.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
