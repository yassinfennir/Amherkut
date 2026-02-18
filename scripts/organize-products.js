/**
 * ORGANIZADOR DE PRODUCTOS - Organiza carpetas de productos con múltiples ángulos
 * Escanea PHOTOS/ y organiza todo de forma moderna y estructurada
 */

const fs = require('fs');
const path = require('path');

class ProductOrganizer {
    constructor() {
        this.photosPath = path.join(__dirname, 'PHOTOS');
        this.backupPath = path.join(__dirname, 'PHOTOS_BACKUP');
        this.organizedPath = path.join(__dirname, 'PHOTOS_ORGANIZED');
        this.stats = {
            productsOrganized: 0,
            imagesMoved: 0,
            duplicatesFound: 0,
            foldersRenamed: 0
        };
    }

    /**
     * Normaliza nombres de archivos y carpetas
     */
    normalizeName(name) {
        return name
            .replace(/[^a-zA-Z0-9\s\-_]/g, '') // Elimina caracteres especiales
            .replace(/\s+/g, '-') // Reemplaza espacios con guiones
            .replace(/-+/g, '-') // Elimina guiones múltiples
            .toLowerCase()
            .trim();
    }

    /**
     * Extrae el nombre del producto del nombre del archivo
     */
    extractProductName(filename) {
        // Elimina extensiones
        let name = filename.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');
        
        // Elimina números al inicio (1, 2, 3, etc.)
        name = name.replace(/^\d+\s*[-_]?\s*/, '');
        
        // Elimina palabras comunes de ángulos
        name = name.replace(/\s*(noir|beige|beiger|black|white|angle|ángulo)\s*/gi, '');
        
        // Elimina timestamps (20250627213607-...)
        name = name.replace(/\d{14}-\w+/g, '');
        
        // Limpia espacios extra
        name = name.replace(/\s+/g, ' ').trim();
        
        return this.normalizeName(name) || 'producto-desconocido';
    }

    /**
     * Escanea una carpeta recursivamente
     */
    scanDirectory(dirPath, relativePath = '') {
        const items = [];
        
        try {
            const entries = fs.readdirSync(dirPath, { withFileTypes: true });
            
            for (const entry of entries) {
                const fullPath = path.join(dirPath, entry.name);
                const relPath = path.join(relativePath, entry.name);
                
                if (entry.isDirectory()) {
                    // Escanea subdirectorios
                    const subItems = this.scanDirectory(fullPath, relPath);
                    items.push(...subItems);
                } else if (entry.isFile()) {
                    // Es un archivo de imagen
                    const ext = path.extname(entry.name).toLowerCase();
                    if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
                        items.push({
                            type: 'file',
                            name: entry.name,
                            path: fullPath,
                            relativePath: relPath,
                            category: this.detectCategory(relativePath),
                            productName: this.extractProductName(entry.name),
                            directory: path.dirname(relPath)
                        });
                    }
                }
            }
        } catch (error) {
            console.error(`Error escaneando ${dirPath}:`, error.message);
        }
        
