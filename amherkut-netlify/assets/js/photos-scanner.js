/**
 * PHOTOS SCANNER - Sistema de organización automática de imágenes
 * Escanea la carpeta PHOTOS y organiza productos con múltiples ángulos
 * Actualizado para trabajar con la estructura real: BREAD, FOOD, SWEET, BABY
 */

class PhotosScanner {
    constructor() {
        this.productsMap = new Map();
        this.basePath = window.location.hostname.includes('github.io') ? '/Amherkut/' : './';
    }

    /**
     * Escanea la estructura de PHOTOS y organiza productos
     * Detecta productos con múltiples imágenes (subcarpetas)
     */
    async scanPhotosStructure() {
        const categories = [
            { folder: 'BREAD', type: 'bread' },
            { folder: 'FOOD', type: 'food' },
            { folder: 'SWEET', type: 'sweet' },
            { folder: 'BABY', type: 'baby' }
        ];
        
        const productsMap = new Map();

        for (const category of categories) {
            const categoryPath = `PHOTOS/${category.folder}`;
            const products = await this.scanCategory(categoryPath, category.type);
            
            products.forEach(product => {
                const key = `${category.type}_${product.id}`;
                productsMap.set(key, product);
            });
        }

        this.productsMap = productsMap;
        return productsMap;
    }

    /**
     * Escanea una categoría específica basándose en la estructura real de carpetas
     */
    async scanCategory(categoryPath, categoryType) {
        const products = [];
        
        // Mapeo de estructura conocida basado en la estructura real de PHOTOS
        const structure = this.getKnownStructure(categoryType);
        
        structure.forEach((product, index) => {
            const productId = index + 1;
            const images = this.getProductImages(categoryPath, product);
            
            if (images.length > 0) {
                products.push({
                    id: `${categoryType}-${productId}`,
                    category: categoryType,
                    name: product.name || `Producto ${productId}`,
                    description: product.description || '',
                    images: images,
                    hasMultipleAngles: images.length > 1,
                    path: categoryPath,
                    folder: product.folder || product.subfolder
                });
            }
        });

        return products;
    }

    /**
     * Obtiene la estructura conocida de cada categoría basada en la estructura real
     */
    getKnownStructure(categoryType) {
        const structures = {
            bread: [
                { folder: '1', name: 'Ruisleipä', description: 'Pan de centeno artesanal' },
                { folder: '2', name: 'Tous les pains', description: 'Variedad de panes' },
                { subfolder: 'New folder', name: 'Pain rond', description: 'Pan redondo artesanal' },
                { subfolder: 'New folder (2)', name: 'Pains en serie', description: 'Panes en serie' },
                { subfolder: 'New folder (3)', name: 'Pains fond', description: 'Panes con fondo' },
                { subfolder: 'New folder (4)', name: 'Piirakat 1', description: 'Pastel tradicional 1' },
                { subfolder: 'New folder (5)', name: 'Piirakat 3', description: 'Pastel tradicional 3' },
                { subfolder: 'New folder (6)', name: 'Crackers', description: 'Crackers artesanales' },
                { subfolder: 'New folder (7)', name: 'Croissant aux amandes', description: 'Croissant con almendras' },
                { subfolder: 'New folder (8)', name: 'Croissant', description: 'Croissant artesanal' },
                { subfolder: 'New folder (9)', name: 'Petits pains', description: 'Panecillos pequeños' }
            ],
            food: [
                { folder: '1', name: 'Ronds', description: 'Deliciosos ronds' },
                { folder: '2', name: 'Triangle', description: 'Triángulos artesanales' },
                { folder: '3', name: 'Karjalapiirakka', description: 'Pastel tradicional de Karelia' },
                { subfolder: 'New folder (2)', name: 'Carré', description: 'Cuadrados artesanales' }
            ],
            sweet: [
                { folder: '1', name: 'Dulce 1', description: 'Postre artesanal' },
                { subfolder: 'New folder', name: 'Les roses', description: 'Biscocho elegante' },
                { subfolder: 'New folder (10)', name: 'Chocolats 1', description: 'Chocolates artesanales' },
                { subfolder: 'New folder (11)', name: 'Chocolats', description: 'Chocolates premium' },
                { subfolder: 'New folder (12)', name: 'Dulce especial', description: 'Postre especial' },
                { subfolder: 'New folder (2)', name: 'Porkkanakakku', description: 'Pastel de zanahoria' },
                { subfolder: 'New folder (3)', name: 'Kakku 1', description: 'Pastel artesanal 1' },
                { subfolder: 'New folder (4)', name: 'Kakku sarja 1', description: 'Serie de pasteles' },
                { subfolder: 'New folder (6)', name: 'Kinuskikakku', description: 'Pastel de caramelo' },
                { subfolder: 'New folder (7)', name: 'Korvapuusti', description: 'Dulce tradicional finlandés' },
                { subfolder: 'New folder (8)', name: 'Leivoset 1', description: 'Galletas artesanales 1' },
                { subfolder: 'New folder (9)', name: 'Leivoset 2', description: 'Galletas artesanales 2' },
                { subfolder: '2 PASTEL Porkkana-kinuskikakku beige', name: 'Porkkana Kinuskikakku', description: 'Pastel de zanahoria con caramelo' }
            ],
            baby: [
                // Los productos de Baby se agregarán aquí cuando existan las carpetas
            ]
        };

        return structures[categoryType] || [];
    }

