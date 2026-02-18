#!/usr/bin/env node
/**
 * ACTUALIZAR FOTOS - Amherkut
 * Escanea las carpetas de fotos y actualiza automáticamente la configuración.
 * ¡Súper fácil! Solo pon tus fotos en las carpetas y ejecuta este script.
 */

const fs = require('fs');
const path = require('path');

// Carpetas a escanear (desde la raíz del proyecto) - soporta photos y PHOTOS
const ROOT = path.join(__dirname, '..');
const PHOTOS_BASE = fs.existsSync(path.join(ROOT, 'photos')) 
    ? path.join(ROOT, 'photos') 
    : path.join(ROOT, 'PHOTOS');
const ASSETS_IMAGES = path.join(__dirname, '..', 'assets', 'images');

// Extensiones de imagen y video permitidas
const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
const VIDEO_EXT = ['.mp4', '.webm'];

function getAllFiles(dir, basePath = '') {
    const results = [];
    if (!fs.existsSync(dir)) return results;

    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        const relPath = path.join(basePath, item.name).replace(/\\/g, '/');

        if (item.isDirectory()) {
            results.push(...getAllFiles(fullPath, relPath));
        } else {
            const ext = path.extname(item.name).toLowerCase();
            if (IMAGE_EXT.includes(ext) || VIDEO_EXT.includes(ext)) {
                results.push(relPath);
            }
        }
    }
    return results;
}

function scanFolder(dir) {
    if (!fs.existsSync(dir)) return [];
    const files = getAllFiles(dir);
    return files.sort();
}

function ensureFolders() {
    const folders = [
        path.join(PHOTOS_BASE, 'Bread'),
        path.join(PHOTOS_BASE, 'Food'),
        path.join(PHOTOS_BASE, 'Drinks'),
        path.join(PHOTOS_BASE, 'Sweet')
    ];
    for (const f of folders) {
        if (!fs.existsSync(f)) {
            fs.mkdirSync(f, { recursive: true });
            console.log('  📁 Creada carpeta:', path.relative(path.join(__dirname, '..'), f));
        }
    }
}

function main() {
    console.log('');
    console.log('🍞 Amherkut - Actualizando fotos...');
    console.log('========================');
    console.log('');

    if (!fs.existsSync(PHOTOS_BASE)) {
        fs.mkdirSync(PHOTOS_BASE, { recursive: true });
        console.log('  📁 Creada carpeta principal de fotos');
    }
    ensureFolders();

    const manifest = {
        scannedAt: new Date().toISOString(),
        food: [],
        bread: [],
        drinks: [],
        sweet: [],
        hakaniemet: [],
        leipomo: []
    };

    // Escanear categorías en photos/
    const categories = [
        { key: 'food', folders: ['Food', 'FOOD', 'food'] },
        { key: 'bread', folders: ['Bread', 'BREAD', 'bread'] },
        { key: 'drinks', folders: ['Drinks', 'DRINKS', 'drinks'] },
        { key: 'sweet', folders: ['Sweet', 'SWEET', 'sweet'] }
    ];

    for (const cat of categories) {
        let found = [];
        for (const folder of cat.folders) {
            const fullPath = path.join(PHOTOS_BASE, folder);
            if (fs.existsSync(fullPath)) {
                found = scanFolder(fullPath);
                break;
            }
        }
        manifest[cat.key] = found;
        console.log(`  ${cat.key}: ${found.length} archivos`);
    }

    // Hakaniemet y Leipomo en assets/images
    const hakaniemetPath = path.join(ASSETS_IMAGES, 'hakaniemet');
    if (fs.existsSync(hakaniemetPath)) {
        manifest.hakaniemet = scanFolder(hakaniemetPath);
        console.log(`  hakaniemet: ${manifest.hakaniemet.length} archivos`);
    }

    // Leipomo (tienda de Nora): fotos y videos de la carpeta "nora 2" en la raíz del proyecto
    const nora2Path = path.join(ROOT, 'nora 2');
    if (fs.existsSync(nora2Path)) {
        manifest.leipomo = scanFolder(nora2Path);
        console.log(`  leipomo (nora 2): ${manifest.leipomo.length} archivos`);
    } else {
        console.log('  leipomo (nora 2): carpeta no encontrada (crea "nora 2" en la raíz del proyecto)');
    }

    // Generar gallery-config.js
    const configPath = path.join(__dirname, '..', 'assets', 'js', 'gallery-config.js');
    const configContent = `/**
 * GALLERY CONFIGURATION - Auto-generado
 * Última actualización: ${new Date().toLocaleString()}
 * Para actualizar: ejecuta "npm run actualizar-fotos" o doble clic en "Actualizar Fotos.bat"
 */

const GALLERY_IMAGES = {
    hakaniemet: ${JSON.stringify(manifest.hakaniemet, null, 4)},
    leipomo: ${JSON.stringify(manifest.leipomo, null, 4)},
    food: ${JSON.stringify(manifest.food, null, 4)},
    bread: ${JSON.stringify(manifest.bread, null, 4)},
    drinks: ${JSON.stringify(manifest.drinks, null, 4)},
    sweet: ${JSON.stringify(manifest.sweet, null, 4)}
};
`;

    fs.writeFileSync(configPath, configContent);

    // Guardar manifest JSON también (para cargar dinámico si se prefiere)
    const manifestPath = path.join(__dirname, '..', 'data', 'photos-manifest.json');
    fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    const total = Object.values(manifest).reduce((sum, arr) => sum + arr.length, 0) - 1; // -1 por scannedAt
    console.log('');
    console.log(`✅ ¡Listo! ${total} fotos/videos actualizados.`);
    console.log('');
    console.log('📂 Las fotos ya están configuradas en la página.');
    console.log('   Haz commit y push para publicar los cambios.');
    console.log('');
}

main();
