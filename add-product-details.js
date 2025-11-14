const fs = require('fs');
const path = require('path');
const readline = require('readline');

const productsJsonPath = path.join(__dirname, 'products.json');
const productsHtmlPath = path.join(__dirname, 'productos.html');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

fs.readFile(productsJsonPath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        rl.close();
        return;
    }

    const products = JSON.parse(data);
    let currentProductIndex = 0;

    function askForProductDetails() {
        if (currentProductIndex >= products.length) {
            updateProductsHtml();
            rl.close();
            return;
        }

        const product = products[currentProductIndex];
        console.log(`\n--- Product: ${product.name} ---`);
        console.log(`Image: ${product.image}`);

        rl.question('Enter ingredients (comma-separated): ', (ingredients) => {
            product.ingredients = ingredients.split(',').map(item => item.trim()).filter(item => item);
            
            rl.question('Enter keywords (comma-separated): ', (keywords) => {
                product.keywords = keywords.split(',').map(item => item.trim()).filter(item => item);
                
                currentProductIndex++;
                askForProductDetails();
            });
        });
    }

    askForProductDetails();

    function updateProductsHtml() {
        fs.readFile(productsHtmlPath, 'utf8', (err, htmlData) => {
            if (err) {
                console.error(err);
                return;
            }

            let updatedHtml = htmlData;

            products.forEach(product => {
                const productCardRegex = new RegExp(`<div class="product-card" data-product-id="${product.id}"[\s\S]*?<p class="product-description">.*<\/p>`);
                const productCardHtml = `<div class="product-card" data-product-id="${product.id}" data-images="${product.image}">
                    <div class="product-image-wrapper">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-description">${product.ingredients.join(', ')}</p>`;
                updatedHtml = updatedHtml.replace(productCardRegex, productCardHtml);
            });

            fs.writeFile(productsHtmlPath, updatedHtml, 'utf8', err => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('\nproductos.html updated successfully with new details!');
            });

            // also update the products.json file
            fs.writeFile(productsJsonPath, JSON.stringify(products, null, 2), 'utf8', err => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('products.json updated successfully!');
            });
        });
    }
});
