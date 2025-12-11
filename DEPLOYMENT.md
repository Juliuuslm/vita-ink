# Deployment Guide - VITA-INK

## ⭐ RECOMENDADO: Dockerfile + Nginx (Producción)

Este es el método **más eficiente** para desplegar VITA-INK en Dokploy. Usa una arquitectura multi-stage que:
- Construye con Node.js + pnpm
- Sirve archivos estáticos con Nginx (solo 30MB de imagen)
- Startup <1 segundo
- Resuelve el error 502 Bad Gateway

**Configuración en Dokploy**: Build Pack = **Dockerfile**, Port = **80**

### Alternativa: Nixpack + Railpack

Si prefieres no usar Docker (menos recomendado), puedes usar Nixpack o Railpack. Este proyecto también está configurado para desplegarse en **Dokploy** con **Nixpack** o **Railpack**.

## Configuración Aplicada (No Intrusiva)

Se han añadido los siguientes archivos de configuración **sin modificar la lógica del proyecto**:

**Para Docker (RECOMENDADO):**
| Archivo | Propósito |
|---------|-----------|
| `Dockerfile` | Build multi-stage: Node.js (build) + Nginx (runtime) |
| `nginx.conf` | Configuración de Nginx para servir archivos estáticos |
| `.dockerignore` | Archivos a ignorar en build Docker |

**Para Nixpack/Railpack (Alternativa):**
| Archivo | Propósito |
|---------|-----------|
| `.npmrc` | Configuración de pnpm (package manager) |
| `.node-version` | Especifica Node.js 20.17.0 (gestores de versión) |
| `.nvmrc` | Especifica Node.js 20.17.0 (alternativa nvm) |
| `.railpackignore` | Archivos a ignorar en build de Railpack |
| `Procfile` | Define el comando de inicio para Dokploy |
| `railpack-plan.json` | Configuración explícita para Railpack |
| `nixpacks.toml` | Configuración explícita para Nixpack |

**Configuración general:**
| `astro.config.mjs` | Configurado con `output: 'static'` para SSG |

## Pasos para Desplegar en Dokploy

### ⭐ Opción 1: Dockerfile + Nginx (RECOMENDADO)

Este método es más eficiente, seguro y rápido. Dokploy automáticamente detectará `Dockerfile` y lo usará.

#### En Dokploy:
1. **Crear nuevo proyecto**
   - URL del repositorio: Tu repo de GitHub
   - Rama: `main`
   - Build pack: **Dockerfile** (Dokploy lo detecta automáticamente)

2. **Configuración del Proyecto**
   - **Container Port**: Cambia a `80` (Nginx corre en puerto 80)
   - **Health Check**: `/health` (opcional pero recomendado)
   - Variables de entorno: No necesitas configurar ninguna

3. **Deploy**
   - Dokploy construirá automáticamente:
     - Stage 1: Usa Node.js para instalar deps y ejecutar `pnpm build`
     - Stage 2: Usa Nginx para servir archivos estáticos desde `dist/`
   - **Resultado**: Imagen de ~30MB, startup <1 segundo

#### Beneficios:
- ✅ Imagen más pequeña (~30MB vs 200MB con Node.js)
- ✅ Más rápido (startup <1s)
- ✅ Menos consumo de memoria
- ✅ Resuelve error 502 Bad Gateway
- ✅ Caching optimizado para assets estáticos

---

### Alternativa: Nixpack o Railpack

Si no quieres usar Docker, puedes usar Nixpack (menos recomendado):

#### En Dokploy:
1. **Crear nuevo proyecto**
   - URL del repositorio: Tu repo de GitHub
   - Rama: `main`
   - **Elegir build pack: Nixpack**

2. **Configuración Automática**
   - Dokploy detectará automáticamente:
     - `nixpacks.toml` para Nixpack
     - `Procfile` para el comando de inicio
     - `.node-version` para la versión de Node.js

3. **Variables de Entorno** (si aplica)
   - `PORT=3000` se configura automáticamente

4. **Deploy**
   - Dokploy construirá la imagen automáticamente
   - Ejecutará: `pnpm install --frozen-lockfile && pnpm build`
   - Iniciará con: `pnpm preview` (puerto 3000)

## ¿Por Qué Esta Configuración?

