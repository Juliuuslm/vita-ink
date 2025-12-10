/**
 * Constantes del proyecto VITA-INK Tattoo Studio
 * Basado en el diseño original de Soulmark
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
  { label: 'Inicio', href: '#home' },
  { label: 'Nosotros', href: '#about-us' },
  { label: 'Servicios', href: '#offerings' },
  { label: 'Artistas', href: '#artists' },
  { label: 'Galería', href: '#gallery' },
  { label: 'Testimonios', href: '#testimonials' },
] as const;

// Servicios ofrecidos
export const SERVICES = [
  {
    id: 'temporary',
    title: 'Tatuajes Temporales',
    description: 'Los tatuajes temporales son una excelente forma de experimentar con el arte corporal sin comprometerte a nada permanente. Ideales para eventos especiales, cambios de estilo a corto plazo o para probar diseños antes de tatuarte definitivamente.',
    cta: 'Pruébalo',
    image: '/placeholders/service-temporary.webp',
    bgColor: 'light',
  },
  {
    id: 'minimal',
    title: 'Tatuajes Minimalistas',
    description: 'Los tatuajes minimalistas se enfocan en la simplicidad y elegancia. Usan líneas limpias, símbolos pequeños y detalles sutiles para crear diseños atemporales que son perfectos para quienes prefieren un look más discreto.',
    cta: 'Empecemos Simple',
    image: '/placeholders/service-minimal.webp',
    bgColor: 'dark',
  },
  {
    id: 'lettering',
    title: 'Tatuajes de Lettering',
    description: 'Los tatuajes de lettering presentan palabras significativas, nombres o frases expresadas a través de tipografías personalizadas y creativas. Una forma poderosa de llevar un mensaje, emoción o historia personal contigo.',
    cta: 'Diseña el Tuyo',
    image: '/placeholders/service-lettering.webp',
    bgColor: 'light',
  },
  {
    id: 'full-coverage',
    title: 'Cobertura Completa',
    description: 'Los tatuajes de cobertura completa son obras de arte a gran escala que ocupan áreas significativas del cuerpo. Estos diseños completos cuentan historias enteras y muestran el pico del arte del tatuaje.',
    cta: 'A lo Grande',
    image: '/placeholders/service-full.webp',
    bgColor: 'dark',
  },
] as const;

// Artistas del estudio
export const ARTISTS = [
  {
    id: 'alex-morgan',
    name: 'Alex Morgan',
    role: 'Artista Principal',
    image: '/placeholders/team-alex.webp',
  },
  {
    id: 'jordan-lee',
    name: 'Jordan Lee',
    role: 'Tatuador/a',
    image: '/placeholders/team-jordan.webp',
  },
  {
    id: 'sam-taylor',
    name: 'Sam Taylor',
    role: 'Artista Aprendiz',
    image: '/placeholders/team-sam.webp',
  },
  {
    id: 'riley-chen',
    name: 'Riley Chen',
    role: 'Artista Invitado/a',
    image: '/placeholders/team-riley.webp',
  },
] as const;

// Testimonios
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Terry Hintz',
    role: 'Cliente',
    rating: 5,
    quote: 'Fue mi primer tatuaje y estaba nerviosísimo. Pero desde el momento que entré al estudio, todo cambió. Los artistas fueron super profesionales y me hicieron sentir completamente cómodo. Mi tatuaje quedó exactamente como lo imaginaba. ¡Volveré sin dudarlo!',
    image: '/placeholders/testimonial-1.webp',
  },
  {
    id: 2,
    name: 'Al Cummings',
    role: 'Cliente',
    rating: 5,
    quote: 'Llevaba una idea en la cabeza desde hace años y no sabía si podría hacerse realidad. Estos artistas no solo entendieron mi visión, sino que la mejoraron. El proceso fue fluido, limpio y profesional. Mi tatuaje es una obra maestra. ¡Simplemente increíble!',
    image: '/placeholders/testimonial-2.webp',
  },
  {
    id: 3,
    name: 'Esther Bernhard',
    role: 'Cliente',
    rating: 5,
    quote: 'Lo que más me impactó fue la higiene y seguridad del estudio. Es claro que se toman su trabajo muy en serio. El ambiente es relajado, la atención al detalle es insuperable y los artistas realmente se preocupan por su trabajo. Totalmente recomendado para quien quiera un tatuaje de calidad.',
    image: '/placeholders/testimonial-3.webp',
  },
] as const;

// Información de contacto
export const CONTACT_INFO = {
  address: 'Calle Principal 123, Zona Rosa, CDMX',
  phone: '+52 55 1234 5678',
  email: 'contacto@vitaink.mx',
  mapsUrl: 'https://maps.google.com/?q=Calle+Principal+123,+Zona+Rosa,+CDMX',
} as const;

// Redes sociales
export const SOCIAL_LINKS = [
  { name: 'Facebook', href: '#', icon: 'facebook' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
  { name: 'X (Twitter)', href: 'https://x.com/', icon: 'x' },
  { name: 'LinkedIn', href: '#', icon: 'linkedin' },
  { name: 'YouTube', href: '#', icon: 'youtube' },
] as const;
