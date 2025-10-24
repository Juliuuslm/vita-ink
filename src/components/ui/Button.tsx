/**
 * Button Component
 * Componente reutilizable de botón con variantes y tamaños
 */
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  // Clases base
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-bg-dark)]';

  // Variantes de estilo
  const variantClasses = {
    primary:
      'bg-[var(--color-accent-gold)] text-[var(--color-bg-dark)] hover:bg-[var(--color-accent-gold-hover)] focus:ring-[var(--color-accent-gold)] shadow-lg hover:shadow-xl hover:scale-105',
    secondary:
      'bg-[var(--color-text-primary)] text-[var(--color-bg-dark)] hover:bg-white focus:ring-[var(--color-text-primary)] shadow-lg hover:shadow-xl hover:scale-105',
    outline:
      'border-2 border-[var(--color-accent-gold)] text-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)] hover:text-[var(--color-bg-dark)] focus:ring-[var(--color-accent-gold)]',
  };

  // Tamaños
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  // Clase de disabled
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-lg'
    : 'cursor-pointer';

  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  // Si es un link
  if (href && !disabled) {
    return (
      <a href={href} className={allClasses} onClick={onClick}>
        {children}
      </a>
    );
  }

  // Si es un botón
  return (
    <button
      type={type}
      className={allClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
