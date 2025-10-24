/**
 * Utilidades generales del proyecto
 */

import { clsx, type ClassValue } from 'clsx';

/**
 * Combina clases de Tailwind CSS de forma condicional
 * Útil para componentes con variantes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Valida formato de email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Formatea número de teléfono
 */
export function formatPhone(phone: string): string {
  return phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
}

/**
 * Obtiene las iniciales de un nombre
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
