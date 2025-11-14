/**
 * GALERÍA CATEGORY PAGE
 * Maneja la página de categoría con grid de productos
 */

let currentCategory = null;
let currentProducts = [];
let currentPage = 1;
const productsPerPage = 14;
let currentSort = 'date';

document.addEventListener('DOMContentLoaded', async () => {
    // Cargar datos
    await galeriaData.loadData();
    
    // Obtener categoría de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');
    
    if (!categoryId) {
        window.location.href = 'index.html';
        return;
    }
    
    // Cargar categoría
    currentCategory = galeriaData.getCategory(categoryId);
    
    if (!currentCategory) {
        document.getElementById('products-grid').innerHTML = 
            '<div class="empty-state"><h3>Categoría no encontrada</h3></div>';
        return;
    }
    
    // Actualizar título y breadcrumb
    document.getElementById('page-title').textContent = `${currentCategory.nombre} - AM-Herkut`;
    document.getElementById('breadcrumb-category').textContent = currentCategory.nombre;
    
    // Cargar productos
    loadProducts();
    
    // Configurar eventos
    setupEvents();
    
    // Configurar keywords dropdown
    setupKeywordsDropdown();
    
    // Configurar búsqueda
    setupSearch();
    
    // Configurar menú móvil
    setupMobileMenu();
});

/**
 * Carga los productos de la categoría
 */
function loadProducts() {
    currentProducts = galeriaData.getProductsByCategory(currentCategory.id);
    
    // Aplicar ordenamiento
    sortProducts();
    
    // Renderizar productos
    renderProducts();
    
    // Renderizar paginación
    renderPagination();
}

/**
 * Ordena los productos según el criterio actual
 */
function sortProducts() {
    switch (currentSort) {
        case 'name':
            currentProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'popularity':
            currentProducts.sort((a, b) => {
                const visitsA = galeriaData.getVisits(a.categoria.id, a.id);
                const visitsB = galeriaData.getVisits(b.categoria.id, b.id);
                return visitsB - visitsA;
            });
            break;
        case 'rating':
            currentProducts.sort((a, b) => {
                const ratingA = galeriaData.getRating(a.categoria.id, a.id);
                const ratingB = galeriaData.getRating(b.categoria.id, b.id);
                return ratingB - ratingA;
            });
            break;
        case 'random':
            currentProducts = shuffleArray([...currentProducts]);
            break;
        case 'date':
        default:
            currentProducts.sort((a, b) => {
                const dateA = new Date(a.fecha_creacion || 0);
                const dateB = new Date(b.fecha_creacion || 0);
                return dateB - dateA;
            });
            break;
    }
}

/**
 * Mezcla un array aleatoriamente
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Renderiza los productos en el grid
 */
function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const pageProducts = currentProducts.slice(start, end);
    
    if (pageProducts.length === 0) {
        grid.innerHTML = '<div class="empty-state"><h3>No hay productos en esta categoría</h3></div>';
        return;
    }
    
    grid.innerHTML = pageProducts.map(product => `
        <div class="product-card" onclick="window.location.href='product.html?category=${product.categoria.id}&product=${product.id}'">
            <img src="../${product.imagen}" alt="${product.nombre}" onerror="this.src='../assets/images/placeholder.jpg'">
        </div>
    `).join('');
}

/**
 * Renderiza la paginación
 */
function renderPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(currentProducts.length / productsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let html = '';
    
    // Botón First
    html += `<button onclick="goToPage(1)" ${currentPage === 1 ? 'disabled' : ''}>First</button>`;
    
    // Botón Previous
    html += `<button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>`;
    
    // Números de página
    const maxPages = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);
    
    if (endPage - startPage < maxPages - 1) {
        startPage = Math.max(1, endPage - maxPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        html += `<button class="${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }
    
    // Botón Next
    html += `<button onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>`;
    
    // Botón Last
    html += `<button onclick="goToPage(${totalPages})" ${currentPage === totalPages ? 'disabled' : ''}>Last</button>`;
    
    pagination.innerHTML = html;
}

/**
 * Va a una página específica
 */
function goToPage(page) {
    const totalPages = Math.ceil(currentProducts.length / productsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderProducts();
    renderPagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Configura los eventos de los botones
 */
function setupEvents() {
    // Botón de ordenar
    const btnSort = document.getElementById('btn-sort');
    if (btnSort) {
        btnSort.addEventListener('click', () => {
            const sortOptions = ['date', 'name', 'popularity', 'rating'];
            const currentIndex = sortOptions.indexOf(currentSort);
            const nextIndex = (currentIndex + 1) % sortOptions.length;
            currentSort = sortOptions[nextIndex];
            currentPage = 1;
            loadProducts();
            
            const sortNames = {
                'date': 'Fecha',
                'name': 'Nombre',
                'popularity': 'Popularidad',
                'rating': 'Rating'
            };
            btnSort.textContent = `Ordenar: ${sortNames[currentSort]}`;
        });
    }
    
    // Botón aleatorio
    const btnRandom = document.getElementById('btn-random');
    if (btnRandom) {
        btnRandom.addEventListener('click', () => {
            currentSort = 'random';
            currentPage = 1;
            loadProducts();
        });
    }
    
    // Botón slideshow
    const btnSlideshow = document.getElementById('btn-slideshow');
    if (btnSlideshow) {
        btnSlideshow.addEventListener('click', () => {
            if (currentProducts.length === 0) return;
            const randomProduct = currentProducts[Math.floor(Math.random() * currentProducts.length)];
            window.location.href = `product.html?category=${randomProduct.categoria.id}&product=${randomProduct.id}&slideshow=true`;
        });
    }
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
    
    dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });
    
    document.addEventListener('click', () => {
        dropdown.classList.remove('active');
    });
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

