# Deployment Guide - VITA-INK

Este proyecto está configurado para desplegarse en **Dokploy** usando **Dockerfile** con arquitectura multi-stage (Node.js + Nginx).

## Configuración Aplicada (No Intrusiva)

Se han añadido los siguientes archivos de configuración **sin modificar la lógica del proyecto**:

| Archivo | Propósito |
|---------|-----------|
| `.npmrc` | Configuración de pnpm (package manager) |
| `.node-version` | Especifica Node.js 20.17.0 (gestores de versión) |
| `.nvmrc` | Especifica Node.js 20.17.0 (alternativa nvm) |
| `Dockerfile` | Build multi-stage: Node.js (build) + Nginx (runtime) |
| `nginx.conf` | Configuración de Nginx para servir archivos estáticos |
| `.dockerignore` | Archivos a ignorar en build de Docker |
| `astro.config.mjs` | Configurado con `output: 'static'` para SSG |

**Archivos heredados (no se usan, kept como backup):**
| `Procfile`, `railpack-plan.json`, `nixpacks.toml`, `.railpackignore` |

## Pasos para Desplegar en Dokploy

### 1. **En la Interfaz de Dokploy**

1. **Crear nuevo proyecto**
   - URL del repositorio: Tu repo de GitHub
   - Rama: `main` (o la rama que uses)
   - **Elegir build pack: Dockerfile (RECOMENDADO)**

2. **Configuración del Proyecto**
   - **Build Pack**: Selecciona "Dockerfile"
   - **Dockerfile Path**: `Dockerfile` (ubicado en la raíz del proyecto)
   - **Container Port**: `80` (Nginx corre en puerto 80)
   - **Health Check**: `/health` (endpoint para verificación)

3. **Variables de Entorno** (si aplica)
   - No necesitas variables especiales para este setup
   - Todo está configurado en Dockerfile y nginx.conf

4. **Deploy**
   - Dokploy construirá automáticamente usando Dockerfile
   - **Build Stage**: Instala pnpm, instala dependencias, construye Astro
   - **Runtime Stage**: Usa Nginx para servir archivos estáticos desde `dist/`
   - **Iniciará con**: Nginx escuchando en puerto 80

## ¿Por Qué Esta Configuración?

### `Dockerfile` (Multi-Stage Build)
El Dockerfile usa **arquitectura multi-stage** para máxima eficiencia:

**Stage 1 - Build**: Usa `node:20-alpine`
- Instala pnpm globalmente
- Instala dependencias del proyecto con `pnpm install --frozen-lockfile`
- Ejecuta `pnpm build` para construir el sitio estático en `dist/`
- Este stage se descarta después de construir

**Stage 2 - Runtime**: Usa `nginx:1.25-alpine`
- Copia solo el `nginx.conf` y la carpeta `dist/` (archivos estáticos)
- **Imagen final de solo ~30MB** (vs ~200MB con Node.js)
- Mucho más rápida, segura y eficiente

### `nginx.conf` (Configuración de Nginx)
Nginx está optimizado para servir sitios estáticos:
- **Root**: `/usr/share/nginx/html` contiene los archivos de `dist/`
- **Cache headers**:
  - Archivos hasheados en `/_astro/` → 1 año (safe porque tienen hashes de contenido)
  - Imágenes → 30 días
  - HTML → No cache (siempre fresco)
- **Gzip compression**: Reduce tamaño de CSS/JS ~70%
- **SPA routing**: `try_files $uri $uri/ /index.html` permite navegación
- **Security headers**: Protege contra XSS y clickjacking
- **Health check**: Endpoint `/health` para Dokploy

### `.dockerignore`
- Excluye `node_modules/`, `.git/`, docs, etc.
- Reduce el contexto de build (más rápido)
- Evita archivos innecesarios en la imagen

### `astro.config.mjs` - `output: 'static'`
- Indica explícitamente que el proyecto es **Static Site Generation (SSG)**
- Astro generará HTML/CSS/JS pre-construido en la carpeta `dist/`
- Más seguro y performante en producción

### `.npmrc`, `.node-version`, `.nvmrc`
- Configuración de desarrollo local
- Asegura consistencia entre desarrollo y producción (Node.js 20)

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

### Prueba local con Docker

```bash
# Build la imagen Docker localmente
docker build -t vita-ink:test .

# Corre el contenedor localmente
docker run -p 8080:80 vita-ink:test

# Visita http://localhost:8080 en el navegador
# Deberías ver el sitio VITA-INK completo

# Prueba el health check endpoint
curl http://localhost:8080/health
# Debe responder: "healthy"

# Verifica que el routing funciona (SPA fallback)
curl -I http://localhost:8080/about
# Debe devolver 200 y servir index.html

# Limpia
docker stop $(docker ps -q --filter ancestor=vita-ink:test)
docker rmi vita-ink:test
```

### Verificar localmente sin Docker

```bash
# Si no tienes Docker, puedes verificar que el build funciona
pnpm install --frozen-lockfile
pnpm build

# Verifica que se generó la carpeta dist/
ls -la dist/
# Deberías ver: index.html, _astro/, placeholders/, etc.
```

