/**
 * PRODUCT SECTIONS CONFIGURATION
 * Sistema flexible de organización de productos por secciones personalizadas
 * 
 * INSTRUCCIONES:
 * 1. Define tus secciones en PRODUCT_SECTIONS
 * 2. Cada sección tiene: id, name, description, products (array de IDs de productos)
 * 3. Los productos se definen en CUSTOM_PRODUCTS_DATA
 * 4. Puedes crear tantas secciones como quieras
 * 
 * VERSIÓN: 19 - Todos los productos eliminados - Empezar de cero - Listo para organizar productos nuevos
 */

// ========================================
// CONFIGURACIÓN DE SECCIONES PERSONALIZADAS
// ========================================

const PRODUCT_SECTIONS = [
    {
        id: 'section-food',
        name: 'Comida',
        nameKey: 'section.food.name',
        description: 'Deliciosos platos y especialidades finlandesas',
        descriptionKey: 'section.food.description',
        order: 1,
        icon: '🍽️'
    },
    {
        id: 'section-baby',
        name: 'Baby',
        nameKey: 'section.baby.name',
        description: 'Productos especiales para los más pequeños',
        descriptionKey: 'section.baby.description',
        order: 2,
        icon: '👶'
    },
    {
        id: 'section-sweet',
        name: 'Dulces',
        nameKey: 'section.sweet.name',
        description: 'Postres artesanales y dulces tradicionales',
        descriptionKey: 'section.sweet.description',
        order: 3,
        icon: '🍰'
    },
    {
        id: 'section-bread',
        name: 'Pan Artesanal',
        nameKey: 'section.bread.name',
        description: 'Nuestros panes artesanales frescos, horneados diariamente',
        descriptionKey: 'section.bread.description',
        order: 4,
        icon: '🍞'
    }
];

// ========================================
// PRODUCTOS PERSONALIZADOS
// ========================================

// TODOS LOS PRODUCTOS HAN SIDO ELIMINADOS - EMPEZAR DE CERO
const CUSTOM_PRODUCTS_DATA = [];

// ========================================
// FUNCIONES DE UTILIDAD
// ========================================

/**
 * Obtiene todos los productos de una sección específica
 */
function getProductsBySection(sectionId) {
    return CUSTOM_PRODUCTS_DATA.filter(product => product.section === sectionId);
}

/**
 * Obtiene todas las secciones ordenadas
 */
function getOrderedSections() {
    return PRODUCT_SECTIONS.sort((a, b) => (a.order || 999) - (b.order || 999));
}

/**
 * Obtiene un producto por su ID
 */
function getProductById(productId) {
    return CUSTOM_PRODUCTS_DATA.find(p => p.id === productId);
}

/**
 * Obtiene una sección por su ID
 */
function getSectionById(sectionId) {
    return PRODUCT_SECTIONS.find(s => s.id === sectionId);
}

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PRODUCT_SECTIONS,
        CUSTOM_PRODUCTS_DATA,
        getProductsBySection,
        getOrderedSections,
        getProductById,
        getSectionById
    };
}