    /**
     * Obtiene las imágenes de un producto específico desde su carpeta
     */
    getProductImages(categoryPath, product) {
        const images = [];
        
        if (product.folder) {
            // Producto con subcarpeta simple (ej: BREAD/1/)
            const folderPath = `${categoryPath}/${product.folder}`;
            // Buscar archivos comunes en la carpeta
            const commonPatterns = [
                '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg',
                '1.png', '2.png', '3.png', '4.png', '5.png',
                '1.JPG', '2.JPG', '3.JPG', '4.JPG', '5.JPG'
            ];
            
            // También buscar archivos con nombres específicos comunes
            const specificFiles = this.getSpecificFilesForFolder(categoryPath, product.folder);
            
            if (specificFiles.length > 0) {
                specificFiles.forEach((file, index) => {
                    const imagePath = `${folderPath}/${file}`;
                    images.push({
                        path: imagePath,
                        angle: index + 1,
                        alt: `${product.name} - Vista ${index + 1}`
                    });
                });
            } else {
                // Intentar con patrones comunes
                commonPatterns.forEach((pattern, index) => {
                    const imagePath = `${folderPath}/${pattern}`;
                    images.push({
                        path: imagePath,
                        angle: index + 1,
                        alt: `${product.name} - Vista ${index + 1}`
                    });
                });
            }
        } else if (product.subfolder) {
            // Producto con subcarpeta compleja (ej: BREAD/New folder/)
            const subfolderPath = `${categoryPath}/${product.subfolder}`;
            const specificFiles = this.getSpecificFilesForFolder(categoryPath, product.subfolder);
            
            if (specificFiles.length > 0) {
                specificFiles.forEach((file, index) => {
                    const imagePath = `${subfolderPath}/${file}`;
                    images.push({
                        path: imagePath,
                        angle: index + 1,
                        alt: `${product.name} - Vista ${index + 1}`
                    });
                });
            }
        }

        // Filtrar imágenes válidas (eliminar duplicados y rutas inválidas)
        return this.filterValidImages(images);
    }