## Monitoreo en Dokploy

Una vez desplegado:
- **Logs**: Revisa los logs de build y runtime en Dokploy
- **Health Check**: Dokploy verificará que el servidor responda en `/health`
- **Redeploys**: Cada push a la rama configurada dispará un nuevo deploy automático
- **Performance**: Con Nginx, deberías ver:
  - Build time: 2-3 minutos
  - Image size: ~30MB
  - Startup time: <1 segundo
  - Memory usage: ~5-10MB

## Rollback

Si algo sale mal:
1. Vuelve a hacer push a la rama anterior en Git
2. Dokploy detectará el cambio y redesplegará automáticamente
3. O usa el botón de Rollback en la UI de Dokploy si está disponible

## Troubleshooting

### Error: "502 Bad Gateway" en Dokploy

**Causa**: El Dockerfile o puerto no está configurado correctamente.

**Solución**:
1. Verifica en Dokploy que:
   - Build Pack está en "Dockerfile"
   - Container Port está en "80" (no 3000)
2. Revisa los logs de build en Dokploy:
   - Stage 1 debe terminar con "pnpm build"
   - Stage 2 debe copiar archivos y exponer puerto 80
3. Testa localmente: `docker build -t test . && docker run -p 8080:80 test`

### Error: "Build failed" o "no such file" en build

**Causa**: El Dockerfile no encuentra archivos necesarios.

**Solución**:
```bash
# Verifica que estos archivos existen en la raíz:
ls -la Dockerfile nginx.conf .dockerignore package.json pnpm-lock.yaml

# Prueba el build localmente
docker build -t vita-ink:test .

# Si falla, mira el error específico y revisa:
# - ¿nginx.conf está en el mismo directorio que Dockerfile?
# - ¿pnpm-lock.yaml está actualizado?
```

### Error: "Nginx not serving files" o "404 everywhere"

**Causa**: nginx.conf no está configurado correctamente o `dist/` está vacío.

**Solución**:
1. Verifica que el build generó `dist/`:
   ```bash
   docker run --rm vita-ink:test ls -la /usr/share/nginx/html
   # Deberías ver: index.html, _astro/, placeholders/
   ```

2. Si `dist/` está vacío, revisa que el build anterior en Stage 1 fue exitoso:
   ```bash
   # Mira logs del build en Dokploy
   # Busca "pnpm build" - debe mostrar "✓ Completed"
   ```

3. Prueba que nginx.conf es válido:
   ```bash
   docker run --rm vita-ink:test nginx -t
   # Debe mostrar: "syntax is ok"
   ```

### Error: "Cache headers not working" o "CSS/JS outdated"

**Causa**: El navegador tiene versiones viejas en cache.

**Solución**:
```bash
# Verifica las headers desde terminal:
curl -I https://tu-dominio.com/_astro/index.hash.css
# Deberías ver: "Cache-Control: public, immutable"

# En navegador, abre DevTools → Network tab:
# Reload con Ctrl+Shift+R (hard refresh)
# Las requests a /_astro/ deben tener "from cache"
```

### Error: "Routing no funciona" (404 en refresh de página)

**Causa**: SPA fallback no está configurado.

**Solución**:
El nginx.conf ya tiene configurado:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Si sigue fallando, verifica que nginx.conf está siendo usado:
```bash
docker run --rm vita-ink:test cat /etc/nginx/nginx.conf
# Debe mostrar el contenido del archivo nginx.conf
```

### Error: "Health check failing"

**Causa**: El endpoint `/health` no está respondiendo.

**Solución**:
```bash
# Testa el health check localmente
docker run -p 8080:80 vita-ink:test
curl http://localhost:8080/health
# Debe responder: "healthy"

# En Dokploy, desactiva health check temporalmente:
# Application → Settings → Health Check (desactiva)
# Luego redeploy y revisa si el sitio carga
```

### ¿Cómo debuggear Nginx dentro del contenedor?

En Dokploy, accede a la shell del contenedor:
```bash
# En terminal de tu máquina (si tienes Docker):
docker exec -it <container_id> sh

# Dentro del contenedor:
tail -f /var/log/nginx/access.log    # Ver requests
tail -f /var/log/nginx/error.log     # Ver errores
nginx -t                             # Validar config
ps aux | grep nginx                  # Ver procesos
```

### Solicita ayuda

Si nada funciona:
1. Toma screenshot de los logs de build en Dokploy
2. Haz local test: `docker build . && docker run -p 8080:80 <image>`
3. Revisa que estos archivos existan:
   - `Dockerfile` - Build configuration
   - `nginx.conf` - Nginx configuration
   - `.dockerignore` - Build context
   - `package.json` - Dependencies
   - `pnpm-lock.yaml` - Locked versions

---

**¿Preguntas?** Revisa la [documentación oficial de Astro](https://docs.astro.build/es/guides/deploy/) o [Dokploy](https://dokploy.com/).
