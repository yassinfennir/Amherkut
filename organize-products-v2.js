/**
 * ORGANIZADOR DE PRODUCTOS V2 - Versión mejorada con mejor detección
 * Organiza productos agrupando por carpeta y usando nombres descriptivos
 */

const fs = require('fs');
const path = require('path');

class ProductOrganizerV2 {
    constructor() {
        this.photosPath = path.join(__dirname, 'PHOTOS');
        this.organizedPath = path.join(__dirname, 'PHOTOS_ORGANIZED_V2');
        this.stats = {
            productsOrganized: 0,
            imagesMoved: 0,
            foldersCreated: 0
        };
        
        // Mapeo de nombres conocidos para mejorar la detección
        this.knownProducts = {
            'croissant': 'croissant',
            'crakers': 'crackers',
            'chai': 'chai-tea',
            'expresso': 'espresso',
            'macchoato': 'macchiato',
            'piirakat': 'piirakat',
            'ronds': 'ronds',
            'triangle': 'triangle',
            'karjalapiirakka': 'karjalapiirakka',
            'baklava': 'baklava',
            'chocolats': 'chocolate',
            'korvapuusti': 'korvapuusti',
            'lautanen': 'lautanen',
            'kinuskikakku': 'kinuskikakku',
            'porkkanakakku': 'porkkana-kinuskikakku',
            'les roses': 'les-roses-biscocho',
            'sweed sushi': 'sweed-sushi'
        };
    }

    /**
     * Normaliza nombres
     */
    normalizeName(name) {
        return name
            .replace(/[^a-zA-Z0-9\s\-_]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .toLowerCase()
            .trim();
    }

    /**
     * Extrae nombre del producto mejorado
     */
    extractProductName(filename, folderPath) {
        let name = filename.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');
        
        // Elimina números al inicio
        name = name.replace(/^\d+\s*[-_]?\s*/, '');
        
        // Elimina variantes de color
        name = name.replace(/\s*(noir|beige|beiger|black|white|blanc|negro)\s*/gi, '');
        
        // Elimina timestamps
        name = name.replace(/\d{14}-\w+/g, '');
        
        // Elimina códigos HCN_
        name = name.replace(/HCN_\d+/g, '');
        
        // Limpia espacios
        name = name.replace(/\s+/g, ' ').trim();
        
        // Si el nombre es muy corto o genérico, usa el nombre de la carpeta
        if (!name || name.length < 3 || name === '1' || name === '2' || name === '3') {
            const folderName = path.basename(folderPath);
            // Intenta extraer nombre de la carpeta
            if (folderName && folderName !== 'PHOTOS' && !/^\d+$/.test(folderName)) {
                name = folderName;
            } else {
                // Usa el nombre del directorio padre si es descriptivo
                const parentFolder = path.basename(path.dirname(folderPath));
                if (parentFolder && parentFolder !== 'PHOTOS' && !/^\d+$/.test(parentFolder)) {
                    name = parentFolder;
                }
            }
        }
        
        // Busca en productos conocidos
        const lowerName = name.toLowerCase();
        for (const [key, value] of Object.entries(this.knownProducts)) {
            if (lowerName.includes(key)) {
                return value;
            }
        }
        
        return this.normalizeName(name) || 'producto-desconocido';
    }

    /**
     * Escanea estructura y agrupa por carpeta
     */
    scanAndGroup() {
        const products = new Map();
        
        const categories = ['Bread', 'Drinks', 'Food', 'Sweet'];
        
        for (const category of categories) {
            const categoryPath = path.join(this.photosPath, category);
            if (!fs.existsSync(categoryPath)) continue;
            
            this.scanCategory(categoryPath, category.toLowerCase(), products);
        }
        
        return Array.from(products.values());
    }

    /**
     * Escanea una categoría
     */
    scanCategory(categoryPath, category, products) {
        const entries = fs.readdirSync(categoryPath, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = path.join(categoryPath, entry.name);
            
            if (entry.isDirectory()) {
                // Escanea subdirectorios recursivamente
                this.scanSubfolder(fullPath, category, entry.name, products);
            } else if (entry.isFile()) {
                // Archivo en la raíz de la categoría
                const ext = path.extname(entry.name).toLowerCase();
                if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                    const productName = this.extractProductName(entry.name, categoryPath);
                    const key = `${category}_${productName}`;
                    
                    if (!products.has(key)) {
                        products.set(key, {
                            category,
                            productName,
                            images: [],
                            folderPath: categoryPath
                        });
                    }
                    
                    products.get(key).images.push({
                        name: entry.name,
                        path: fullPath,
                        relativePath: path.join(category, entry.name)
                    });
                }
            }
        }
    }

