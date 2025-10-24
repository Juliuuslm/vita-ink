/**
 * Componente MobileMenu con animaciones GSAP
 * Menú hamburguesa responsive para móvil
 */
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { NAV_LINKS } from '../../lib/constants';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuRef.current || !overlayRef.current || !linksRef.current) return;

    if (isOpen) {
      // Abrir menú
      document.body.style.overflow = 'hidden';

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.4,
        ease: 'power3.out',
      });

      // Animar links
      const links = linksRef.current.children;
      gsap.fromTo(
        links,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.2,
          ease: 'power2.out',
        }
      );
    } else {
      // Cerrar menú
      document.body.style.overflow = '';

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });

      gsap.to(menuRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
      });
    }
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden relative z-[60] w-10 h-10 flex flex-col justify-center items-center gap-1.5"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-[var(--color-accent-gold)] transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-[var(--color-accent-gold)] transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-[var(--color-accent-gold)] transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Overlay oscuro */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black/80 z-40 opacity-0 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menú lateral */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-screen w-[280px] bg-[var(--color-bg-dark)] border-l border-[var(--color-accent-gold)]/20 z-50 translate-x-full"
      >
        <div className="pt-24 px-6">
          <nav ref={linksRef} className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="text-lg font-medium text-white hover:text-[var(--color-accent-gold)] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-white/10">
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="block w-full text-center bg-[var(--color-accent-gold)] text-[var(--color-bg-dark)] py-3 px-6 rounded-full font-semibold hover:bg-[var(--color-accent-gold-hover)] transition-colors duration-300"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
