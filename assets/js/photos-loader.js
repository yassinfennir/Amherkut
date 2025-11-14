/**
 * PHOTOS LOADER - Carga y agrupa imágenes directamente desde el HTML
 * Escanea las tarjetas de productos y agrupa imágenes por carpeta
 */

class PhotosLoader {
    constructor() {
        this.productsMap = new Map();
        this.init();
    }

    init() {
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.scanProducts());
        } else {
            this.scanProducts();
        }
    }

    /**
     * Escanea las tarjetas de productos en la página y agrupa sus imágenes
     */
    scanProducts() {
        const productCards = document.querySelectorAll('.product-card[data-product-id]');
        
        productCards.forEach(card => {
            const productId = card.getAttribute('data-product-id');
            const imgElement = card.querySelector('.product-image');
            const productName = card.querySelector('.product-name')?.textContent || 'Producto';
            
            if (!imgElement) return;
            
            // Obtener todas las imágenes del atributo data-images
            const imagesData = card.getAttribute('data-images');
            let images = [];
            
            if (imagesData) {
                // Separar las imágenes por el separador |
                images = imagesData.split('|').filter(img => img.trim() !== '');
            } else {
                // Fallback: usar solo la imagen visible
                images = [imgElement.src];
            }
            
            // Guardar en el mapa
            this.productsMap.set(productId, {
                id: productId,
                name: productName,
                description: card.querySelector('.product-description')?.textContent || '',
                images: images.map((img, index) => ({
                    path: img,
                    alt: `${productName} - Vista ${index + 1}`,
                    angle: index + 1
                })),
                hasMultipleAngles: images.length > 1
            });
        });
        
        // Conectar eventos de click
        this.attachClickHandlers();
    }

    /**
     * Adjunta handlers de click a las tarjetas de productos
     */
    attachClickHandlers() {
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card[data-product-id]');
            if (!card) return;
            
            const productId = card.getAttribute('data-product-id');
            const product = this.productsMap.get(productId);
            
            if (product && typeof productGallery !== 'undefined') {
                productGallery.open(product);
            }
        });
    }

    /**
     * Obtiene un producto por su ID
     */
    getProduct(productId) {
        return this.productsMap.get(productId);
    }

    /**
     * Obtiene todos los productos de una categoría
     */
    getProductsByCategory(category) {
        const products = [];
        this.productsMap.forEach((product, id) => {
            if (id.startsWith(category + '-')) {
                products.push(product);
            }
        });
        return products;
    }
}

// Instancia global
let photosLoader;

// Inicializar
if (typeof document !== 'undefined') {
    photosLoader = new PhotosLoader();
}

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhotosLoader;
}

