/**
 * Script para optimizar imágenes JPG a WebP
 * Reduce el tamaño de las imágenes grandes manteniendo calidad visual
 *
 * Uso: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/placeholders');
const QUALITY = 80; // Calidad WebP (80-90 es óptimo)
const SIZE_THRESHOLD = 1024 * 1024; // 1MB - optimizar solo imágenes >1MB

async function optimizeImages() {
  console.log('🖼️  Iniciando optimización de imágenes...\n');

  const files = fs.readdirSync(IMAGES_DIR);
  const jpgFiles = files.filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let optimizedCount = 0;

  for (const file of jpgFiles) {
    const inputPath = path.join(IMAGES_DIR, file);
    const stats = fs.statSync(inputPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

    totalOriginalSize += stats.size;

    // Solo optimizar imágenes grandes
    if (stats.size > SIZE_THRESHOLD) {
      const outputPath = path.join(IMAGES_DIR, file.replace(/\.jpe?g$/, '.webp'));

      try {
        await sharp(inputPath)
          .webp({ quality: QUALITY })
          .toFile(outputPath);

        const newStats = fs.statSync(outputPath);
        const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2);
        const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);

        console.log(`✅ ${file}: ${sizeMB}MB → ${newSizeMB}MB (${savings}% reducción)`);

        totalOptimizedSize += newStats.size;
        optimizedCount++;
      } catch (error) {
        console.error(`❌ Error optimizando ${file}:`, error.message);
      }
    } else {
      console.log(`⏭️  ${file}: ${sizeMB}MB (< 1MB, no optimizar)`);
      totalOptimizedSize += stats.size;
    }
  }

  const totalSavings = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);
  const originalMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
  const optimizedMB = (totalOptimizedSize / 1024 / 1024).toFixed(2);

  console.log(`\n📊 Resumen:`);
  console.log(`   Archivos optimizados: ${optimizedCount}`);
  console.log(`   Tamaño original: ${originalMB}MB`);
  console.log(`   Tamaño optimizado: ${optimizedMB}MB`);
  console.log(`   Ahorro total: ${totalSavings}%`);
  console.log(`\n✨ ¡Optimización completada!`);
}

optimizeImages().catch(console.error);
