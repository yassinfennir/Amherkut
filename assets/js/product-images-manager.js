/**
 * PRODUCT IMAGES MANAGER - Gestión de múltiples imágenes por producto
 * Detecta y organiza productos con múltiples ángulos desde PHOTOS
 */

class ProductImagesManager {
    constructor() {
        this.productsData = new Map();
        this.basePath = window.location.hostname.includes('github.io') ? '/Amherkut/' : './';
        this.init();
    }

    init() {
        this.loadProductsStructure();
    }

    /**
     * Carga la estructura de productos con múltiples imágenes
     */
    loadProductsStructure() {
        // Estructura basada en la organización real de PHOTOS
        const structure = {
            bread: this.getBreadStructure(),
            drinks: this.getDrinksStructure(),
            food: this.getFoodStructure(),
            sweet: this.getSweetStructure()
        };

        // Procesar cada categoría
        Object.keys(structure).forEach(category => {
            structure[category].forEach((product, index) => {
                const productId = `${category}_${index + 1}`;
                const images = this.buildImagePaths(category, product);
                
                if (images.length > 0) {
                    this.productsData.set(productId, {
                        id: productId,
                        category: category,
                        name: product.name || `Producto ${index + 1}`,
                        images: images,
                        hasMultipleAngles: images.length > 1,
                        folder: product.folder || null
                    });
                }
            });
        });
    }

    /**
     * Estructura de productos Bread
     * EMPEZANDO DESDE CERO - Listo para agregar productos
     */
    getBreadStructure() {
        return [
            // Los productos de bread se agregarán aquí
            // Formato:
            // { folder: 'carpeta', name: 'Nombre del Producto', files: ['archivo1.jpg', 'archivo2.jpg'] }
        ];
    }

    /**
     * Estructura de productos Drinks
     * EMPEZANDO DESDE CERO - Listo para agregar productos
     */
    getDrinksStructure() {
        return [
            // Los productos de drinks se agregarán aquí
        ];
    }

    /**
     * Estructura de productos Food
     * EMPEZANDO DESDE CERO - Listo para agregar productos
     */
    getFoodStructure() {
        return [
            // Los productos de food se agregarán aquí
        ];
    }

    /**
     * Estructura de productos Sweet
     * EMPEZANDO DESDE CERO - Listo para agregar productos
     */
    getSweetStructure() {
        return [
            // Los productos de sweet se agregarán aquí
        ];
    }

    /**
     * Construye las rutas de imágenes para un producto
     */
    buildImagePaths(category, product) {
        const images = [];
        const categoryPath = `PHOTOS/${this.capitalizeFirst(category)}`;

        if (product.folder) {
            // Producto con subcarpeta numerada (ej: Bread/1/)
            const folderPath = `${categoryPath}/${product.folder}`;
            
            if (product.files) {
                // Archivos específicos
                product.files.forEach((file, index) => {
                    images.push({
                        path: `${folderPath}/${file}`,
                        fullPath: `${this.basePath}${folderPath}/${file}`,
                        angle: index + 1,
                        alt: `${product.name} - Ángulo ${index + 1}`
                    });
                });
            } else {
                // Buscar archivos numerados comunes (1.jpg, 2.jpg, etc.)
                for (let i = 1; i <= 5; i++) {
                    images.push({
                        path: `${folderPath}/${i}.jpg`,
                        fullPath: `${this.basePath}${folderPath}/${i}.jpg`,
                        angle: i,
                        alt: `${product.name} - Ángulo ${i}`
                    });
                }
            }
        } else if (product.files) {
            // Producto con archivos en la raíz de la categoría
            product.files.forEach((file, index) => {
                images.push({
                    path: `${categoryPath}/${file}`,
                    fullPath: `${this.basePath}${categoryPath}/${file}`,
                    angle: index + 1,
                    alt: `${product.name} - ${file.replace(/\.[^/.]+$/, '')}`
                });
            });
        } else if (product.subfolder) {
            // Producto con subcarpeta compleja (ej: Sweet/Baklava/)
            const subfolderPath = `${categoryPath}/${product.subfolder}`;
            
            if (product.files) {
                product.files.forEach((file, index) => {
                    images.push({
                        path: `${subfolderPath}/${file}`,
                        fullPath: `${this.basePath}${subfolderPath}/${file}`,
                        angle: index + 1,
                        alt: `${product.name} - ${file.replace(/\.[^/.]+$/, '')}`
                    });
                });
            } else {
                // Intentar archivos comunes
                for (let i = 1; i <= 3; i++) {
                    ['jpg', 'png', 'JPG', 'PNG'].forEach(ext => {
                        images.push({
                            path: `${subfolderPath}/${i}.${ext}`,
                            fullPath: `${this.basePath}${subfolderPath}/${i}.${ext}`,
                            angle: i,
                            alt: `${product.name} - Ángulo ${i}`
                        });
                    });
                }
            }
        }

        return images;
    }

    /**
     * Obtiene un producto por su ID
     */
    getProduct(productId) {
        return this.productsData.get(productId);
    }

    /**
     * Obtiene todas las imágenes de un producto
     */
    getProductImages(productId) {
        const product = this.getProduct(productId);
        return product ? product.images : [];
    }

    /**
     * Verifica si un producto tiene múltiples ángulos
     */
    hasMultipleAngles(productId) {
        const product = this.getProduct(productId);
        return product ? product.hasMultipleAngles : false;
    }

    /**
     * Obtiene la primera imagen de un producto (para mostrar en la tarjeta)
     */
    getFirstImage(productId) {
        const images = this.getProductImages(productId);
        return images.length > 0 ? images[0] : null;
    }

    /**
     * Capitaliza la primera letra
     */
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Busca productos por categoría
     */
    getProductsByCategory(category) {
        const products = [];
        this.productsData.forEach((product, key) => {
            if (product.category === category) {
                products.push(product);
            }
        });
        return products.sort((a, b) => {
            const aNum = parseInt(a.id.split('_')[1]) || 0;
            const bNum = parseInt(b.id.split('_')[1]) || 0;
            return aNum - bNum;
        });
    }

    /**
     * Obtiene el ID del producto basado en la ruta de imagen
     */
    getProductIdFromImagePath(imagePath) {
        // Buscar en todos los productos
        for (const [productId, product] of this.productsData.entries()) {
            const found = product.images.find(img => 
                imagePath.includes(img.path) || 
                imagePath.includes(product.folder) ||
                img.fullPath === imagePath
            );
            if (found) {
                return productId;
            }
        }
        return null;
    }
}

// Instancia global
let productImagesManager;

// Inicializar cuando el DOM esté listo
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        productImagesManager = new ProductImagesManager();
    });
}

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductImagesManager;
}

