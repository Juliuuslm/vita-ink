/**
 * Contact Section - Formulario de contacto con validación
 * Grid layout con imagen decorativa y formulario
 */
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/Button';

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
          {/* Imagen decorativa (vacía en el original) */}
          <div className="contact-image-animate hidden lg:block">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-[var(--color-accent-gold)]/10 to-transparent" />
          </div>

          {/* Formulario */}
          <div className="contact-content-animate">
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
