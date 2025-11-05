/**
 * E-COMMERCE SYSTEM - Amherkut
 * Sistema completo de carrito, búsqueda, filtros y wishlist
 */

// ========================================
// DATA MANAGEMENT
// ========================================

// Productos base con toda la información necesaria
const PRODUCTS_DATA = [
    {
        id: 1,
        name: "Espresso Clásico",
        description: "Intenso y balanceado, perfecto para los verdaderos amantes del café",
        price: 3.50,
        originalPrice: null,
        image: "Fotos/Food/20230506_085815.png",
        category: "Café",
        stock: 50,
        rating: 4.8,
        reviews: 124,
        bestSeller: true,
        new: false,
        tags: ["clásico", "intenso", "espresso"]
    },
    {
        id: 2,
        name: "Cappuccino Artesanal",
        description: "Leche espumada fresca con chocolate premium, una experiencia única",
        price: 4.50,
        originalPrice: null,
        image: "Fotos/Drinks/unnamed (1).jpg",
        category: "Bebidas Calientes",
        stock: 35,
        rating: 4.9,
        reviews: 89,
        bestSeller: true,
        new: false,
        tags: ["cremoso", "chocolate", "artesanal"]
    },
    {
        id: 3,
        name: "Cold Brew",
        description: "Suave, refrescante e ideal para días calurosos. Preparado durante 24 horas",
        price: 5.00,
        originalPrice: null,
        image: "Fotos/Food/20230519_150338.png",
        category: "Bebidas Frías",
        stock: 25,
        rating: 4.7,
        reviews: 67,
        bestSeller: false,
        new: true,
        tags: ["frío", "refrescante", "premium"]
    },
    {
        id: 4,
        name: "Latte Macchiato",
        description: "Cremoso y suave con elegancia en cada sorbo. Perfecto para desayunar",
        price: 4.00,
        originalPrice: null,
        image: "Fotos/Food/20230610_110553.jpg",
        category: "Bebidas Calientes",
        stock: 40,
        rating: 4.6,
        reviews: 92,
        bestSeller: false,
        new: false,
        tags: ["cremoso", "suave", "desayuno"]
    },
    {
        id: 5,
        name: "Americana",
        description: "Clásica y robusta con sabor profundo. Para los amantes del café tradicional",
        price: 3.00,
        originalPrice: null,
        image: "Fotos/Food/2025-10-11.png",
        category: "Café",
        stock: 60,
        rating: 4.5,
        reviews: 156,
        bestSeller: true,
        new: false,
        tags: ["clásico", "tradicional", "robusto"]
    },
    {
        id: 6,
        name: "Affogato",
        description: "Helado de vainilla con espresso caliente recién hecho. Un postre perfecto",
        price: 6.00,
        originalPrice: null,
        image: "Fotos/Food/IMG_20230506_094126_784.jpg",
        category: "Postres",
        stock: 15,
        rating: 4.9,
        reviews: 43,
        bestSeller: false,
        new: true,
        tags: ["postre", "helado", "espresso"]
    }
];

// ========================================
// LOCAL STORAGE MANAGEMENT
// ========================================

class StorageManager {
    static getCart() {
        const cart = localStorage.getItem('amherkut_cart');
        return cart ? JSON.parse(cart) : [];
    }

    static saveCart(cart) {
        localStorage.setItem('amherkut_cart', JSON.stringify(cart));
        this.updateCartCount();
    }

    static getWishlist() {
        const wishlist = localStorage.getItem('amherkut_wishlist');
        return wishlist ? JSON.parse(wishlist) : [];
    }

    static saveWishlist(wishlist) {
        localStorage.setItem('amherkut_wishlist', JSON.stringify(wishlist));
    }

