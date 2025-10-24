/**
 * Constantes del proyecto Soulmark Tattoo Studio
 * Basado en el fetch de: soulmark.webflow.io
 */

// Colores del diseño (basados en el análisis del fetch)
export const COLORS = {
  background: {
    dark: '#0a0a0a',      // Negro intenso principal
    light: '#e8f5e8',     // Verde menta pastel claro
    white: '#ffffff',
  },
  text: {
    primary: '#ffffff',   // Texto principal (sobre fondo oscuro)
    secondary: '#d1d1d1', // Texto secundario
    dark: '#0a0a0a',      // Texto sobre fondo claro
  },
  accent: {
    gold: '#daa520',      // Dorado/Ocre principal
    goldHover: '#c99415', // Dorado hover
  },
} as const;

// Tipografías del diseño original
export const FONTS = {
  heading: '"Unbounded", sans-serif',
  body: '"Plus Jakarta Sans", sans-serif',
} as const;

// Navegación del sitio
export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About us', href: '#about-us' },
  { label: 'Offerings', href: '#offerings' },
  { label: 'Artists', href: '#artists' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
] as const;

// Servicios ofrecidos
export const SERVICES = [
  {
    id: 'temporary',
    title: 'Temporary tattoos',
    description: 'Temporary tattoos are a great way to experiment with body art without making a permanent commitment. They are ideal for special events, short-term style changes, or testing out designs before getting inked.',
    cta: 'Try it on',
    image: '/placeholders/service-temporary.jpg',
    bgColor: 'light',
  },
  {
    id: 'minimal',
    title: 'Minimal tattoos',
    description: 'Minimal tattoos focus on simplicity and elegance. They use clean lines, small symbols, and subtle detail to create timeless designs that are perfect for those who prefer a more understated look.',
    cta: 'Start Simple',
    image: '/placeholders/service-minimal.jpg',
    bgColor: 'dark',
  },
  {
    id: 'lettering',
    title: 'Lettering Tattoos',
    description: 'Lettering tattoos feature meaningful words, names, or quotes expressed through custom fonts and creative typography. They are a powerful way to carry a message, emotion, or personal story with you.',
    cta: 'Design Yours',
    image: '/placeholders/service-lettering.jpg',
    bgColor: 'light',
  },
  {
    id: 'full-coverage',
    title: 'Full Coverage Tattoo',
    description: 'Full coverage tattoos are large-scale artworks that span significant areas of the body. These comprehensive designs tell complete stories and showcase the pinnacle of tattoo artistry.',
    cta: 'Go Big',
    image: '/placeholders/service-full.jpg',
    bgColor: 'dark',
  },
] as const;

// Artistas del estudio
export const ARTISTS = [
  {
    id: 'alex-morgan',
    name: 'Alex Morgan',
    role: 'Lead Artist',
    image: '/placeholders/team-alex.jpg',
  },
  {
    id: 'jordan-lee',
    name: 'Jordan Lee',
    role: 'Tattoo Artist',
    image: '/placeholders/team-jordan.jpg',
  },
  {
    id: 'sam-taylor',
    name: 'Sam Taylor',
    role: 'Apprentice Artist',
    image: '/placeholders/team-sam.jpg',
  },
  {
    id: 'riley-chen',
    name: 'Riley Chen',
    role: 'Guest Artist',
    image: '/placeholders/team-riley.jpg',
  },
] as const;

// Testimonios
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Terry Hintz',
    role: 'Customer',
    rating: 5,
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus.',
    image: '/placeholders/testimonial-1.jpg',
  },
  {
    id: 2,
    name: 'Al Cummings',
    role: 'Customer',
    rating: 5,
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus.',
    image: '/placeholders/testimonial-2.jpg',
  },
  {
    id: 3,
    name: 'Esther Bernhard',
    role: 'Customer',
    rating: 5,
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus.',
    image: '/placeholders/testimonial-3.jpg',
  },
] as const;

// Información de contacto
export const CONTACT_INFO = {
  address: 'Level 1, 12 Sample St, Sydney NSW 2000',
  phone: '1800 123 4567',
  email: 'info@tattoostudio.com',
} as const;

// Redes sociales
export const SOCIAL_LINKS = [
  { name: 'Facebook', href: '#', icon: 'facebook' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
  { name: 'X (Twitter)', href: 'https://x.com/', icon: 'x' },
  { name: 'LinkedIn', href: '#', icon: 'linkedin' },
  { name: 'YouTube', href: '#', icon: 'youtube' },
] as const;
