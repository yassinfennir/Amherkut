document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const searchInput = document.getElementById('search-input');
    let products = [];

    fetch('public/data/sweet.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts(products);
        })
        .catch(error => console.error('Error fetching sweet products:', error));

    function renderProducts(productsToRender) {
        productContainer.innerHTML = '';
        if (productsToRender.length === 0) {
            productContainer.innerHTML = '<p>No se encontraron productos.</p>';
            return;
        }
        const grid = document.createElement('div');
        grid.className = 'products-grid';
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image-wrapper" data-product-id="${product.id}">
                    <img src="${product.thumbnail}" alt="${product.name}" class="product-image">
                    ${product.images.length > 1 ? `<div class="product-image-indicator"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>${product.images.length} vistas</div>` : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="ingredients-container">
                        <p class="ingredients-toggle">Ingredientes & alérgenos</p>
                        <ul class="ingredients-list">
                            ${product.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            grid.appendChild(productCard);

            const imageWrapper = productCard.querySelector('.product-image-wrapper');
            imageWrapper.addEventListener('click', () => {
                const clickedProduct = products.find(p => p.id === product.id);
                if(clickedProduct) openGallery(clickedProduct);
            });

            const ingredientsToggle = productCard.querySelector('.ingredients-toggle');
            const ingredientsList = productCard.querySelector('.ingredients-list');
            ingredientsToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                ingredientsList.style.display = ingredientsList.style.display === 'block' ? 'none' : 'block';
            });
        });
        productContainer.appendChild(grid);
    }

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => {
            const nameMatch = product.name.toLowerCase().includes(searchTerm);
            const keywordsMatch = product.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm));
            const ingredientsMatch = product.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm));
            return nameMatch || keywordsMatch || ingredientsMatch;
        });
        renderProducts(filteredProducts);
    });

    function openGallery(product) {
        const modal = document.createElement('div');
        modal.className = 'product-gallery-modal active';
        
        let currentImageIndex = 0;

        function updateImage() {
            mainImage.src = product.images[currentImageIndex];
            counter.textContent = `${currentImageIndex + 1} / ${product.images.length}`;
            document.querySelectorAll('.gallery-thumbnails .thumbnail').forEach((thumb, index) => {
                if (index === currentImageIndex) {
                    thumb.classList.add('active');
                } else {
                    thumb.classList.remove('active');
                }
            });
        }

        modal.innerHTML = `
            <div class="gallery-modal-overlay"></div>
            <div class="gallery-modal-content">
                <button class="gallery-close-btn">&times;</button>
                <div class="gallery-main-image-container">
                    <img src="${product.thumbnail}" alt="${product.name}" class="gallery-main-image">
                </div>
                <div class="gallery-thumbnails-container">
                    <button class="gallery-nav-btn prev">&lt;</button>
                    <div class="gallery-thumbnails">
                        ${product.images.map((img, index) => `<img src="${img}" alt="${product.name} thumbnail ${index+1}" class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">`).join('')}
                    </div>
                    <button class="gallery-nav-btn next">&gt;</button>
                </div>
                <div class="gallery-image-counter">1 / ${product.images.length}</div>
            </div>
        `;

        document.body.appendChild(modal);

        const mainImage = modal.querySelector('.gallery-main-image');
        const counter = modal.querySelector('.gallery-image-counter');

        modal.querySelector('.gallery-close-btn').addEventListener('click', () => modal.remove());
        modal.querySelector('.gallery-modal-overlay').addEventListener('click', () => modal.remove());

        modal.querySelector('.next').addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % product.images.length;
            updateImage();
        });

        modal.querySelector('.prev').addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
            updateImage();
        });

        modal.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                currentImageIndex = parseInt(e.target.dataset.index);
                updateImage();
            });
        });
    }
});