    static updateCartCount() {
        const cart = this.getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartBadge = document.getElementById('cart-count');
        if (cartBadge) {
            cartBadge.textContent = totalItems;
            cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
}

// ========================================
// CART MANAGEMENT
// ========================================

class CartManager {
    constructor() {
        this.cart = StorageManager.getCart();
        this.init();
    }

    init() {
        StorageManager.updateCartCount();
    }

    addToCart(productId, quantity = 1) {
        const product = PRODUCTS_DATA.find(p => p.id === productId);
        if (!product) return false;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        StorageManager.saveCart(this.cart);
        const productName = getTranslation(`product.${product.id}.name`) || product.name;
        const addedText = getTranslation('cart.added');
        this.showToast(`${productName} ${addedText}`);
        return true;
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        StorageManager.saveCart(this.cart);
        this.renderCart();
    }

    updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }

        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            StorageManager.saveCart(this.cart);
            this.renderCart();
        }
    }

    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    clearCart() {
        this.cart = [];
        StorageManager.saveCart(this.cart);
        this.renderCart();
    }

    renderCart() {
        const cartDrawer = document.getElementById('cart-drawer');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const cartCount = document.getElementById('cart-item-count');

        if (!cartDrawer || !cartItems) return;

        this.cart = StorageManager.getCart();

        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 12l2 2 4-4"></path>
                    </svg>
                    <p>${getTranslation('cart.empty')}</p>
                    <button class="btn btn-primary" onclick="cartManager.closeCart()">${getTranslation('cart.continue')}</button>
                </div>
            `;
            if (cartCount) cartCount.textContent = '0';
            if (cartTotal) cartTotal.textContent = '€0,00';
            return;
        }

        const totalItems = this.getItemCount();
        const total = this.getTotal();

        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">€${item.price.toFixed(2)}</p>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button class="remove-btn" onclick="cartManager.removeFromCart(${item.id})">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        if (cartCount) cartCount.textContent = totalItems;
        if (cartTotal) cartTotal.textContent = `€${total.toFixed(2)}`;
    }

    openCart() {
        const cartDrawer = document.getElementById('cart-drawer');
        if (cartDrawer) {
            cartDrawer.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.renderCart();
        }
    }

    closeCart() {
        const cartDrawer = document.getElementById('cart-drawer');
        if (cartDrawer) {
            cartDrawer.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    showToast(message) {
        // Crear toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// ========================================
// WISHLIST MANAGEMENT
// ========================================

class WishlistManager {
    constructor() {
        this.wishlist = StorageManager.getWishlist();
    }

    toggleWishlist(productId) {
        const index = this.wishlist.indexOf(productId);
        if (index > -1) {
            this.wishlist.splice(index, 1);
        } else {
            this.wishlist.push(productId);
        }
        StorageManager.saveWishlist(this.wishlist);
        this.updateWishlistIcons();
        return this.wishlist.includes(productId);
    }

    isInWishlist(productId) {
        return this.wishlist.includes(productId);
    }

    updateWishlistIcons() {
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const productId = parseInt(btn.dataset.productId);
            if (this.isInWishlist(productId)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}

// ========================================
// PRODUCT FILTERS & SEARCH
// ========================================

class ProductFilter {
    constructor() {
        this.currentFilter = {
            search: '',
            category: 'all',
            minPrice: 0,
            maxPrice: 100,
            sortBy: 'bestSeller'
        };
    }

    filterProducts(products) {
        let filtered = [...products];

        // Búsqueda por nombre
        if (this.currentFilter.search) {
            const searchLower = this.currentFilter.search.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower) ||
                p.tags.some(tag => tag.toLowerCase().includes(searchLower))
            );
        }

        // Filtro por categoría
        if (this.currentFilter.category !== 'all') {
            filtered = filtered.filter(p => p.category === this.currentFilter.category);
        }

        // Filtro por precio
        filtered = filtered.filter(p => 
            p.price >= this.currentFilter.minPrice &&
            p.price <= this.currentFilter.maxPrice
        );

        // Ordenamiento
        this.sortProducts(filtered);

        return filtered;
    }

    sortProducts(products) {
        switch (this.currentFilter.sortBy) {
            case 'bestSeller':
                products.sort((a, b) => {
                    if (a.bestSeller && !b.bestSeller) return -1;
                    if (!a.bestSeller && b.bestSeller) return 1;
                    return 0;
                });
                break;
            case 'priceLow':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'priceHigh':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'new':
                products.sort((a, b) => {
                    if (a.new && !b.new) return -1;
                    if (!a.new && b.new) return 1;
                    return 0;
                });
                break;
            case 'rating':
                products.sort((a, b) => b.rating - a.rating);
                break;
        }
    }

    getCategories() {
        return [...new Set(PRODUCTS_DATA.map(p => p.category))];
    }
}

// ========================================
// PRODUCT DISPLAY
// ========================================

class ProductDisplay {
    constructor() {
        this.filter = new ProductFilter();
        this.init();
    }

    init() {
        this.renderProducts();
        this.setupEventListeners();
        wishlistManager.updateWishlistIcons();
    }

    setupEventListeners() {
        // Búsqueda
        const searchInput = document.getElementById('product-search');
        if (searchInput) {
            let debounceTimer;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    this.filter.currentFilter.search = e.target.value;
                    this.renderProducts();
                }, 300);
            });
        }

        // Filtros de categoría - poblar dinámicamente
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            const categories = this.filter.getCategories();
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                // Traducir categoría
                const catKey = category.toLowerCase().replace(' ', '.');
                const translatedCat = getTranslation(`category.${catKey}`) || category;
                option.textContent = translatedCat;
                option.setAttribute('data-translate', `category.${catKey}`);
                categoryFilter.appendChild(option);
            });

            categoryFilter.addEventListener('change', (e) => {
                this.filter.currentFilter.category = e.target.value;
                this.renderProducts();
            });
        }

        const sortFilter = document.getElementById('sort-filter');
        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.filter.currentFilter.sortBy = e.target.value;
                this.renderProducts();
                localStorage.setItem('amherkut_sort', e.target.value);
            });
        }

        // Restaurar sort preference
        const savedSort = localStorage.getItem('amherkut_sort');
        if (savedSort && sortFilter) {
            sortFilter.value = savedSort;
            this.filter.currentFilter.sortBy = savedSort;
        }
    }

    renderProducts() {
        const container = document.getElementById('products-grid');
        if (!container) return;

        const filtered = this.filter.filterProducts(PRODUCTS_DATA);
        const countEl = document.getElementById('products-count');

        if (countEl) {
            const countText = filtered.length;
            const productsText = getTranslation('favorites.products.count');
            countEl.innerHTML = `${countText} <span data-translate="favorites.products.count">${productsText}</span>`;
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <h3>${getTranslation('product.noresults')}</h3>
                    <p>${getTranslation('product.adjustfilters')}</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(product => this.renderProductCard(product)).join('');
        
        // Re-attach event listeners
        this.attachProductListeners();
        wishlistManager.updateWishlistIcons();
    }

    renderProductCard(product) {
        const stockStatus = this.getStockStatus(product.stock);
        const isWishlisted = wishlistManager.isInWishlist(product.id);
        const productName = getTranslation(`product.${product.id}.name`) || product.name;
        const productDesc = getTranslation(`product.${product.id}.desc`) || product.description;

        return `
            <div class="product-card enhanced" data-id="${product.id}">
                ${stockStatus.badge ? `<span class="stock-badge ${stockStatus.class}">${stockStatus.badge}</span>` : ''}
                ${product.bestSeller ? `<span class="badge bestseller">${getTranslation('badge.bestseller')}</span>` : ''}
                ${product.new ? `<span class="badge new">${getTranslation('badge.new')}</span>` : ''}
                
                <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-product-id="${product.id}" 
                        onclick="wishlistManager.toggleWishlist(${product.id}); productDisplay.renderProducts();">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>

                <div class="product-image" onclick="productDisplay.showProductModal(${product.id})">
                    <img src="${product.image}" alt="${productName}" loading="lazy">
                    <div class="product-overlay">
                        <button class="btn btn-primary" onclick="event.stopPropagation(); productDisplay.showProductModal(${product.id})">
                            ${getTranslation('product.details')}
                        </button>
                    </div>
                </div>

                <div class="product-rating">
                    ${this.renderStars(product.rating)}
                    <span>${product.rating}</span>
                    <span class="reviews-count">(${product.reviews})</span>
                </div>

                <h3 onclick="productDisplay.showProductModal(${product.id})">${productName}</h3>
                <p>${productDesc}</p>

                <div class="product-footer">
                    <div class="product-price">
                        €${product.price.toFixed(2)}
                        ${product.originalPrice ? `<span class="original-price">€${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <button class="btn-add-cart" onclick="cartManager.addToCart(${product.id}, 1)" ${product.stock === 0 ? 'disabled' : ''}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        ${product.stock === 0 ? getTranslation('product.outofstock') : getTranslation('product.add')}
                    </button>
                </div>
            </div>
        `;
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<span class="star full">★</span>';
        }
        if (hasHalfStar) {
            stars += '<span class="star half">★</span>';
        }
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<span class="star empty">★</span>';
        }

        return stars;
    }

    getStockStatus(stock) {
        if (stock === 0) {
            return { badge: getTranslation('badge.outofstock'), class: 'out-of-stock' };
        } else if (stock < 10) {
            return { badge: getTranslation('badge.lowstock'), class: 'low-stock' };
        }
        return { badge: null, class: 'in-stock' };
    }

    attachProductListeners() {
        // Los event listeners se manejan con onclick inline para simplicidad
    }

    showProductModal(productId) {
        const product = PRODUCTS_DATA.find(p => p.id === productId);
        if (!product) return;

        const modal = document.getElementById('product-modal');
        if (!modal) return;

        const stockStatus = this.getStockStatus(product.stock);
        const isWishlisted = wishlistManager.isInWishlist(product.id);
        const productName = getTranslation(`product.${product.id}.name`) || product.name;
        const productDesc = getTranslation(`product.${product.id}.desc`) || product.description;
        const catKey = product.category.toLowerCase().replace(' ', '.');
        const translatedCat = getTranslation(`category.${catKey}`) || product.category;

        modal.innerHTML = `
            <div class="modal-overlay" onclick="productDisplay.closeProductModal()"></div>
            <div class="modal-content product-modal-content">
                <button class="modal-close" onclick="productDisplay.closeProductModal()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                </button>

                <div class="product-modal-grid">
                    <div class="product-modal-image">
                        <img src="${product.image}" alt="${productName}">
                        ${stockStatus.badge ? `<span class="stock-badge ${stockStatus.class}">${stockStatus.badge}</span>` : ''}
                    </div>

                    <div class="product-modal-info">
                        <div class="product-modal-header">
                            <h2>${productName}</h2>
                            <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
                                    onclick="wishlistManager.toggleWishlist(${product.id}); productDisplay.showProductModal(${product.id});">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                            </button>
                        </div>

                        <div class="product-modal-rating">
                            ${this.renderStars(product.rating)}
                            <span>${product.rating}</span>
                            <span class="reviews-count">(${product.reviews} ${getTranslation('product.reviews')})</span>
                        </div>

                        <div class="product-modal-price">
                            <span class="price-main">€${product.price.toFixed(2)}</span>
                            ${product.originalPrice ? `<span class="price-original">€${product.originalPrice.toFixed(2)}</span>` : ''}
                        </div>

                        <p class="product-modal-description">${productDesc}</p>

                        <div class="product-modal-details">
                            <div class="detail-item">
                                <strong>${getTranslation('product.category')}:</strong> ${translatedCat}
                            </div>
                            <div class="detail-item">
                                <strong>${getTranslation('product.stock')}:</strong> 
                                <span class="${stockStatus.class}">${product.stock} ${getTranslation('product.available')}</span>
                            </div>
                        </div>

                        <div class="product-modal-actions">
                            <div class="quantity-selector">
                                <label>${getTranslation('product.quantity')}:</label>
                                <div class="qty-controls">
                                    <button class="qty-btn" onclick="productModalUpdateQty(-1)">-</button>
                                    <input type="number" id="modal-quantity" value="1" min="1" max="${product.stock}" readonly>
                                    <button class="qty-btn" onclick="productModalUpdateQty(1)">+</button>
                                </div>
                            </div>

                            <button class="btn btn-primary btn-large" 
                                    onclick="cartManager.addToCart(${product.id}, parseInt(document.getElementById('modal-quantity').value)); productDisplay.closeProductModal();" 
                                    ${product.stock === 0 ? 'disabled' : ''}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                                ${getTranslation('product.addtocart')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeProductModal() {
        const modal = document.getElementById('product-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// Funciones globales para onclick handlers
function productModalUpdateQty(change) {
    const input = document.getElementById('modal-quantity');
    if (!input) return;
    const current = parseInt(input.value) || 1;
    const max = parseInt(input.max) || 99;
    const newValue = Math.max(1, Math.min(max, current + change));
    input.value = newValue;
}

// ========================================
// INITIALIZATION
// ========================================

// Instancias globales
let cartManager;
let wishlistManager;
let productDisplay;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    cartManager = new CartManager();
    wishlistManager = new WishlistManager();
    
    // Solo inicializar ProductDisplay si existe la sección de productos Y no es una galería
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid && !productsGrid.hasAttribute('data-gallery')) {
        productDisplay = new ProductDisplay();
    }

    // Event listeners globales
    const cartToggle = document.getElementById('cart-toggle');
    if (cartToggle) {
        cartToggle.addEventListener('click', () => cartManager.openCart());
    }

    const cartClose = document.getElementById('cart-close');
    if (cartClose) {
        cartClose.addEventListener('click', () => cartManager.closeCart());
    }

    // Cerrar carrito al hacer click fuera
    const cartDrawer = document.getElementById('cart-drawer');
    if (cartDrawer) {
        cartDrawer.addEventListener('click', (e) => {
            if (e.target === cartDrawer) {
                cartManager.closeCart();
            }
        });
    }
});

