/**
 * E-COMMERCE SYSTEM - Amherkut
 * Sistema completo de carrito, búsqueda, filtros y wishlist
 */

// ========================================
// DATA MANAGEMENT
// ========================================

// TODAS LAS IMÁGENES HAN SIDO ELIMINADAS - NO SE GENERARÁN PRODUCTOS AUTOMÁTICAMENTE
const BREAD_IMAGE_FILES = [];
const DRINKS_IMAGE_FILES = [];
const FOOD_IMAGE_FILES = [];
const PISTAASI_BAKLAVA_FILES = [];
const SWEET_IMAGE_FILES = [];

// Rutas base para las imágenes
const BREAD_IMAGES_PATH = 'PHOTOS/Bread/';
const DRINKS_IMAGES_PATH = 'PHOTOS/Drinks/';
const FOOD_IMAGES_PATH = 'PHOTOS/Food/';
const SWEET_IMAGES_PATH = 'PHOTOS/Sweet/';

// Función para generar nombre de producto basado en el nombre del archivo
const generateProductNameFromFilename = (filename, category) => {
    // Remover extensión
    let name = filename.replace(/\.[^/.]+$/, '');
    
    // Reemplazar guiones bajos y guiones con espacios
    name = name.replace(/[_-]/g, ' ');
    
    // Limpiar números de fecha al inicio (formato: 20250702121653-...)
    name = name.replace(/^\d{14}-\w+/g, '');
    name = name.replace(/^\d{8}-\w+/g, '');
    
    // Detectar Pistaasi Baklava por código específico en el nombre del archivo
    if (filename.includes('3cc399a4') || filename.includes('adbad953')) {
        return 'Pistaasi Baklava';
    }
    
    // Traducciones específicas basadas en palabras clave
    const translations = {
        // Bread
        'ruisleipä': 'Ruisleipä',
        'ruisleiä': 'Ruisleipä',
        'pain': 'Pan',
        'pains': 'Panes',
        'rond': 'Pan Redondo',
        'fond': 'Pan de Fondo',
        'groupés': 'Panes Agrupados',
        'tous les pains': 'Selección de Panes',
        
        // Drinks
        'chai': 'Té Chai',
        'expressp': 'Espresso',
        'macchoato': 'Latte Macchiato',
        'latte': 'Latte',
        'espresso': 'Espresso',
        
        // Food
        'carré': 'Pan Cuadrado',
        'ronds': 'Panes Redondos',
        'triangle': 'Pan Triangular',
        'petits pains': 'Panecillos',
        
        // Sweet
        'pistaasi baklava': 'Pistaasi Baklava',
        'baklava': 'Baklava',
        'chocolats': 'Chocolates',
        'crakers': 'Galletas',
        'croissant': 'Croissant',
        'croissant aux amandes': 'Croissant de Almendras',
        'kakku': 'Pastel',
        'karjalapiirakka': 'Karjalanpiirakka',
        'kinuskikakku': 'Pastel de Caramelo',
        'korvapuusti': 'Korvapuusti',
        'lautanen': 'Plato de Postres',
        'leivoset': 'Pasteles',
        'porkkanakakku': 'Pastel de Zanahoria',
        'porkkana-kinuskikakku': 'Pastel de Zanahoria con Caramelo'
    };
    
    // Buscar traducciones
    const lowerName = name.toLowerCase();
    for (const [key, translation] of Object.entries(translations)) {
        if (lowerName.includes(key)) {
            // Si contiene "beige" o "noir", agregar variante
            if (lowerName.includes('beige')) {
                return `${translation} (Claro)`;
            } else if (lowerName.includes('noir') || lowerName.includes('black')) {
                return `${translation} (Oscuro)`;
            }
            return translation;
        }
    }
    
    // Si no hay traducción, capitalizar palabras
    const words = name.split(/\s+/).filter(w => w.length > 0);
    const capitalized = words.map(word => {
        // Mantener números y códigos como están
        if (/^\d+/.test(word)) return word;
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    
    return capitalized.join(' ') || `Producto ${category}`;
};

// Función para generar descripción basada en el nombre del producto
const generateProductDescription = (productName, category, filename) => {
    const categoryDescriptions = {
        'bread': 'Pan artesanal recién horneado, elaborado con ingredientes naturales y técnicas tradicionales.',
        'drinks': 'Bebida premium preparada con los mejores ingredientes, perfecta para acompañar cualquier momento.',
        'food': 'Delicia artesanal preparada con pasión y los ingredientes más frescos de nuestra panadería.',
        'sweet': 'Dulce tradicional elaborado artesanalmente, perfecto para endulzar tu día.'
    };
    
    // Descripciones específicas basadas en palabras clave
    const specificDescriptions = {
        'ruisleipä': 'Pan de centeno tradicional finlandés, denso y nutritivo, perfecto para el desayuno.',
        'chai': 'Té chai especiado con leche, una mezcla aromática de especias que calienta el corazón.',
        'espresso': 'Espresso intenso y aromático, preparado con granos de café de la más alta calidad.',
        'latte macchiato': 'Café con leche cremoso y suave, con elegancia en cada sorbo.',
        'croissant': 'Croissant francés tradicional, hojaldrado y mantecoso, perfecto para el desayuno.',
        'croissant de almendras': 'Croissant relleno de crema de almendras, dulce y delicioso.',
        'pistaasi baklava': 'Pistaasi baklava: Tuore pistaasi, filotaikina, siirappi. Pistachio baklava: Fresh pistachio, filo pastry, syrup.',
        'baklava': 'Baklava casero elaborado con hojaldre, nueces, pistachos y miel. Postre tradicional del Medio Oriente.',
        'chocolates': 'Chocolates artesanales de alta calidad, elaborados con cacao premium.',
        'galletas': 'Galletas crujientes y deliciosas, perfectas para acompañar tu café o té.',
        'korvapuusti': 'Korvapuusti tradicional finlandés, bollo de canela dulce y esponjoso.',
        'pastel': 'Pastel casero elaborado con ingredientes frescos, perfecto para celebraciones.',
        'pastel de zanahoria': 'Pastel de zanahoria húmedo y especiado, cubierto con crema de queso.',
        'karjalanpiirakka': 'Karjalanpiirakka tradicional, pastel de arroz finlandés con relleno de arroz.',
        'pan cuadrado': 'Pan artesanal de forma cuadrada, perfecto para sándwiches y tostadas.',
        'pan redondo': 'Pan artesanal de forma redonda, ideal para compartir en la mesa.',
        'pan triangular': 'Pan artesanal de forma triangular, único y delicioso.'
    };
    
    const lowerName = productName.toLowerCase();
    for (const [key, desc] of Object.entries(specificDescriptions)) {
        if (lowerName.includes(key)) {
            return desc;
        }
    }
    
    return categoryDescriptions[category] || 'Producto artesanal elaborado con ingredientes frescos y de la más alta calidad.';
};

// Función para generar ingredientes basados en el tipo de producto
const generateIngredients = (productName, category) => {
    const lowerName = productName.toLowerCase();
    const ingredients = [];
    
    // Ingredientes base por categoría
    if (category === 'bread') {
        ingredients.push('Harina de trigo', 'Agua', 'Sal', 'Levadura');
        if (lowerName.includes('ruisleipä') || lowerName.includes('ruisleiä')) {
            ingredients.push('Harina de centeno', 'Miel');
        }
    } else if (category === 'drinks') {
        if (lowerName.includes('chai')) {
            ingredients.push('Té negro', 'Leche', 'Especias (canela, cardamomo, jengibre)', 'Miel');
        } else if (lowerName.includes('espresso') || lowerName.includes('latte')) {
            ingredients.push('Granos de café', 'Leche', 'Azúcar');
        } else {
            ingredients.push('Ingredientes naturales', 'Sin conservantes');
        }
    } else if (category === 'food') {
        ingredients.push('Harina', 'Agua', 'Sal', 'Aceite de oliva');
    } else if (category === 'sweet') {
        ingredients.push('Harina', 'Mantequilla', 'Azúcar', 'Huevos');
        
        if (lowerName.includes('chocolate')) {
            ingredients.push('Chocolate', 'Cacao');
        }
        if (lowerName.includes('almendras') || lowerName.includes('amandes')) {
            ingredients.push('Almendras', 'Crema de almendras');
        }
        if (lowerName.includes('zanahoria') || lowerName.includes('porkkana')) {
            ingredients.push('Zanahoria rallada', 'Nueces', 'Canela', 'Crema de queso');
        }
        if (lowerName.includes('canela') || lowerName.includes('korvapuusti')) {
            ingredients.push('Canela', 'Azúcar moreno');
        }
        if (lowerName.includes('karjalanpiirakka')) {
            ingredients.push('Arroz', 'Leche', 'Mantequilla');
        }
        if (lowerName.includes('pistaasi baklava') || lowerName.includes('baklava')) {
            ingredients.push('Hojaldre fino', 'Pistachos premium', 'Miel', 'Mantequilla clarificada', 'Agua de rosas', 'Azúcar');
        }
    }
    
    return ingredients.length > 0 ? ingredients : ['Ingredientes naturales', 'Sin conservantes'];
};

// TODOS LOS PRODUCTOS BASE HAN SIDO ELIMINADOS
const BASE_PRODUCTS = [];

// Función para generar productos desde un array de imágenes
const generateProductsFromImages = (imageFiles, imagePath, category, startId, basePrice = 5.00, isPistaasiBaklava = false) => {
    return imageFiles.map((filename, index) => {
        const encodedFilename = encodeURIComponent(filename);
        const productName = generateProductNameFromFilename(filename, category);
        const description = generateProductDescription(productName, category, filename);
        const ingredients = generateIngredients(productName, category);
        
        // Calcular precio basado en el tipo de producto
        let price = basePrice;
        const lowerName = productName.toLowerCase();
        if (lowerName.includes('pistaasi baklava') || lowerName.includes('baklava')) {
            price = basePrice + 2.00; // Baklava es premium
        } else if (lowerName.includes('chocolate') || lowerName.includes('pastel') || lowerName.includes('kakku')) {
            price = basePrice + 1.50; // Productos más elaborados
        } else if (lowerName.includes('croissant') || lowerName.includes('almendras')) {
            price = basePrice + 1.00;
        } else {
            price = basePrice + (index % 3) * 0.50; // Variación de precio
        }
        
        return {
            id: startId + index,
            name: productName,
            description: description,
            price: parseFloat(price.toFixed(2)),
            originalPrice: null,
            image: `${imagePath}${encodedFilename}`,
            category: category,
            stock: 20 + (index % 10), // Variación de stock
            rating: 4.5 + (index % 5) * 0.1, // Rating entre 4.5 y 4.9
            reviews: 10 + index * 2,
            bestSeller: isPistaasiBaklava || index < 3, // Pistaasi Baklava siempre best seller, primeros 3 también
            new: index >= imageFiles.length - 2, // Últimos 2 son nuevos
            tags: [
                category.toLowerCase(), 
                "artesanal", 
                "premium", 
                ...productName.toLowerCase().split(' '),
                // Tags especiales para Pistaasi Baklava - Keywords exactos solicitados
                ...(lowerName.includes('pistaasi baklava') ? [
                    'baklava', 'filotaikina', 'Pistaasi', 'siirappi', 'Tuore',
                    'pistachio', 'filo', 'pastry', 'syrup', 'fresh'
                ] : [])
            ],
            ingredients: ingredients
        };
    });
};

// Generar productos para cada categoría (usar minúsculas para coincidir con los filtros)
const GENERATED_BREAD_PRODUCTS = generateProductsFromImages(BREAD_IMAGE_FILES, BREAD_IMAGES_PATH, 'bread', 200, 4.50);
const GENERATED_DRINKS_PRODUCTS = generateProductsFromImages(DRINKS_IMAGE_FILES, DRINKS_IMAGES_PATH, 'drinks', 300, 5.50);
const GENERATED_FOOD_PRODUCTS = generateProductsFromImages(FOOD_IMAGE_FILES, FOOD_IMAGES_PATH, 'food', 100, 5.00);

// Generar Pistaasi Baklava primero (productos destacados) - usar ruta correcta
const PISTAASI_BAKLAVA_PATH = 'PHOTOS/Pistaasi Baklava/';
const GENERATED_PISTAASI_BAKLAVA = generateProductsFromImages(PISTAASI_BAKLAVA_FILES, PISTAASI_BAKLAVA_PATH, 'sweet', 400, 6.00, true);
// Generar resto de productos Sweet (sin Pistaasi Baklava que ya está incluido)
const SWEET_WITHOUT_PISTAASI = SWEET_IMAGE_FILES.slice(PISTAASI_BAKLAVA_FILES.length);
const GENERATED_SWEET_PRODUCTS_REST = generateProductsFromImages(SWEET_WITHOUT_PISTAASI, SWEET_IMAGES_PATH, 'sweet', 402, 6.00);
// Combinar: Pistaasi Baklava primero, luego el resto
const GENERATED_SWEET_PRODUCTS = [...GENERATED_PISTAASI_BAKLAVA, ...GENERATED_SWEET_PRODUCTS_REST];

// Combinar todos los productos
// Si hay productos personalizados definidos, usar solo esos; si no, usar los generados
let PRODUCTS_DATA = [];

// Verificar si hay productos personalizados definidos
try {
    // Intentar cargar productos personalizados desde product-sections.js
    if (typeof CUSTOM_PRODUCTS_DATA !== 'undefined' && CUSTOM_PRODUCTS_DATA.length > 0) {
        PRODUCTS_DATA = CUSTOM_PRODUCTS_DATA;
        console.log('✅ Usando productos personalizados:', PRODUCTS_DATA.length);
        const baklavaProducts = PRODUCTS_DATA.filter(p => p.name.toLowerCase().includes('baklava'));
        console.log('🥜 Productos Baklava en PRODUCTS_DATA:', baklavaProducts.length);
        baklavaProducts.forEach(p => {
            console.log(`  - ID: ${p.id}, Nombre: ${p.name}, Imagen: ${p.image}`);
        });
    } else {
        // NO usar productos generados automáticamente - array vacío
        PRODUCTS_DATA = [];
        console.log('✅ No hay productos personalizados - array vacío:', PRODUCTS_DATA.length);
    }
} catch (e) {
    // Si hay error, mantener array vacío
    PRODUCTS_DATA = [];
    console.log('⚠️ Error cargando productos personalizados - array vacío:', PRODUCTS_DATA.length);
}

// Debug: Verificar productos generados
console.log('📦 Total productos:', PRODUCTS_DATA.length);
console.log('🍞 Productos Bread generados:', GENERATED_BREAD_PRODUCTS.length);
console.log('🥤 Productos Drinks generados:', GENERATED_DRINKS_PRODUCTS.length);
console.log('🍽️ Productos Food generados:', GENERATED_FOOD_PRODUCTS.length);
console.log('🍰 Productos Sweets generados:', GENERATED_SWEET_PRODUCTS.length);
console.log('🥜 Pistaasi Baklava productos:', GENERATED_PISTAASI_BAKLAVA.length);
console.log('📸 Categorías disponibles:', [...new Set(PRODUCTS_DATA.map(p => p.category))]);
console.log('✅ Script ecommerce-v2.js cargado correctamente - Versión 24 (Todos los productos eliminados)');

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
        return this.cart.reduce((total, item) => {
            const itemPrice = (item.price !== null && item.price !== undefined) ? item.price : 0;
            return total + (itemPrice * item.quantity);
        }, 0);
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
                    ${item.price !== null && item.price !== undefined ? `<p class="cart-item-price">€${item.price.toFixed(2)}</p>` : ''}
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
        
        // Actualizar el texto del total con traducción
        const cartTotalLabel = document.querySelector('.cart-summary-row span[data-translate="cart.total.label"]');
        if (cartTotalLabel) {
            const totalLabelText = getTranslation('cart.total.label');
            if (totalLabelText) {
                // Reemplazar el número dinámicamente manteniendo el span con ID
                const labelWithCount = totalLabelText.replace(/<span id="cart-item-count">0<\/span>/, `<span id="cart-item-count">${totalItems}</span>`);
                cartTotalLabel.innerHTML = labelWithCount;
                // Actualizar el cart-item-count dentro del span también
                const countSpan = cartTotalLabel.querySelector('#cart-item-count');
                if (countSpan) countSpan.textContent = totalItems;
            }
        }
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

        // Búsqueda mejorada por nombre, descripción, tags e ingredientes
        if (this.currentFilter.search) {
            const searchLower = this.currentFilter.search.toLowerCase().trim();
            
            // Palabras clave especiales para productos (keywords completos de la página)
            const allKeywords = [
                // Keywords originales de Pistaasi Baklava
                'baklava', 'filotaikina', 'pistaasi', 'siirappi', 'tuore',
                'pistachio', 'filo', 'pastry', 'syrup', 'fresh',
                // Nuevos keywords para búsqueda rápida
                'manteli', 'medjool', 'taateli', 'gluteeniton', 'gluten-free',
                'saksanpähkinä', 'kananmuna', 'sokeri', 'taikinajuuri', 'luomu',
                'grahamjauho', 'tattarijauho', 'oliiviöljy', 'maapähkinä', 'seesami',
                'tummakaako', 'gasellin', 'sarvet'
            ];
            const isKeywordSearch = allKeywords.some(keyword => 
                searchLower.includes(keyword) || keyword.includes(searchLower)
            );
            
            // Keywords específicos de baklava que deben mostrar SOLO los dos productos personalizados
            const baklavaKeywords = ['baklava', 'filotaikina', 'pistaasi', 'siirappi', 'tuore', 'pistachio', 'filo', 'pastry', 'syrup', 'fresh'];
            const isBaklavaKeywordSearch = baklavaKeywords.some(keyword => 
                searchLower === keyword || searchLower.includes(keyword) || keyword.includes(searchLower)
            );
            
            // Si se busca con keywords de baklava y hay productos personalizados, SOLO mostrar esos dos productos
            if (isBaklavaKeywordSearch && typeof CUSTOM_PRODUCTS_DATA !== 'undefined' && CUSTOM_PRODUCTS_DATA.length > 0) {
                // Filtrar SOLO los productos de baklava personalizados (IDs 1 y 2)
                const baklavaProducts = CUSTOM_PRODUCTS_DATA.filter(cp => cp.name.toLowerCase().includes('baklava'));
                console.log('🔍 Búsqueda Baklava - Productos personalizados encontrados:', baklavaProducts.length);
                console.log('🔍 Productos Baklava:', baklavaProducts.map(p => ({ id: p.id, name: p.name, image: p.image })));
                
                filtered = filtered.filter(p => {
                    const isCustomBaklava = CUSTOM_PRODUCTS_DATA.some(cp => 
                        cp.id === p.id && cp.name.toLowerCase().includes('baklava')
                    );
                    return isCustomBaklava;
                });
                console.log('✅ Productos filtrados después de búsqueda Baklava:', filtered.length);
            } else {
                // Búsqueda normal para otros términos
                filtered = filtered.filter(p => {
                    const nameLower = p.name.toLowerCase();
                    const descLower = p.description.toLowerCase();
                    const isPistaasi = nameLower.includes('pistaasi baklava');
                    const isBaklavaProduct = nameLower.includes('baklava') || (p.tags && p.tags.some(t => t && t.toLowerCase() === 'baklava'));
                    
                    // Si la búsqueda es una palabra clave especial, priorizar productos relacionados
                    if (isKeywordSearch && (isPistaasi || nameLower.includes('baklava'))) {
                        return true;
                    }
                    
                    // Búsqueda mejorada en nombre, descripción, tags e ingredientes
                    // Buscar en nombre
                    if (nameLower.includes(searchLower)) return true;
                    
                    // Buscar en descripción
                    if (descLower.includes(searchLower)) return true;
                    
                    // Búsqueda mejorada en tags (sin importar mayúsculas/minúsculas y palabras parciales)
                    if (p.tags && p.tags.length > 0) {
                        const tagMatch = p.tags.some(tag => {
                            if (!tag) return false;
                            const tagLower = tag.toLowerCase();
                            // Buscar coincidencia exacta o parcial
                            return tagLower.includes(searchLower) || searchLower.includes(tagLower);
                        });
                        if (tagMatch) return true;
                    }
                    
                    // Búsqueda en ingredientes
                    if (p.ingredients && p.ingredients.length > 0) {
                        const ingredientMatch = p.ingredients.some(ingredient => {
                            const ingName = typeof ingredient === 'string' ? ingredient : ingredient.name;
                            if (!ingName) return false;
                            return ingName.toLowerCase().includes(searchLower);
                        });
                        if (ingredientMatch) return true;
                    }
                    
                    return false;
                });
            }
            
            // Si la búsqueda es una palabra clave especial, ordenar productos relacionados primero
            if (isKeywordSearch) {
                filtered.sort((a, b) => {
                    const aName = a.name.toLowerCase();
                    const bName = b.name.toLowerCase();
                    const searchLower = this.currentFilter.search.toLowerCase();
                    
                    // Priorizar productos que contengan "baklava" en el nombre
                    const aIsBaklava = aName.includes('baklava');
                    const bIsBaklava = bName.includes('baklava');
                    if (aIsBaklava && !bIsBaklava) return -1;
                    if (!aIsBaklava && bIsBaklava) return 1;
                    
                    // Priorizar productos que coincidan exactamente con la búsqueda
                    const aExactMatch = aName.includes(searchLower) || (a.tags && a.tags.some(t => t && t.toLowerCase() === searchLower));
                    const bExactMatch = bName.includes(searchLower) || (b.tags && b.tags.some(t => t && t.toLowerCase() === searchLower));
                    if (aExactMatch && !bExactMatch) return -1;
                    if (!aExactMatch && bExactMatch) return 1;
                    
                    // Luego productos con keywords relacionados
                    const aHasKeyword = allKeywords.some(kw => 
                        aName.includes(kw) || 
                        (a.tags && a.tags.some(t => t && t.toLowerCase().includes(kw)))
                    );
                    const bHasKeyword = allKeywords.some(kw => 
                        bName.includes(kw) || 
                        (b.tags && b.tags.some(t => t && t.toLowerCase().includes(kw)))
                    );
                    if (aHasKeyword && !bHasKeyword) return -1;
                    if (!aHasKeyword && bHasKeyword) return 1;
                    return 0;
                });
            }
        }

        // Filtro por categoría
        if (this.currentFilter.category !== 'all') {
            filtered = filtered.filter(p => p.category === this.currentFilter.category);
        }

        // Filtro por precio (solo si el producto tiene precio)
        filtered = filtered.filter(p => 
            p.price === null || p.price === undefined || 
            (p.price >= this.currentFilter.minPrice && p.price <= this.currentFilter.maxPrice)
        );

        // Ordenamiento
        this.sortProducts(filtered);

        return filtered;
    }

    sortProducts(products) {
        // Primero ordenar para que productos de Baklava siempre aparezcan primero
        products.sort((a, b) => {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            const aIsBaklava = aName.includes('baklava');
            const bIsBaklava = bName.includes('baklava');
            const aIsPistaasi = aName.includes('pistaasi baklava');
            const bIsPistaasi = bName.includes('pistaasi baklava');
            
            // Prioridad 1: Pistaasi Baklava
            if (aIsPistaasi && !bIsPistaasi) return -1;
            if (!aIsPistaasi && bIsPistaasi) return 1;
            
            // Prioridad 2: Otros productos Baklava
            if (aIsBaklava && !bIsBaklava) return -1;
            if (!aIsBaklava && bIsBaklava) return 1;
            
            // Luego aplicar el ordenamiento seleccionado
            switch (this.currentFilter.sortBy) {
                case 'bestSeller':
                    if (a.bestSeller && !b.bestSeller) return -1;
                    if (!a.bestSeller && b.bestSeller) return 1;
                    return 0;
                case 'new':
                    if (a.new && !b.new) return -1;
                    if (!a.new && b.new) return 1;
                    return 0;
                case 'rating':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });
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
        // Mostrar todos los productos por defecto (no filtrar por categoría)
        this.filter.currentFilter.category = 'all';
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.value = 'all';
        }
        
        this.renderProducts();
        this.setupEventListeners();
        wishlistManager.updateWishlistIcons();
    }

    setupEventListeners() {
        // Búsqueda mejorada con autocompletado
        const searchInput = document.getElementById('product-search');
        const searchSuggestions = document.getElementById('search-suggestions');
        if (searchInput) {
            let debounceTimer;
            
            // Búsqueda mejorada con sugerencias
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                clearTimeout(debounceTimer);
                
                // Mostrar sugerencias mientras escribe
                if (query.length > 0) {
                    this.showSearchSuggestions(query);
                } else {
                    if (searchSuggestions) searchSuggestions.style.display = 'none';
                }
                
                debounceTimer = setTimeout(() => {
                    this.filter.currentFilter.search = query;
                    this.renderProducts();
                    if (searchSuggestions) searchSuggestions.style.display = 'none';
                }, 300);
            });
            
            // Ocultar sugerencias al hacer click fuera
            document.addEventListener('click', (e) => {
                if (searchSuggestions && !searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                    searchSuggestions.style.display = 'none';
                }
            });
        }

        // Botones de filtro (bread, drinks, food, sweet, all)
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const filterValue = btn.dataset.filter || 'all';
                
                // Actualizar estado visual de los botones
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Aplicar filtro
                this.filter.currentFilter.category = filterValue;
                this.renderProducts();
                
                // Sincronizar con el dropdown de categorías
                const categoryFilter = document.getElementById('category-filter');
                if (categoryFilter) {
                    categoryFilter.value = filterValue;
                }
            });
        });

        // Filtros de categoría - poblar dinámicamente
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            const categories = this.filter.getCategories();
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                // Traducir categoría sin el prefijo "category."
                const catKey = category.toLowerCase().replace(' ', '.');
                let translatedCat = getTranslation(`category.${catKey}`) || category;
                // Eliminar el prefijo "category." si existe en el texto
                translatedCat = translatedCat.replace(/^category\./i, '');
                option.textContent = translatedCat;
                option.setAttribute('data-translate', `category.${catKey}`);
                categoryFilter.appendChild(option);
            });

            categoryFilter.addEventListener('change', (e) => {
                const filterValue = e.target.value;
                this.filter.currentFilter.category = filterValue;
                
                // Sincronizar con los botones de filtro
                filterButtons.forEach(btn => {
                    if ((btn.dataset.filter || 'all') === filterValue) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
                
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

        // Botones de palabras clave para búsqueda rápida (todos los keywords)
        const keywordButtons = document.querySelectorAll('.keyword-btn');
        keywordButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const keyword = btn.dataset.keyword || '';
                
                // Actualizar estado visual de los botones
                keywordButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Establecer la búsqueda con la palabra clave
                if (searchInput) {
                    searchInput.value = keyword;
                    this.filter.currentFilter.search = keyword;
                }
                
                // No filtrar automáticamente por categoría, mostrar todos los resultados
                this.filter.currentFilter.category = 'all';
                const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
                if (allFilterBtn) {
                    filterButtons.forEach(b => b.classList.remove('active'));
                    allFilterBtn.classList.add('active');
                }
                if (categoryFilter) {
                    categoryFilter.value = 'all';
                }
                
                this.renderProducts();
                
                // Scroll suave a los productos
                setTimeout(() => {
                    const productsGrid = document.getElementById('products-grid');
                    if (productsGrid) {
                        productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            });
        });
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

        // Verificar si hay secciones definidas y si hay productos con secciones
        const hasSections = typeof PRODUCT_SECTIONS !== 'undefined' && PRODUCT_SECTIONS.length > 0;
        const hasProductsWithSections = filtered.some(p => p.section && PRODUCT_SECTIONS.find(s => s.id === p.section));
        
        // Productos sin sección (favoritos)
        const productsWithoutSection = filtered.filter(p => !p.section || !PRODUCT_SECTIONS.find(s => s.id === p.section));
        
        // Si hay productos sin sección, mostrarlos primero (son los favoritos)
        if (productsWithoutSection.length > 0) {
            // Mostrar productos favoritos sin sección
            container.innerHTML = productsWithoutSection.map(product => this.renderProductCard(product)).join('');
            
            // Si también hay productos con secciones, agregarlos después
            if (hasSections && hasProductsWithSections) {
                const productsWithSections = filtered.filter(p => p.section && PRODUCT_SECTIONS.find(s => s.id === p.section));
                if (productsWithSections.length > 0) {
                    const sectionsHTML = this.renderProductsBySectionsHTML(productsWithSections);
                    container.innerHTML += sectionsHTML;
                }
            }
        } else if (hasSections && hasProductsWithSections) {
            // Renderizar por secciones
            this.renderProductsBySections(filtered, container);
        } else {
            // Renderizar normalmente sin secciones
            container.innerHTML = filtered.map(product => this.renderProductCard(product)).join('');
        }
        
        // Re-attach event listeners
        this.attachProductListeners();
        wishlistManager.updateWishlistIcons();
    }

    renderProductsBySections(filteredProducts, container) {
        // Obtener secciones ordenadas
        const orderedSections = typeof getOrderedSections === 'function' ? getOrderedSections() : PRODUCT_SECTIONS.sort((a, b) => (a.order || 999) - (b.order || 999));
        
        let html = '';
        
        orderedSections.forEach(section => {
            // Obtener productos de esta sección que estén en los filtrados
            const sectionProducts = filteredProducts.filter(p => p.section === section.id);
            
            if (sectionProducts.length > 0) {
                // Obtener nombre y descripción traducidos
                const sectionName = section.nameKey ? getTranslation(section.nameKey) : (section.name || 'Section');
                const sectionDesc = section.descriptionKey ? getTranslation(section.descriptionKey) : (section.description || '');
                
                html += `
                    <div class="product-section" data-section-id="${section.id}" style="width: 100%; margin-bottom: 3rem;">
                        <div class="section-header" style="margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid #C9A961;">
                            <h3 class="section-title" style="font-size: 1.8rem; color: #6B4423; font-weight: 700; margin-bottom: 0.5rem;">
                                ${section.icon || '📦'} ${sectionName}
                            </h3>
                            ${sectionDesc ? `<p class="section-description" style="color: #4A2C1A; font-size: 1rem; margin: 0;">${sectionDesc}</p>` : ''}
                        </div>
                        <div class="section-products-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem;">
                            ${sectionProducts.map(product => this.renderProductCard(product)).join('')}
                        </div>
                    </div>
                `;
            }
        });
        
        // Productos sin sección asignada (si los hay) - MOSTRAR PRIMERO
        const productsWithoutSection = filteredProducts.filter(p => !p.section || !PRODUCT_SECTIONS.find(s => s.id === p.section));
        if (productsWithoutSection.length > 0) {
            // Mostrar productos sin sección al inicio si son favoritos
            const favoritesWithoutSection = productsWithoutSection.filter(p => p.bestSeller);
            const otherWithoutSection = productsWithoutSection.filter(p => !p.bestSeller);
            
            if (favoritesWithoutSection.length > 0) {
                html = `
                    <div class="product-section" data-section-id="favorites" style="width: 100%; margin-bottom: 3rem;">
                        <div class="section-products-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem;">
                            ${favoritesWithoutSection.map(product => this.renderProductCard(product)).join('')}
                        </div>
                    </div>
                ` + html;
            }
            
            if (otherWithoutSection.length > 0) {
                html += `
                    <div class="product-section" data-section-id="no-section" style="width: 100%; margin-top: 3rem;">
                        <div class="section-products-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem;">
                            ${otherWithoutSection.map(product => this.renderProductCard(product)).join('')}
                        </div>
                    </div>
                `;
            }
        }
        
        container.innerHTML = html;
    }

    renderProductsBySectionsHTML(filteredProducts) {
        // Obtener secciones ordenadas
        const orderedSections = typeof getOrderedSections === 'function' ? getOrderedSections() : PRODUCT_SECTIONS.sort((a, b) => (a.order || 999) - (b.order || 999));
        
        let html = '';
        
        orderedSections.forEach(section => {
            // Obtener productos de esta sección que estén en los filtrados
            const sectionProducts = filteredProducts.filter(p => p.section === section.id);
            
            if (sectionProducts.length > 0) {
                // Obtener nombre y descripción traducidos
                const sectionName = section.nameKey ? getTranslation(section.nameKey) : (section.name || 'Section');
                const sectionDesc = section.descriptionKey ? getTranslation(section.descriptionKey) : (section.description || '');
                
                html += `
                    <div class="product-section" data-section-id="${section.id}" style="width: 100%; margin-top: 3rem; margin-bottom: 3rem;">
                        <div class="section-header" style="margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid #C9A961;">
                            <h3 class="section-title" style="font-size: 1.8rem; color: #6B4423; font-weight: 700; margin-bottom: 0.5rem;">
                                ${section.icon || '📦'} ${sectionName}
                            </h3>
                            ${sectionDesc ? `<p class="section-description" style="color: #4A2C1A; font-size: 1rem; margin: 0;">${sectionDesc}</p>` : ''}
                        </div>
                        <div class="section-products-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem;">
                            ${sectionProducts.map(product => this.renderProductCard(product)).join('')}
                        </div>
                    </div>
                `;
            }
        });
        
        return html;
    }

    renderProductCard(product) {
        const stockStatus = this.getStockStatus(product.stock);
        const isWishlisted = wishlistManager.isInWishlist(product.id);
        
        const productName = getTranslation(`product.${product.id}.name`) || product.name;
        const productDesc = getTranslation(`product.${product.id}.desc`) || product.description;

        return `
            <div class="product-card enhanced" data-id="${product.id}">
                ${stockStatus.badge ? `<span class="stock-badge ${stockStatus.class}">${stockStatus.badge}</span>` : ''}
                ${product.new ? `<span class="badge new">${getTranslation('badge.new')}</span>` : product.bestSeller ? `<span class="badge bestseller">${getTranslation('badge.bestseller')}</span>` : ''}
                
                <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-product-id="${product.id}" 
                        onclick="wishlistManager.toggleWishlist(${product.id}); productDisplay.renderProducts();">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>

                <div class="product-image" onclick="productDisplay.openProductLightbox(${product.id})" style="cursor: pointer;">
                    <img src="${product.image}" alt="${productName}" loading="lazy" 
                         onerror="console.error('❌ Error cargando imagen:', this.src); this.onerror=null; this.src='PHOTOS/Food/Carré beige.jpg';">
                    ${this.hasMultipleProductImages(product) ? '<span class="multiple-angles-badge" title="Múltiples ángulos disponibles">📷</span>' : ''}
                    <div class="product-watermark">
                        <img src="assets/icons/amherkut-logo-original.jpg" alt="Amherkut Logo" class="watermark-logo">
                    </div>
                </div>

                <div class="product-rating">
                    ${this.renderStars(product.rating)}
                    <span>${product.rating}</span>
                    <span class="reviews-count">(${product.reviews})</span>
                </div>

                <h3 onclick="productDisplay.showProductModal(${product.id})">${productName}</h3>
                <p>${productDesc}</p>
                ${product.ingredients && product.ingredients.length > 0 ? `
                <div class="product-card-ingredients">
                    <strong style="font-size: 0.85rem; color: #6B4423; display: block; margin-top: 0.75rem; margin-bottom: 0.5rem;">${getTranslation('product.ingredients') || 'Ingredientes'}:</strong>
                    <div class="product-ingredients-preview">
                        ${this.renderIngredients(product.ingredients.slice(0, 4))}
                        ${product.ingredients.length > 4 ? `<span class="ingredient-more">+${product.ingredients.length - 4} ${getTranslation('product.more') || 'más'}</span>` : ''}
                    </div>
                </div>
                ` : ''}
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

    renderIngredients(ingredients) {
        if (!ingredients || ingredients.length === 0) return '';
        
        return ingredients.map(ingredient => {
            const ingredientName = typeof ingredient === 'string' ? ingredient : ingredient.name;
            const ingredientKey = ingredientName.toLowerCase().replace(/\s+/g, '.');
            const translatedIngredient = getTranslation(`ingredient.${ingredientKey}`) || ingredientName;
            
            return `<span class="ingredient-tag">${translatedIngredient}</span>`;
        }).join('');
    }

    getStockStatus(stock) {
        if (stock === 0) {
            return { badge: getTranslation('badge.outofstock'), class: 'out-of-stock' };
        } else if (stock < 10) {
            return { badge: getTranslation('badge.lowstock'), class: 'low-stock' };
        }
        return { badge: null, class: 'in-stock' };
    }

    showSearchSuggestions(query) {
        const searchSuggestions = document.getElementById('search-suggestions');
        if (!searchSuggestions) return;
        
        const queryLower = query.toLowerCase();
        const suggestions = new Set();
        
        // Palabras clave especiales (todos los keywords de la página)
        const allKeywords = [
            'baklava', 'filotaikina', 'pistaasi', 'siirappi', 'tuore',
            'pistachio', 'filo', 'pastry', 'syrup', 'fresh',
            'manteli', 'medjool', 'taateli', 'gluteeniton', 'gluten-free',
            'saksanpähkinä', 'kananmuna', 'sokeri', 'taikinajuuri', 'luomu',
            'grahamjauho', 'tattarijauho', 'oliiviöljy', 'maapähkinä', 'seesami',
            'tummakaako', 'gasellin', 'sarvet'
        ];
        
        // Si la búsqueda coincide con alguna palabra clave, agregar productos relacionados
        const isKeywordMatch = allKeywords.some(keyword => 
            queryLower.includes(keyword) || keyword.includes(queryLower)
        );
        
        if (isKeywordMatch) {
            // Buscar productos que tengan estos keywords en sus tags o nombre
            PRODUCTS_DATA.forEach(product => {
                const productNameLower = product.name.toLowerCase();
                const hasKeyword = allKeywords.some(kw => {
                    const kwLower = kw.toLowerCase();
                    return productNameLower.includes(kwLower) ||
                           (product.tags && product.tags.some(t => t && t.toLowerCase().includes(kwLower)));
                });
                if (hasKeyword) {
                    suggestions.add(product.name);
                }
            });
        }
        
        // Buscar en nombres, descripciones, tags e ingredientes
        PRODUCTS_DATA.forEach(product => {
            // Nombres
            if (product.name.toLowerCase().includes(queryLower)) {
                suggestions.add(product.name);
            }
            // Ingredientes
            if (product.ingredients && product.ingredients.length > 0) {
                product.ingredients.forEach(ing => {
                    const ingName = typeof ing === 'string' ? ing : ing.name;
                    if (ingName && ingName.toLowerCase().includes(queryLower)) {
                        suggestions.add(ingName);
                    }
                });
            }
            // Tags - buscar también palabras parciales y sin importar mayúsculas
            if (product.tags) {
                product.tags.forEach(tag => {
                    if (tag) {
                        const tagLower = tag.toLowerCase();
                        // Agregar el tag si coincide exactamente o parcialmente
                        if (tagLower.includes(queryLower) || queryLower.includes(tagLower)) {
                            suggestions.add(tag);
                        }
                    }
                });
            }
        });
        
        // Mostrar sugerencias (máximo 5)
        const suggestionsArray = Array.from(suggestions).slice(0, 5);
        if (suggestionsArray.length > 0) {
            searchSuggestions.innerHTML = suggestionsArray.map(suggestion => {
                const escapedSuggestion = suggestion.replace(/'/g, "\\'");
                return `<div class="suggestion-item" onclick="document.getElementById('product-search').value='${escapedSuggestion}'; productDisplay.filter.currentFilter.search='${escapedSuggestion}'; productDisplay.renderProducts(); document.getElementById('search-suggestions').style.display='none';">${suggestion}</div>`;
            }).join('');
            searchSuggestions.style.display = 'block';
        } else {
            searchSuggestions.style.display = 'none';
        }
    }

    attachProductListeners() {
        // Los event listeners se manejan con onclick inline para simplicidad
    }

    hasMultipleProductImages(product) {
        // Verificar si el producto tiene múltiples imágenes usando product-images-manager
        if (typeof productImagesManager === 'undefined') return false;
        
        // Buscar el productId basado en la imagen del producto
        const productId = this.findProductIdFromImage(product.image, product.category);
        if (!productId) return false;
        
        return productImagesManager.hasMultipleAngles(productId);
    }

    findProductIdFromImage(imagePath, category) {
        if (typeof productImagesManager === 'undefined') return null;
        
        // Normalizar la ruta para comparación
        const normalizePath = (path) => {
            return path
                .replace(/^\.\//, '')
                .replace(/^\/Amherkut\//, '')
                .replace(/%20/g, ' ')
                .toLowerCase();
        };
        
        const normalizedImagePath = normalizePath(imagePath);
        const products = productImagesManager.getProductsByCategory(category);
        
        for (const product of products) {
            const found = product.images.find(img => {
                const normalizedImgPath = normalizePath(img.path);
                const normalizedFullPath = normalizePath(img.fullPath);
                return normalizedImagePath.includes(normalizedImgPath) || 
                       normalizedImagePath === normalizedFullPath ||
                       normalizedImgPath.includes(normalizedImagePath.split('/').pop());
            });
            if (found) {
                return product.id;
            }
        }
        return null;
    }

    openProductLightbox(productId) {
        // Obtener el producto desde PRODUCTS_DATA
        const product = PRODUCTS_DATA.find(p => p.id === productId);
        if (!product) return;

        // Buscar el productId del sistema de imágenes múltiples
        const multiImageProductId = this.findProductIdFromImage(product.image, product.category);
        
        // Si hay múltiples imágenes, usar el sistema de galería
        if (multiImageProductId && typeof imageGallery !== 'undefined') {
            imageGallery.openLightbox(product.category, 0, multiImageProductId);
        } else if (typeof imageGallery !== 'undefined') {
            // Si no hay múltiples imágenes, abrir solo esta imagen
            // Necesitamos encontrar el índice en la galería
            const galleryImages = imageGallery.images[product.category] || [];
            const index = galleryImages.findIndex(img => img.includes(product.image.split('/').pop()));
            if (index >= 0) {
                imageGallery.openLightbox(product.category, index);
            }
        }
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
        let translatedCat = getTranslation(`category.${catKey}`) || product.category;
        // Eliminar el prefijo "category." si existe
        translatedCat = translatedCat.replace(/^category\./i, '');

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
                        <div class="product-watermark">
                            <img src="assets/icons/amherkut-logo-original.jpg" alt="Amherkut Logo" class="watermark-logo">
                        </div>
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

                        ${product.price !== null && product.price !== undefined ? `
                        <div class="product-modal-price">
                            <span class="price-main">€${product.price.toFixed(2)}</span>
                            ${product.originalPrice ? `<span class="price-original">€${product.originalPrice.toFixed(2)}</span>` : ''}
                        </div>
                        ` : ''}

                        <p class="product-modal-description">${productDesc}</p>

                        ${product.ingredients && product.ingredients.length > 0 ? `
                        <div class="product-modal-ingredients">
                            <strong>${getTranslation('product.ingredients') || 'Ingredientes'}:</strong>
                            <div class="ingredients-list">
                                ${this.renderIngredients(product.ingredients)}
                            </div>
                        </div>
                        ` : ''}

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

                            ${product.price !== null && product.price !== undefined ? `
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
                            ` : `
                            <a href="index.html#quick-contact" class="btn btn-primary btn-large" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                                ${getTranslation('product.consult.price') || 'Consultar Precio'}
                            </a>
                            `}
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

