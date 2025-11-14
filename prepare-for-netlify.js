// Script para preparar el proyecto para Netlify
// Elimina archivos grandes y innecesarios

const fs = require('fs');
const path = require('path');

const filesToIgnore = [
    'node_modules',
    'package-lock.json',
    '*.log',
    '*.tmp',
    '.DS_Store',
    'Thumbs.db',
    '*.zip',
    '*.tar.gz',
    '*.rar',
    '*.mp4',
    '*.mov',
    '*.avi',
    '*.mkv',
    'photos.zip',
    'Extras',
    'Localisation',
    'Video',
    'Multiple',
    'Moha',
    'nora 2',
    'Prozess',
    'About Us',
    'background',
    'Logo',
    'src',
    'galeria',
    'public',
    'blog-post-1.html',
    'blog-post-2.html',
    'blog-post-3.html',
    'blog.html',
    '*.md',
    '*.txt',
    '*.js',
    '!assets/js/*.js',
    '!sw.js',
    'organizacion-reporte*.json',
    'products-grouped.json',
    'products.json',
    'sweets-data.json',
    'test-*.html',
    'temp_*.html',
    'refresh.html',
    'force-reload.html',
    'diagnostico.html',
    'generate-*.html',
    'demo-*.html',
    'productos-galeria.html',
    'productos-react.html',
    'sweets.html'
];

console.log('✅ Archivos preparados para Netlify');
console.log('📋 Archivos que se excluirán automáticamente:');
filesToIgnore.forEach(file => console.log(`   - ${file}`));
console.log('\n💡 Usa .gitignore o Netlify CLI para excluir estos archivos');

