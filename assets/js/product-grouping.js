/**
 * PRODUCT GROUPING SYSTEM
 * Agrupa productos iguales y prepara datos para la galería
 */

class ProductGrouping {
    constructor() {
        this.productsData = [];
        this.init();
    }

    init() {
        this.loadProductsData();
        this.attachClickHandlers();
    }

    /**
     * Carga los datos de productos agrupados desde el photos-scanner
     */
    async loadProductsData() {
        // Esperar a que el photos-scanner esté listo
        if (typeof photosScanner === 'undefined' || !photosScanner.productsMap) {
            // Si el scanner no está listo, esperar un poco
            setTimeout(() => this.loadProductsData(), 100);
            return;
        }

        // Obtener productos de cada categoría desde el scanner
        const categories = ['food', 'baby', 'sweet', 'bread'];
        
        categories.forEach(category => {
            const products = photosScanner.getProductsByCategory(category);
            products.forEach(product => {
                // Asegurar que el producto tenga todas las propiedades necesarias
                if (!this.productsData.find(p => p.id === product.id)) {
                    this.productsData.push({
                        ...product,
                        category: category
                    });
                }
            });
        });

        // Una vez cargados los datos, actualizar las imágenes en la página
        this.updateProductImages();
    }

    /**
     * Actualiza las imágenes de los productos en la página
     * Muestra solo la primera imagen de cada producto
     */
    updateProductImages() {
        document.querySelectorAll('.product-card[data-product-id]').forEach(card => {
            const productId = card.getAttribute('data-product-id');
            const product = this.productsData.find(p => p.id === productId);
            
            if (product && product.images && product.images.length > 0) {
                const imgElement = card.querySelector('.product-image');
                const indicator = card.querySelector('.product-image-indicator');
                
                if (imgElement) {
                    // Mostrar solo la primera imagen
                    const firstImage = product.images[0];
                    imgElement.src = firstImage.path;
                    imgElement.alt = firstImage.alt || product.name;
                    
                    // Actualizar el indicador de múltiples imágenes
                    if (indicator && product.images.length > 1) {
                        const countSpan = indicator.querySelector('span') || indicator;
                        if (indicator.textContent) {
                            indicator.innerHTML = `
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="9" y1="3" x2="9" y2="21"></line>
                                </svg>
                                ${product.images.length} vistas
                            `;
                        }
                    } else if (indicator && product.images.length === 1) {
                        indicator.style.display = 'none';
                    }
                }
            }
        });
    }

    /**
     * Adjunta los handlers de click a las tarjetas de productos
     */
    attachClickHandlers() {
        // Usar delegación de eventos para manejar productos que se agregan dinámicamente
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card[data-product-id]');
            if (!card) return;
            
            const productId = card.getAttribute('data-product-id');
            const product = this.productsData.find(p => p.id === productId);
            
            if (product && productGallery) {
                // Preparar el producto con todas sus imágenes para la galería
                const galleryProduct = {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    images: product.images.map(img => ({
                        path: img.path,
                        alt: img.alt || `${product.name} - ${img.angle || 'Vista'}`
                    }))
                };
                
                productGallery.open(galleryProduct);
            }
        });
    }

    /**
     * Obtiene un producto por su ID
     */
    getProduct(productId) {
        return this.productsData.find(p => p.id === productId);
    }

    /**
     * Obtiene todos los productos de una categoría
     */
    getProductsByCategory(category) {
        return this.productsData.filter(p => p.category === category);
    }
}

// Instancia global
let productGrouping;

// Inicializar cuando el DOM esté listo
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', async () => {
        productGrouping = new ProductGrouping();
        
        // Esperar a que el photos-scanner esté listo antes de cargar datos
        if (typeof photosScanner !== 'undefined') {
            await photosScanner.scanPhotosStructure();
            await productGrouping.loadProductsData();
        } else {
            // Si el scanner aún no está listo, esperar un poco más
            setTimeout(async () => {
                if (typeof photosScanner !== 'undefined') {
                    await photosScanner.scanPhotosStructure();
                    await productGrouping.loadProductsData();
                }
            }, 500);
        }
    });
}

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductGrouping;
}

