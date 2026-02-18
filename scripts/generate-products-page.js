const fs = require('fs');
const path = require('path');

const photosDir = path.join(__dirname, 'photos');
const productsHtmlPath = path.join(__dirname, 'productos.html');

const categories = ['Bread', 'DRINKS', 'FOOD', 'SWEET'];

function getProductName(fileName) {
    // Remove extension and replace dashes and underscores with spaces
    let name = path.parse(fileName).name.replace(/[-_]/g, ' ');
    // Capitalize first letter
    name = name.charAt(0).toUpperCase() + name.slice(1);
    // remove numbers
    name = name.replace(/\d+/g, '');
    // trim
    name = name.trim();
    return name;
}

function generateProductCard(product) {
    return `                <div class="product-card" data-product-id="${product.category.toLowerCase()}-${product.id}" data-images="${product.image}">
                    <div class="product-image-wrapper">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-description">Producto artesanal de calidad premium</p>
                    </div>
                </div>`;
}

let products = [];
let productId = 1;

categories.forEach(category => {
    const categoryDir = path.join(photosDir, category);
    const files = fs.readdirSync(categoryDir);

    files.forEach(file => {
        const imagePath = path.join('photos', category, file).replace(/\\/g, '/');
        products.push({
            id: productId++,
            name: getProductName(file),
            image: imagePath,
            category: category
        });
    });
});

let productsHtml = '';
categories.forEach(category => {
    productsHtml += `
    <!-- ${category} SECTION -->
    <section id="${category.toLowerCase()}" class="category-section">
        <div class="container">
            <div class="category-header">
                <h2>${getCategoryHeader(category)}</h2>
                <p>${getCategoryDescription(category)}</p>
            </div>
            
            <div class="products-grid">
`;
    
    const categoryProducts = products.filter(p => p.category === category);
    categoryProducts.forEach(product => {
        productsHtml += generateProductCard(product);
    });

    productsHtml += `
            </div>
        </div>
    </section>`;
});


function getCategoryHeader(category) {
    switch (category) {
        case 'Bread':
            return '🍞 Pan Artesanal';
        case 'DRINKS':
            return '☕ Cafés y Bebidas';
        case 'FOOD':
            return '🍽️ Delicias Saladas';
        case 'SWEET':
            return '🍰 Dulces y Pasteles';
    }
}

function getCategoryDescription(category) {
    switch (category) {
        case 'Bread':
            return 'Nuestro pan se hornea diariamente con masa madre y los mejores ingredientes, logrando una corteza crujiente y una miga suave y sabrosa.';
        case 'DRINKS':
            return 'Disfruta de nuestro café de especialidad, tés aromáticos y otras bebidas refrescantes, preparadas por nuestros baristas expertos.';
        case 'FOOD':
            return 'Desde bocadillos gourmet hasta especialidades locales, cada plato está preparado al momento para ofrecerte una experiencia culinaria única.';
        case 'SWEET':
            return 'Endulza tu día con nuestra selección de pasteles, bollería y dulces artesanales, creados con pasión y los ingredientes más frescos.';
    }
}


fs.readFile(productsHtmlPath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const updatedHtml = data.replace(/<!-- Bread SECTION -->[\s\S]*<!-- SWEET SECTION -->[\s\S]*<\/section>/, productsHtml);

    fs.writeFile(productsHtmlPath, updatedHtml, 'utf8', err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('productos.html updated successfully!');
    });
});