    /**
     * Escanea subcarpetas recursivamente
     */
    scanSubfolder(folderPath, category, folderName, products) {
        const entries = fs.readdirSync(folderPath, { withFileTypes: true });
        const images = [];
        
        // Primero recopila todas las imágenes
        for (const entry of entries) {
            const fullPath = path.join(folderPath, entry.name);
            
            if (entry.isDirectory()) {
                // Subcarpeta anidada - escanea recursivamente
                this.scanSubfolder(fullPath, category, entry.name, products);
            } else if (entry.isFile()) {
                const ext = path.extname(entry.name).toLowerCase();
                if (['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'].includes(ext)) {
                    images.push({
                        name: entry.name,
                        path: fullPath,
                        relativePath: path.join(category, folderName, entry.name)
                    });
                }
            }
        }
        
        // Si hay imágenes, crea un producto
        if (images.length > 0) {
            // Usa el nombre de la carpeta o extrae de la primera imagen
            let productName;
            if (folderName && !/^\d+$/.test(folderName) && folderName.toLowerCase() !== 'new folder') {
                productName = this.normalizeName(folderName);
            } else {
                productName = this.extractProductName(images[0].name, folderPath);
            }
            
            // Si el nombre es genérico, intenta mejorarlo con el nombre del archivo
            if (productName === 'producto-desconocido' || productName.length < 3) {
                const firstImageName = images[0].name.toLowerCase();
                for (const [key, value] of Object.entries(this.knownProducts)) {
                    if (firstImageName.includes(key)) {
                        productName = value;
                        break;
                    }
                }
            }
            
            const key = `${category}_${productName}_${folderName}`;
            
            // Si ya existe un producto con el mismo nombre base, agrega sufijo
            let finalKey = key;
            let counter = 1;
            while (products.has(finalKey)) {
                finalKey = `${category}_${productName}_${folderName}_${counter}`;
                counter++;
            }
            
            products.set(finalKey, {
                category,
                productName,
                folderName,
                images: images.sort((a, b) => {
                    // Ordena por nombre de archivo
                    return a.name.localeCompare(b.name);
                }),
                folderPath
            });
        }
    }

    /**
     * Crea estructura organizada
     */
    createOrganizedStructure(productGroups) {
        if (fs.existsSync(this.organizedPath)) {
            fs.rmSync(this.organizedPath, { recursive: true, force: true });
        }
        fs.mkdirSync(this.organizedPath, { recursive: true });

        for (const group of productGroups) {
            const categoryPath = path.join(this.organizedPath, group.category);
            if (!fs.existsSync(categoryPath)) {
                fs.mkdirSync(categoryPath, { recursive: true });
            }

            // Genera nombre de carpeta del producto
            let productFolderName = group.productName;
            
            // Si el nombre es genérico, usa el nombre de la carpeta original
            if (productFolderName === 'producto-desconocido' || productFolderName.length < 3) {
                if (group.folderName && group.folderName !== 'New folder') {
                    productFolderName = this.normalizeName(group.folderName);
                } else {
                    productFolderName = `product-${this.stats.productsOrganized + 1}`;
                }
            }
            
            // Si hay múltiples productos con el mismo nombre, agrega sufijo
            let finalFolderName = productFolderName;
            let counter = 1;
            while (fs.existsSync(path.join(categoryPath, finalFolderName))) {
                finalFolderName = `${productFolderName}-${counter}`;
                counter++;
            }
            
            const productPath = path.join(categoryPath, finalFolderName);
            fs.mkdirSync(productPath, { recursive: true });
            this.stats.foldersCreated++;

            // Copia imágenes numeradas
            group.images.forEach((image, index) => {
                const ext = path.extname(image.name).toLowerCase();
                const newFileName = `angle-${String(index + 1).padStart(2, '0')}${ext}`;
                const newPath = path.join(productPath, newFileName);
                
                try {
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
     * Genera reporte
     */
    generateReport(productGroups) {
        const report = {
            fecha: new Date().toISOString(),
            estadisticas: this.stats,
            estructura: this.getStructureTree(),
            productos: productGroups.map(group => ({
                categoria: group.category,
                nombre: group.productName,
                carpeta: group.folderName || 'raiz',
                imagenes: group.images.length,
                archivos: group.images.map(img => img.name)
            }))
        };

        const reportPath = path.join(__dirname, 'organizacion-reporte-v2.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
        
        console.log('\n📊 REPORTE DE ORGANIZACIÓN V2');
        console.log('='.repeat(60));
        console.log(`✅ Productos organizados: ${this.stats.productsOrganized}`);
        console.log(`📸 Imágenes procesadas: ${this.stats.imagesMoved}`);
        console.log(`📁 Carpetas creadas: ${this.stats.foldersCreated}`);
        console.log(`📄 Reporte: ${reportPath}`);
        console.log(`📂 Estructura: ${this.organizedPath}`);
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
                                .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
                                .sort();
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
     * Proceso principal
     */
    async organize() {
        console.log('🚀 ORGANIZADOR DE PRODUCTOS V2');
        console.log('='.repeat(60));
        console.log('📂 Escaneando estructura...\n');
        
        if (!fs.existsSync(this.photosPath)) {
            console.error('❌ No se encontró la carpeta PHOTOS/');
            return;
        }

        // Escanear y agrupar
        const productGroups = this.scanAndGroup();
        console.log(`✅ Encontrados ${productGroups.length} productos\n`);

        // Crear estructura
        console.log('📁 Creando estructura organizada...');
        this.createOrganizedStructure(productGroups);
        console.log('   ✅ Estructura creada\n');

        // Reporte
        this.generateReport(productGroups);

        console.log('\n✨ ¡Organización completada!');
        console.log('\n💡 La nueva estructura está en: PHOTOS_ORGANIZED_V2/');
        console.log('   Revisa y si está bien, puedes reemplazar PHOTOS/');
    }
}

// Ejecutar
if (require.main === module) {
    const organizer = new ProductOrganizerV2();
    organizer.organize().catch(console.error);
}

module.exports = ProductOrganizerV2;

