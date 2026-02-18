const fs = require('fs');
const path = require('path');

const category = process.argv[2];
if (!category) {
    console.error('Please provide a category name as an argument.');
    process.exit(1);
}

const photoDir = path.join('public', 'photos', category);
const dataFile = path.join('data', `${category.toLowerCase()}-data.json`);
const outputFile = path.join('src', 'data', `${category.toLowerCase()}Products.js`);

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
                });
            }
        }
    } catch (e) {
        console.error(`Error scanning ${dir}:`, e.message);
    }
    return items;
}

function groupImages(images) {
    const grouped = {};
    images.forEach(image => {
        const parts = image.path.split('/');
        let key;
        if (parts.length === 1) {
            key = image.name.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '').replace(/\s*(beige|noir|black|blue|beiger)\s*/gi, '').replace(/[\d-]+$/, '').trim();
        } else {
            key = parts.slice(0, -1).join('/');
        }

        if (!grouped[key]) {
            grouped[key] = [];
        }
        grouped[key].push(image);
    });
    return grouped;
}

function generateProductName(key, images) {
    let name = key;
    if (/^(New folder|New folder \(\d+\)|\d+)$/i.test(key)) {
        name = images[0].name;
    }

    name = name.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');
    name = name.replace(/[\d-]+$/, '');
    name = name.replace(/_/g, ' ');
    name = name.replace(/\s*(beige|noir|black|blue|beiger)\s*/gi, '');
    name = name.replace(/^\d+\s*/, '');
    name = name.replace(/^-+|-+$/g, '');
    name = name.trim();
    name = name.charAt(0).toUpperCase() + name.slice(1);

    if (name.length < 3 || /^-/.test(name)) {
        return 'Producto Artesanal';
    }
    
    return name;
}

// Read metadata
let metadata = {};
if (fs.existsSync(dataFile)) {
    const rawData = fs.readFileSync(dataFile, 'utf8');
    const jsonData = JSON.parse(rawData);
    jsonData.forEach(item => {
        metadata[item.id] = item;
    });
}

// Scan photos and group them
const photos = scanDir(photoDir);
const groupedImages = groupImages(photos);

// Combine data
const products = Object.keys(groupedImages).map((key, index) => {
    const images = groupedImages[key];
    const productName = generateProductName(key, images);
    const productId = productName.toLowerCase().replace(/\s+/g, '-');
    
    const productMetadata = metadata[productId] || {};

    return {
        id: productId,
        name: productMetadata.name || productName,
        category: category.toLowerCase(),
        images: images.map(img => path.join('/photos', category, img.path).replace(/\\/g, '/')),
        thumbnail: path.join('/photos', category, images[0].path).replace(/\\/g, '/'),
        keywords: productMetadata.keywords || [],
        ingredients: productMetadata.ingredients || [],
        description: productMetadata.description || 'Descripción no disponible.',
    };
});

// Generate the JS file content
const fileContent = `export const ${category.toLowerCase()}Products = ${JSON.stringify(products, null, 2)};`;

// Write the final JS file
fs.writeFileSync(outputFile, fileContent, 'utf8');

console.log(`✅ Generated ${outputFile} with ${products.length} products.`);
