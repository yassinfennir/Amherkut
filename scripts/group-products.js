const fs = require('fs');
const path = require('path');

// Configuración
const PHOTOS_DIR = path.join(__dirname, 'photos');
const OUTPUT_FILE = path.join(__dirname, 'products-grouped.json');

/**
 * Obtiene todas las imágenes de un directorio recursivamente
 */
function getAllImages(dir, basePath = '') {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    const images = [];
    
    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        const relativePath = path.join(basePath, item.name);
        
        if (item.isDirectory()) {
            images.push(...getAllImages(fullPath, relativePath));
        } else if (item.isFile()) {
            const ext = path.extname(item.name).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
                images.push({
                    name: item.name,
                    path: relativePath,
                    fullPath: fullPath,
                    category: basePath.split(path.sep)[0] || 'ROOT'
                });
            }
        }
    }
    
    return images;
}

/**
 * Normaliza el nombre del producto eliminando variantes comunes
 */
function normalizeProductName(filename) {
    // Remover extensiones
    let name = filename.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
    
    // Remover variantes comunes (beige, noir, black, blue, etc.)
    name = name.replace(/\s*(beige|noir|black|blue|blanc|white|rouge|red|vert|green)\s*/gi, '');
    
    // Remover números al final que puedan ser variantes
    name = name.replace(/\s*\d+\s*$/, '');
    
    // Limpiar espacios múltiples
    name = name.replace(/\s+/g, ' ').trim();
    
    return name;
}

/**
 * Agrupa imágenes por producto basándose en el nombre y la ubicación
 */
function groupProductsByCategory(images) {
    const productsByCategory = {};
    
    for (const image of images) {
        const category = image.category;
        
        if (!productsByCategory[category]) {
            productsByCategory[category] = [];
        }
        
        // Intentar encontrar el producto padre (carpeta contenedora)
        const pathParts = image.path.split(path.sep);
        let productKey = '';
        
        // Si está en una subcarpeta, usar el nombre de la carpeta como clave
        if (pathParts.length > 2) {
            // Ejemplo: BREAD/1/Ruisleiä noir.jpg -> clave: "BREAD/1"
            productKey = pathParts.slice(0, -1).join('/');
        } else if (pathParts.length === 2) {
            // Ejemplo: BREAD/Pains groupés avec fond gris.jpg -> clave normalizada
            productKey = normalizeProductName(pathParts[1]);
        } else {
            // Ejemplo: SWEET/HCN_8387.JPG -> usar nombre normalizado
            productKey = normalizeProductName(image.name);
        }
        
        // Buscar si ya existe un producto con esta clave
        let product = productsByCategory[category].find(p => p.key === productKey);
        
        if (!product) {
            // Crear nuevo producto
            const folderName = pathParts.length > 1 ? pathParts[pathParts.length - 2] : '';
            const baseName = normalizeProductName(image.name);
            
            product = {
                id: `${category}_${productsByCategory[category].length + 1}`,
                key: productKey,
                name: folderName || baseName || 'Producto sin nombre',
                category: category,
                folder: folderName || '',
                images: []
            };
            
            productsByCategory[category].push(product);
        }
        
        // Agregar imagen al producto
        product.images.push({
            filename: image.name,
            path: `PHOTOS/${image.path.replace(/\\/g, '/')}`,
            variant: extractVariant(image.name),
            isMain: product.images.length === 0 // Primera imagen es la principal
        });
    }
    
    return productsByCategory;
}

/**
 * Extrae la variante del nombre del archivo (beige, noir, etc.)
 */
function extractVariant(filename) {
    const variants = ['beige', 'noir', 'black', 'blue', 'blanc', 'white', 'rouge', 'red', 'vert', 'green'];
    const lowerName = filename.toLowerCase();
    
    for (const variant of variants) {
        if (lowerName.includes(variant)) {
            return variant;
        }
    }
    
    // Si tiene números, podría ser una posición
    const numberMatch = filename.match(/(\d+)/);
    if (numberMatch) {
        return `position-${numberMatch[1]}`;
    }
    
    return 'default';
}

/**
 * Función principal
 */
function main() {
    console.log('🔍 Escaneando carpeta de fotos...');
    
    if (!fs.existsSync(PHOTOS_DIR)) {
        console.error(`❌ La carpeta ${PHOTOS_DIR} no existe`);
        process.exit(1);
    }
    
    // Obtener todas las imágenes
    const images = getAllImages(PHOTOS_DIR);
    console.log(`✅ Encontradas ${images.length} imágenes`);
    
    // Agrupar por categoría y producto
    const productsByCategory = groupProductsByCategory(images);
    
    // Convertir a estructura plana con estadísticas
    const result = {
        generatedAt: new Date().toISOString(),
        totalImages: images.length,
        categories: {},
        products: []
    };
    
    for (const [category, products] of Object.entries(productsByCategory)) {
        result.categories[category] = {
            name: category,
            productCount: products.length,
            imageCount: products.reduce((sum, p) => sum + p.images.length, 0)
        };
        
        // Agregar productos a la lista plana
        for (const product of products) {
            result.products.push({
                ...product,
                imageCount: product.images.length,
                variants: [...new Set(product.images.map(img => img.variant))]
            });
        }
    }
    
    // Guardar resultado
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), 'utf8');
    
    console.log('\n📊 Resumen:');
    console.log(`   Categorías: ${Object.keys(result.categories).length}`);
    console.log(`   Productos: ${result.products.length}`);
    console.log(`   Imágenes totales: ${result.totalImages}`);
    console.log(`\n✅ Resultado guardado en: ${OUTPUT_FILE}`);
    
    // Mostrar estadísticas por categoría
    console.log('\n📁 Por categoría:');
    for (const [cat, stats] of Object.entries(result.categories)) {
        console.log(`   ${cat}: ${stats.productCount} productos, ${stats.imageCount} imágenes`);
    }
}

// Ejecutar
main();

