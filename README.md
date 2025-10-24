# Soulmark Tattoo Studio - Marketing Site

Sitio web tipo Marketing Site creado con Astro 3.6.5 + React 18 + Tailwind CSS + GSAP.

Basado en el diseño original de [soulmark.webflow.io](https://soulmark.webflow.io).

## 🚀 Stack Tecnológico

- **Astro 3.6.5** - Framework SSG para generación estática
- **React 18** - Componentes interactivos (islands architecture)
- **Tailwind CSS v3** - Framework de utilidades CSS
- **GSAP + ScrollTrigger** - Animaciones avanzadas
- **Lenis** - Smooth scrolling suave
- **TypeScript** - Tipado estático
- **pnpm** - Gestor de paquetes

## 📂 Estructura del Proyecto

```
/
├── public/
│   └── placeholders/       # Imágenes placeholder
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro      # Navbar fijo
│   │   │   ├── MobileMenu.tsx    # Menú hamburguesa
│   │   │   └── Footer.astro      # Footer con links y social
│   │   └── sections/
│   │       ├── Hero.tsx          # Hero con marquee vertical
│   │       ├── About.tsx         # 3 cards asimétricas
│   │       ├── Services.tsx      # 4 servicios alternados
│   │       ├── Artists.tsx       # Grid de 4 artistas
│   │       ├── Gallery.tsx       # PENDIENTE (horizontal scroll)
│   │       ├── CTA.tsx           # Stroke text animado
│   │       ├── Testimonials.tsx  # Slider automático
│   │       └── Contact.tsx       # Form con validación
│   ├── layouts/
│   │   └── BaseLayout.astro      # Layout principal + Lenis
│   ├── lib/
│   │   └── constants.ts          # Datos del sitio
│   ├── pages/
│   │   └── index.astro           # Página principal
│   └── styles/
│       └── global.css            # Estilos globales + variables
├── astro.config.mjs
├── tailwind.config.cjs
└── package.json
```

## ✨ Características Implementadas

### ✅ Fase 1: Header + Hero
- Navbar fijo con blur effect al scroll
- Menú móvil con animaciones GSAP
- Hero con 5 columnas de imágenes
- Infinite vertical marquee (NO parallax)
- Overlay gradient progresivo
- CTAs centrales con fade-in

### ✅ Fase 2: About Section
- Grid asimétrico (1 izq, 2 der)
- 3 cards con imágenes y texto
- Scroll reveal con stagger
- Responsive mobile-first

### ✅ Fase 3: Services Section
- 4 servicios con layouts alternados
- Text-left/image-right alternando
- Backgrounds claros/oscuros alternados
- Scroll reveal direccional
- Imágenes decorativas

### ✅ Fase 4: Artists Section
- Grid responsive 1→2→4 columnas
- 4 artistas con foto + nombre + rol
- Scroll reveal con stagger
- Centrado con max-width

### ✅ Fase 5: Gallery Section
- Scroll horizontal con ScrollTrigger pin
- Imágenes cinematográficas 16:9 y 21:9
- Altura fija, ancho variable
- ScrollerProxy para sincronización Lenis
- Pin de sección durante scroll
- Animación horizontal con scrub
- **Fix aplicado**: Sincronización correcta con Lenis

### ✅ Fase 6: CTA Section
- Título "THE BEST"
- Stroke text animado (-webkit-text-stroke)
- Loop vertical infinito con GSAP
- Gradient mask para fade in/out
- Botón CTA dorado
- Scroll reveal

### ✅ Fase 7: Testimonials Section
- Slider automático (5s auto-play)
- 3 testimonials con rating 5⭐
- Flechas de navegación
- Dots interactivos
- Animación GSAP en cada cambio
- Card elevada con shadow

### ✅ Fase 8: Contact Form
- Validación client-side completa
- Grid Name + Email
- Textarea para mensaje
- Checkbox términos (required)
- Estados: idle/submitting/success/error
- Mensajes de error por campo
- Focus states dorados
- Simulación async de envío

### ✅ Fase 9: Footer
- Info de contacto (dirección, tel, email)
- 5 redes sociales con iconos SVG
- Enlaces de navegación
- Enlaces legales
- Logo decorativo grande
- Copyright dinámico
- Hover effects

## 🎨 Diseño y Animaciones

### Paleta de Colores
- **Background Dark**: `#0a0a0a` (Negro intenso)
- **Background Light**: `#e8f5e8` (Verde menta)
- **Accent Gold**: `#daa520` (Dorado/Ocre)
- **Text Primary**: `#ffffff` (Blanco)
- **Text Dark**: `#0a0a0a` (Negro)

### Tipografías
- **Headings**: Unbounded (Google Fonts)
- **Body**: Plus Jakarta Sans (Google Fonts)

### Animaciones GSAP
- Scroll reveal con fade-in + translateY
- Stagger animations en listas
- Infinite vertical marquee (Hero)
- Loop vertical stroke text (CTA)
- Slider transitions (Testimonials)
- ScrollTrigger para reveals

### Smooth Scrolling
- Lenis integrado en BaseLayout
- Scroll suave en toda la página
- Anchor links con Lenis.scrollTo

## 🛠️ Comandos Disponibles

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo
pnpm run dev

# Build para producción
pnpm run build

# Preview del build
pnpm run preview
```

## 📊 Progreso del Proyecto

| Fase | Sección | Estado |
|------|---------|--------|
| 1 | Header + Hero | ✅ Completado |
| 2 | About | ✅ Completado |
| 3 | Services | ✅ Completado |
| 4 | Artists | ✅ Completado |
| 5 | Gallery | ✅ Completado |
| 6 | CTA | ✅ Completado |
| 7 | Testimonials | ✅ Completado |
| 8 | Contact | ✅ Completado |
| 9 | Footer | ✅ Completado |

**Progreso total**: 9/9 fases completadas (100%)

## ✅ Issues Resueltos

1. **Gallery horizontal scroll** - ✅ RESUELTO
   - **Problema**: Conflicto entre múltiples ScrollTriggers y Lenis
   - **Solución**: ScrollerProxy configurado en BaseLayout
   - **Resultado**: Gallery funciona perfectamente con pin + scroll horizontal

## 📝 Notas de Desarrollo

- Todos los commits están en español según especificaciones
- Mobile-first approach en todos los componentes
- React islands solo donde se necesita interactividad
- SSG para mejor performance (no SSR)
- Build exitoso verificado en cada fase

## 🎯 Próximos Pasos

1. ✅ ~~Debugging y fix de Gallery horizontal scroll~~ - COMPLETADO
2. Agregar imágenes reales (reemplazar placeholders)
3. Implementar formulario backend (actualmente simulado)
4. Optimización de imágenes (WebP, AVIF)
5. Testing en navegadores cross-browser
6. Lighthouse audit y optimizaciones
7. Deploy a producción

## 📄 Licencia

© 2025 Soulmark Tattoo Studio. Todos los derechos reservados.

---

🤖 Generado con [Claude Code](https://claude.com/claude-code)
