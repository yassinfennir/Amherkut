/**
 * GALERÍA MAIN PAGE
 * Maneja la página principal con grid de categorías
 */

document.addEventListener('DOMContentLoaded', async () => {
    // Cargar datos
    await galeriaData.loadData();
    
    // Renderizar categorías
    renderCategories();
    
    // Configurar búsqueda
    setupSearch();
    
    // Configurar keywords dropdown
    setupKeywordsDropdown();
    
    // Configurar menú móvil
    setupMobileMenu();
});

/**
 * Renderiza el grid de categorías
 */
function renderCategories() {
    const grid = document.getElementById('categories-grid');
    if (!grid) return;
    
    const categories = galeriaData.getCategories();
    
    if (categories.length === 0) {
        grid.innerHTML = '<div class="empty-state"><h3>No hay categorías disponibles</h3></div>';
        return;
    }
    
    grid.innerHTML = categories.map(category => `
        <div class="category-card" onclick="window.location.href='category.html?category=${category.id}'">
            <img src="../${category.imagen_portada}" alt="${category.nombre}" class="category-card-image" onerror="this.src='../assets/images/placeholder.jpg'">
            <div class="category-card-info">
                <h3 class="category-card-title">${category.nombre}</h3>
                <p class="category-card-desc">${category.descripcion}</p>
                <span class="category-card-count">${category.productos_count} ${category.productos_count === 1 ? 'producto' : 'productos'}</span>
            </div>
        </div>
    `).join('');
}

/**
 * Configura el sistema de búsqueda
 */
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (!searchInput || !searchBtn) return;
    
    const performSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    };
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

/**
 * Configura el dropdown de keywords
 */
function setupKeywordsDropdown() {
    const dropdown = document.getElementById('keywords-dropdown');
    const menu = document.getElementById('keywords-menu');
    
    if (!dropdown || !menu) return;
    
    const keywords = galeriaData.getAllKeywords();
    
    if (keywords.length === 0) {
        menu.innerHTML = '<a href="#">No hay keywords disponibles</a>';
        return;
    }
    
    menu.innerHTML = keywords.map(keyword => `
        <a href="tag.html?keyword=${encodeURIComponent(keyword)}">${keyword}</a>
    `).join('');
    
    // Toggle dropdown
    dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });
    
    // Cerrar al hacer click fuera
    document.addEventListener('click', () => {
        dropdown.classList.remove('active');
    });
}

/**
 * Configura el menú móvil
 */
function setupMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