        return items;
    }

    /**
     * Detecta la categoría basada en la ruta
     */
    detectCategory(relativePath) {
        const pathLower = relativePath.toLowerCase();
        if (pathLower.includes('bread') || pathLower.includes('pan')) return 'bread';
        if (pathLower.includes('drink') || pathLower.includes('bebida')) return 'drinks';
        if (pathLower.includes('food') || pathLower.includes('comida')) return 'food';
        if (pathLower.includes('sweet') || pathLower.includes('dulce')) return 'sweet';
        return 'other';
    }

    /**
     * Agrupa imágenes por producto
     */
    groupByProduct(images) {
        const groups = new Map();
        
        for (const image of images) {
            const key = `${image.category}_${image.productName}`;
            
            if (!groups.has(key)) {
                groups.set(key, {
                    category: image.category,
                    productName: image.productName,
                    images: [],
                    originalFolders: new Set()
                });
            }
            
            const group = groups.get(key);
            group.images.push(image);
            group.originalFolders.add(image.directory);
        }
        
        return Array.from(groups.values());
    }

    /**
     * Crea estructura organizada
     */
    createOrganizedStructure(productGroups) {
        // Crear carpeta organizada
        if (!fs.existsSync(this.organizedPath)) {
            fs.mkdirSync(this.organizedPath, { recursive: true });
        }

        for (const group of productGroups) {
            const categoryPath = path.join(this.organizedPath, group.category);
            if (!fs.existsSync(categoryPath)) {
                fs.mkdirSync(categoryPath, { recursive: true });
            }

            // Crear carpeta del producto
            const productFolderName = this.generateProductFolderName(group);
            const productPath = path.join(categoryPath, productFolderName);
            
            if (!fs.existsSync(productPath)) {
                fs.mkdirSync(productPath, { recursive: true });
            }

            // Mover imágenes numeradas
            group.images.forEach((image, index) => {
                const ext = path.extname(image.name).toLowerCase();
                const newFileName = `angle-${String(index + 1).padStart(2, '0')}${ext}`;
                const newPath = path.join(productPath, newFileName);
                
                try {
                    // Copiar archivo (no mover para seguridad)
                    fs.copyFileSync(image.path, newPath);
                    this.stats.imagesMoved++;
                } catch (error) {
                    console.error(`Error copiando ${image.path}:`, error.message);
                }
            });

            this.stats.productsOrganized++;
        }
    }

    /**
     * Genera nombre de carpeta para el producto
     */
    generateProductFolderName(group) {
        // Si hay múltiples imágenes, es un producto con ángulos
        const hasAngles = group.images.length > 1;
        const baseName = group.productName;
        
        // Si el nombre es muy genérico, intenta mejorarlo
        if (baseName === 'producto-desconocido' || baseName.length < 3) {
            // Intenta usar el nombre de la carpeta original
            const originalFolder = Array.from(group.originalFolders)[0];
            if (originalFolder) {
                const folderName = path.basename(originalFolder);
                return this.normalizeName(folderName) || `product-${this.stats.productsOrganized + 1}`;
            }
            return `product-${this.stats.productsOrganized + 1}`;
        }
        
        return baseName;
    }

    /**
     * Genera reporte de organización
     */
    generateReport(productGroups) {
        const report = {
            fecha: new Date().toISOString(),
            estadisticas: this.stats,
            productos: productGroups.map(group => ({
                categoria: group.category,
                nombre: group.productName,
                imagenes: group.images.length,
                carpetasOriginales: Array.from(group.originalFolders)
            })),
            estructura: this.getStructureTree()
        };

        const reportPath = path.join(__dirname, 'organizacion-reporte.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
        
        console.log('\n📊 REPORTE DE ORGANIZACIÓN');
        console.log('='.repeat(50));
        console.log(`✅ Productos organizados: ${this.stats.productsOrganized}`);
        console.log(`📸 Imágenes procesadas: ${this.stats.imagesMoved}`);
        console.log(`📁 Reporte guardado en: ${reportPath}`);
        console.log(`📂 Estructura organizada en: ${this.organizedPath}`);
    }

    /**
     * Obtiene árbol de estructura
     */
    getStructureTree() {
        const tree = {};
        
        try {
            const categories = fs.readdirSync(this.organizedPath, { withFileTypes: true });
            
            for (const category of categories) {
                if (category.isDirectory()) {
                    const categoryPath = path.join(this.organizedPath, category.name);
                    const products = fs.readdirSync(categoryPath, { withFileTypes: true });
                    
                    tree[category.name] = products
                        .filter(p => p.isDirectory())
                        .map(p => {
                            const productPath = path.join(categoryPath, p.name);
                            const images = fs.readdirSync(productPath)
                                .filter(f => /\.(jpg|jpeg|png)$/i.test(f));
                            return {
                                nombre: p.name,
                                imagenes: images.length,
                                archivos: images
                            };
                        });
                }
            }
        } catch (error) {
            console.error('Error generando árbol:', error.message);
        }
        
        return tree;
    }

    /**
     * Proceso principal de organización
     */
    async organize() {
        console.log('🚀 Iniciando organización de productos...\n');
        
        // Verificar que existe PHOTOS
        if (!fs.existsSync(this.photosPath)) {
            console.error('❌ No se encontró la carpeta PHOTOS/');
            return;
        }

        // Escanear todas las imágenes
        console.log('📂 Escaneando estructura de carpetas...');
        const allImages = this.scanDirectory(this.photosPath);
        console.log(`   Encontradas ${allImages.length} imágenes\n`);

        // Agrupar por producto
        console.log('🔍 Agrupando productos...');
        const productGroups = this.groupByProduct(allImages);
        console.log(`   Encontrados ${productGroups.length} productos únicos\n`);

        // Crear estructura organizada
        console.log('📁 Creando estructura organizada...');
        this.createOrganizedStructure(productGroups);
        console.log('   ✅ Estructura creada\n');

        // Generar reporte
        this.generateReport(productGroups);

        console.log('\n✨ ¡Organización completada!');
        console.log('\n💡 Próximos pasos:');
        console.log('   1. Revisa la carpeta PHOTOS_ORGANIZED/');
        console.log('   2. Si todo está bien, reemplaza PHOTOS/ con PHOTOS_ORGANIZED/');
        console.log('   3. O renombra PHOTOS_ORGANIZED/ a PHOTOS/');
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    const organizer = new ProductOrganizer();
    organizer.organize().catch(console.error);
}

module.exports = ProductOrganizer;

