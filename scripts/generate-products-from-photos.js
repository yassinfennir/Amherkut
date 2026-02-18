const fs = require('fs');
const path = require('path');

function scanDir(dir, basePath = '') {
    const items = [];
    try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            const relPath = path.join(basePath, entry.name).replace(/\\/g, '/');
            
            if (entry.isDirectory()) {
                items.push(...scanDir(fullPath, relPath));
            } else if (/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(entry.name)) {
                items.push({
                    path: relPath,
                    name: entry.name,
                    fullPath: fullPath,
                    category: basePath.split('/')[0] || 'OTHER'
                });
            }
        }
    } catch (e) {
        console.error(`Error scanning ${dir}:`, e.message);
    }
    return items;
}

function groupByFolder(photos) {
    const grouped = {};
    photos.forEach(photo => {
        const parts = photo.path.split('/');
        const category = parts[0];
        let key;

        if (parts.length === 2) { // Imagen en la raíz de la categoría
            key = photo.name.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '').replace(/\s*(beige|noir|black|blue|beiger)\s*/gi, '').replace(/[\d-]+$/, '').trim();
        } else {
            key = parts.slice(1, -1).join('/'); // Carpeta sin el nombre del archivo
        }
        
        if (!grouped[category]) {
            grouped[category] = {};
        }
        if (!grouped[category][key]) {
            grouped[category][key] = [];
        }
        grouped[category][key].push(photo);
    });
    return grouped;
}

function generateProductName(folder, images) {
    let name = folder;

    // Si el nombre de la carpeta es "root" o genérico, intentar con el nombre de archivo
    if (folder === 'root' || /^(New folder|New folder \(\d+\)|\d+)$/i.test(folder)) {
        name = images[0].name;
    }

    // Limpiar el nombre
    name = name.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, ''); // Quitar extensión
    name = name.replace(/[\d-]+$/, ''); // Quitar hash o números al final
    name = name.replace(/_/g, ' '); // Reemplazar guiones bajos por espacios
    name = name.replace(/\s*(beige|noir|black|blue|beiger)\s*/gi, ''); // Quitar variantes
    name = name.replace(/^\d+\s*/, ''); // Quitar números al inicio
    name = name.replace(/^-+|-+$/g, ''); // Quitar guiones al principio o al final
    name = name.trim();

    // Capitalizar
    name = name.charAt(0).toUpperCase() + name.slice(1);

    if (name.length < 3 || /^-/.test(name)) {
        return 'Producto Artesanal';
    }
    
    return name;
}

function generateProductCard(productId, productName, images, category) {
    const firstImage = images[0];
    const imageCount = images.length;
    const imagePath = `photos/${firstImage.path}`;
    
    // Crear lista de todas las imágenes para el atributo data
    const allImages = images.map(img => `photos/${img.path}`).join('|');
    
    let indicatorHtml = '';
    if (imageCount > 1) {
        indicatorHtml = `
                        <div class="product-image-indicator">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="9" y1="3" x2="9" y2="21"></line>
                            </svg>
                            ${imageCount} vistas
                        </div>`;
    }
    
    const displayName = productName;
    
    return `                <div class="product-card" data-product-id="${productId}" data-images="${allImages}">
                    <div class="product-image-wrapper">
                        <img src="${imagePath}" alt="${displayName}" class="product-image">
                        ${indicatorHtml}
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${displayName}</h3>
                        <p class="product-description">Producto artesanal de calidad premium</p>
                    </div>
                </div>`;
}

function generateCategorySection(category, products) {
    const categoryNames = {
        'BREAD': { title: '🍞 Pan Artesanal', desc: 'Nuestro pan se hornea diariamente con masa madre y los mejores ingredientes, logrando una corteza crujiente y una miga suave y sabrosa.' },
        'FOOD': { title: '🍽️ Delicias Saladas', desc: 'Desde bocadillos gourmet hasta especialidades locales, cada plato está preparado al momento para ofrecerte una experiencia culinaria única.' },
        'SWEET': { title: '🍰 Dulces y Pasteles', desc: 'Endulza tu día con nuestra selección de pasteles, bollería y dulces artesanales, creados con pasión y los ingredientes más frescos.' },
        'DRINKS': { title: '☕ Cafés y Bebidas', desc: 'Disfruta de nuestro café de especialidad, tés aromáticos y otras bebidas refrescantes, preparadas por nuestros baristas expertos.' }
    };
    
    const categoryInfo = categoryNames[category.toUpperCase()] || { title: category, desc: 'Descubre nuestros productos de calidad excepcional.' };
    
    let html = `
    <!-- ${category} SECTION -->
    <section id="${category.toLowerCase()}" class="category-section">
        <div class="container">
            <div class="category-header">
                <h2>${categoryInfo.title}</h2>
                <p>${categoryInfo.desc}</p>
            </div>
            
            <div class="products-grid">`;
    
    let productIndex = 1;
    Object.keys(products).sort().forEach(folder => {
        const images = products[folder];
        const productId = `${category.toLowerCase()}-${productIndex}`;
        const productName = generateProductName(folder, images);
        
        html += generateProductCard(productId, productName, images, category);
        productIndex++;
    });
    
    html += `
            </div>
        </div>
    </section>`;
    
    return html;
}

// Escanear fotos
const photos = scanDir('photos');
const grouped = groupByFolder(photos);

// Generar HTML para cada categoría
let allHtml = '';
Object.keys(grouped).sort().forEach(category => {
    allHtml += generateCategorySection(category, grouped[category]);
});

// Leer el archivo productos.html
const productosHtml = fs.readFileSync('productos.html', 'utf8');

// Encontrar donde termina la sección products-hero y antes del footer
const heroEnd = productosHtml.indexOf('</section>', productosHtml.indexOf('products-hero'));
const footerStart = productosHtml.indexOf('<!-- Footer -->');

// Reemplazar todo el contenido entre hero y footer
const newContent = productosHtml.substring(0, heroEnd + 10) + '\n\n' + allHtml + '\n\n    ' + productosHtml.substring(footerStart);

fs.writeFileSync('productos.html', newContent, 'utf8');
console.log('✅ Página productos.html actualizada con todas las fotos!');
console.log(`📊 Total de categorías: ${Object.keys(grouped).length}`);
Object.keys(grouped).forEach(cat => {
    console.log(`   - ${cat}: ${Object.keys(grouped[cat]).length} productos`);
});

