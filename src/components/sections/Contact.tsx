/**
 * Contact Form Section - "Ready to Start Your Tattoo Journey?"
 * Formulario de contacto con validación client-side
 */
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  message: string;
  acceptTerms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  acceptTerms?: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Scroll reveal para el form
      gsap.from('.contact-form-animate', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Validación del form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    // Limpiar error del campo al escribir
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simular envío del form (aquí irías a tu backend/API)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        message: '',
        acceptTerms: false,
      });

      // Reset success message después de 5s
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-spacing bg-[var(--color-bg-light)]"
    >
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="contact-form-animate mb-8 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-dark)] mb-4">
              ¿Listo para Comenzar tu Viaje de Tatuaje?
            </h2>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="contact-form-animate bg-white rounded-3xl p-8 md:p-10 shadow-lg"
          >
            {/* Grid de Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[var(--color-text-dark)] mb-2"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)] transition-all`}
                  placeholder="Tu nombre"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
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
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)] transition-all`}
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Message Field */}
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[var(--color-text-dark)] mb-2"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.message
                    ? 'border-red-500'
                    : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)] transition-all resize-none`}
                placeholder="Cuéntanos sobre tu idea de tatuaje..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            {/* Checkbox Terms */}
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)]"
                />
                <span className="text-sm text-[var(--color-text-dark)]">
                  Acepto los términos y condiciones
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="mt-1 text-sm text-red-500 ml-8">{errors.acceptTerms}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--color-accent-gold)] text-[var(--color-text-dark)] px-8 py-4 rounded-full font-bold text-lg hover:bg-[var(--color-accent-gold-hover)] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Reservar Ahora'}
            </button>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                ¡Gracias! Tu mensaje ha sido enviado correctamente.
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                Oops! Algo salió mal. Por favor intenta de nuevo.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
