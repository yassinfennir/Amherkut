const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const productsHtmlPath = path.join(__dirname, 'productos.html');
const productsJsonPath = path.join(__dirname, 'products.json');

fs.readFile(productsHtmlPath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const $ = cheerio.load(data);
    const products = [];

    $('.product-card').each((i, el) => {
        const productId = $(el).data('product-id');
        const images = $(el).data('images');
        const productName = $(el).find('.product-name').text();
        const category = productId.split('-')[0];

        products.push({
            id: productId,
            name: productName,
            image: images,
            category: category,
            ingredients: [],
            keywords: []
        });
    });

    fs.writeFile(productsJsonPath, JSON.stringify(products, null, 2), 'utf8', err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('products.json created successfully!');
    });
});