    /**
     * Obtiene archivos específicos para una carpeta basándose en la estructura real
     */
    getSpecificFilesForFolder(categoryPath, folderName) {
        // Mapeo de archivos específicos basado en la estructura real
        const fileMap = {
            'BREAD': {
                '1': ['Ruisleiä noir.jpg', 'Ruisleipä beige.jpg'],
                '2': ['Tous les pains beige.jpg', 'Tous les pains noir.jpg'],
                'New folder': ['Pain rond beige.jpg', 'Pain rond noir.jpg'],
                'New folder (2)': ['Pains en serie beige.jpg', 'Pains en serie noir.jpg'],
                'New folder (3)': ['Pains fond beige.jpg', 'Pains fond noir.jpg'],
                'New folder (4)': ['Piirakat 1 noir.jpg', 'Piirakat 1beige.jpg'],
                'New folder (5)': ['Piirakat 3 beige.jpg', 'Piirakat 3 noir.jpg'],
                'New folder (6)': ['Crakers beige.jpg', 'Crakers noir.jpg'],
                'New folder (7)': ['Croissant aux amandes beige.jpg', 'Croissant aux amandes noir.jpg'],
                'New folder (8)': ['Croissant beige.jpg', 'Croissant noir.jpg'],
                'New folder (9)': ['Petits pains 3.jpg', 'Petits pains 4.jpg']
            },
            'FOOD': {
                '1': ['Ronds beiges.jpg', 'Ronds noir.jpg'],
                '2': ['Triangle beige.jpg', 'Triangle noir.jpg'],
                '3': ['Karjalapiirakka beige.jpg', 'Karjalapiirakka noir.jpg'],
                'New folder (2)': ['Carré beige.jpg', 'Carré noir.jpg']
            },
            'SWEET': {
                '1': ['Untitled-1.jpg', 'Untitled-1blue.jpg'],
                'New folder': ['Les roses beige.jpg', 'Les roses noir.jpg'],
                'New folder (10)': ['Chocolats 1 beige.jpg', 'Chocolats 1 noir.jpg'],
                'New folder (11)': ['Chocolats beiger.jpg', 'Chocolats noir.jpg'],
                'New folder (12)': ['HCN_8344.JPG', 'HCN_8346.JPG'],
                'New folder (2)': ['Porkkanakakku beige.jpg', 'Porkkanakakku noir.jpg'],
                'New folder (3)': ['Kakku 1 black.jpg', 'Kakku 1.jpg'],
                'New folder (4)': ['Kakku sarja 1 beige.jpg', 'Kakku sarja 1.jpg'],
                'New folder (6)': ['Kinuskikakku beige.jpg', 'Kinuskikakku noir.jpg'],
                'New folder (7)': ['Korvapuusti beige.jpg', 'Korvapuusti noir.jpg', 'Lautanen beige.jpg', 'Lautanen noir.jpg'],
                'New folder (8)': ['Leivoset 1 beige.jpg', 'Leivoset 1 black.jpg'],
                'New folder (9)': ['Leivoset 2 black.jpg', 'Leivoset 3 beige.jpg'],
                '2 PASTEL Porkkana-kinuskikakku beige': ['12Porkkana-kinuskikakku beige.jpg', '1Porkkana-kinuskikakku noir.jpg']
            }
        };

        const categoryName = categoryPath.split('/')[1]; // Extraer BREAD, FOOD, SWEET
        return fileMap[categoryName]?.[folderName] || [];
    }

    /**
     * Filtra imágenes válidas (elimina duplicados y rutas inválidas)
     */
    filterValidImages(images) {
        const seen = new Set();
        return images.filter(img => {
            const key = img.path.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    /**
     * Obtiene un producto por su clave
     */
    getProduct(category, productId) {
        const key = `${category}_${productId}`;
        return this.productsMap.get(key);
    }

    /**
     * Obtiene todos los productos de una categoría
     */
    getProductsByCategory(category) {
        const products = [];
        this.productsMap.forEach((product, key) => {
            if (product.category === category) {
                products.push(product);
            }
        });
        return products.sort((a, b) => {
            // Ordenar por ID numérico si es posible
            const aNum = parseInt(a.id.split('-')[1]) || 0;
            const bNum = parseInt(b.id.split('-')[1]) || 0;
            return aNum - bNum;
        });
    }

    /**
     * Obtiene la primera imagen de un producto (para mostrar en la tarjeta)
     */
    getFirstImage(product) {
        if (!product || !product.images || product.images.length === 0) {
            return null;
        }
        return product.images[0];
    }

    /**
     * Genera rutas completas con el basePath
     */
    getFullImagePath(relativePath) {
        return `${this.basePath}${relativePath}`;
    }
}

// Instancia global
let photosScanner;

// Inicializar cuando el DOM esté listo
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', async () => {
        photosScanner = new PhotosScanner();
        await photosScanner.scanPhotosStructure();
    });
}

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhotosScanner;
}