### `.npmrc`
- Dokploy usa `pnpm` para instalación eficiente de dependencias
- `shamefully-hoist=true`: Garantiza compatibilidad con dependencias planas
- `strict-peer-dependencies=false`: Evita errores en instalación de dependencias opcionales

### `.node-version` y `.nvmrc`
- Nixpack detecta automáticamente estos archivos para seleccionar la versión de Node.js
- Evita problemas de compatibilidad entre desarrollo y producción

### `Procfile`
- Define el comando que Dokploy ejecutará al iniciar el contenedor
- `pnpm preview`: Ejecuta el servidor de preview de Astro (ligero y eficiente para SSG)

### `nixpacks.toml` (Recomendado)
- Configuración explícita y optimizada para **Nixpack**
- Define paquetes de sistema necesarios (Node.js 20, pnpm)
- Especifica comandos de build y start
- Evita problemas de dependencias y timeouts
- **Esta es la configuración preferida**

### `railpack-plan.json`
- Configuración para **Railpack** como alternativa
- Solo úsalo si prefieres Railpack en lugar de Nixpack
- Contiene la misma lógica pero para el formato de Railpack

### `.railpackignore`
- Especifica qué archivos ignorar durante el build de Railpack
- Reduce el tamaño de la imagen Docker
- Excluye archivos de desarrollo innecesarios

### `astro.config.mjs` - `output: 'static'`
- Indica explícitamente que el proyecto es **Static Site Generation (SSG)**
- Astro generará HTML/CSS/JS pre-construido en la carpeta `dist/`
- Más seguro y performante en producción

## Alternativa: SSR (Si lo necesitas en el futuro)

Si en algún momento necesitas Server-Side Rendering:

```javascript
// astro.config.mjs
export default defineConfig({
  output: 'hybrid', // o 'server'
  adapter: nodeAdapter(),
  // ... resto de config
});
```

Pero para este proyecto, **SSG es lo ideal** (estático, rápido, seguro).

## Testing Antes de Deploy

```bash
# Verifica que el build funciona
pnpm build

# Prueba el servidor de preview localmente
pnpm preview
```

## Monitoreo en Dokploy

Una vez desplegado:
- **Logs**: Revisa los logs de build y runtime en Dokploy
- **Health Check**: Dokploy verificará que el servidor responda en el puerto 3000 (por defecto)
- **Redeploys**: Cada push a la rama configurada dispará un nuevo deploy automático

## Rollback

Si algo sale mal:
1. Vuelve a hacer push a la rama anterior en Git
2. Dokploy detectará el cambio y redesplegará automáticamente
3. O usa el botón de Rollback en la UI de Dokploy si está disponible

## Troubleshooting

### Error: "mise install-into caddy failed" (Railpack)
**Solución**: Usa **Nixpack** en lugar de Railpack. Nixpack no requiere Caddy.

### Error: "Gateway Timeout" en descarga de dependencias
- Esto puede ocurrir si hay problemas de conectividad
- Nixpack reintentar automáticamente
- Si persiste, contacta al proveedor de hosting

### Error: "pnpm not found"
- Verifica que `nixpacks.toml` está en la raíz del proyecto
- Docploy debería detectar `pnpm-lock.yaml` automáticamente

### Error: "Port already in use"
- El puerto 3000 se configura automáticamente en `nixpacks.toml`
- Si necesitas otro puerto, edita el archivo y redeploya

### Build falló
- Revisa los logs completos en Dokploy
- Asegúrate localmente: `pnpm install --frozen-lockfile && pnpm build && pnpm preview`
- Verifica que `pnpm-lock.yaml` está committed en Git

### Sitio blanco / No carga contenido
- Verifica que la carpeta `dist/` fue generada: `ls -la dist/`
- Comprueba que `pnpm preview` funciona localmente
- Revisa los logs del servidor en Dokploy

### ¿Cómo saber cuál es mi build pack?
En Dokploy, revisa el log de build. Busca:
- **Nixpack**: "nixpacks building..." o referencias a `nixpacks.toml`
- **Railpack**: "railpack building..." (no recomendado)

---

**¿Preguntas?** Revisa la [documentación oficial de Astro](https://docs.astro.build/es/guides/deploy/) o [Dokploy](https://dokploy.com/).
