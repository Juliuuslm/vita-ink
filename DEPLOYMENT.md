# Deployment Guide - VITA-INK

Este proyecto está configurado para desplegarse en **Dokploy** con **Nixpack** o **Railpack**.

## Configuración Aplicada (No Intrusiva)

Se han añadido los siguientes archivos de configuración **sin modificar la lógica del proyecto**:

| Archivo | Propósito |
|---------|-----------|
| `.npmrc` | Configuración de pnpm (package manager) |
| `.node-version` | Especifica Node.js 20.17.0 (Nixpack) |
| `.nvmrc` | Especifica Node.js 20.17.0 (alternativa) |
| `Procfile` | Define el comando de inicio para Dokploy |
| `astro.config.mjs` | Añadido `output: 'static'` para SSG explícito |

## Pasos para Desplegar en Dokploy

### 1. **Preparar el Repositorio**
```bash
git add .npmrc .node-version .nvmrc Procfile DEPLOYMENT.md
git commit -m "chore: add Dokploy deployment configuration"
git push origin Stryker-UXImprove
```

### 2. **En la Interfaz de Dokploy**

1. **Crear nuevo proyecto**
   - URL del repositorio: Tu repo de GitHub
   - Rama: `Stryker-UXImprove` (o la rama que uses)
   - Elegir build pack: **Nixpack** o **Railpack** (recomendado Nixpack para mejor soporte de Node.js)

2. **Configuración del Build**
   - Install command: `pnpm install`
   - Build command: `pnpm build`
   - Start command: `pnpm preview` (definido en Procfile, Dokploy lo detectará automáticamente)

3. **Variables de Entorno** (si aplica)
   - Añade cualquier variable que necesite tu aplicación

4. **Deploy**
   - Dokploy detectará automáticamente que es un proyecto Node.js/Astro
   - Usará Nixpack para construir la imagen
   - Iniciará el servidor con el comando del Procfile

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
- `npm run preview`: Ejecuta el servidor de preview de Astro (ligero y eficiente para SSG)
- Alternativa: usar `npm run build && npm run preview` si necesitas reconstruir en deploy

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

### Error: "pnpm not found"
- Verifica que `.npmrc` está en la raíz del proyecto
- Dokploy debería detectar `pnpm-lock.yaml` automáticamente

### Error: "Port already in use"
- Configura el puerto en Dokploy o en el Procfile: `PORT=3000 npm run preview`

### Build falló
- Revisa los logs en Dokploy
- Asegúrate de que `pnpm install && pnpm build` funciona localmente

### Sitio blanco / No carga contenido
- Verifica que la carpeta `dist/` fue generada correctamente
- Comprueba que `pnpm preview` funciona localmente

---

**¿Preguntas?** Revisa la [documentación oficial de Astro](https://docs.astro.build/es/guides/deploy/) o [Dokploy](https://dokploy.com/).
