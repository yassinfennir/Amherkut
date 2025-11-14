/**
 * GALERÍA PRODUCT PAGE
 * Maneja la página de producto individual
 */

let currentProduct = null;
let currentCategory = null;
let allCategoryProducts = [];
let currentProductIndex = -1;

document.addEventListener('DOMContentLoaded', async () => {
    // Cargar datos
    await galeriaData.loadData();
    
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');
    const productId = urlParams.get('product');
    const slideshow = urlParams.get('slideshow') === 'true';
    
    if (!categoryId || !productId) {
        window.location.href = 'index.html';
        return;
    }
    
    // Cargar categoría y producto
    currentCategory = galeriaData.getCategory(categoryId);
    currentProduct = galeriaData.getProduct(categoryId, productId);
    
    if (!currentCategory || !currentProduct) {
        window.location.href = 'index.html';
        return;
    }
    
    // Obtener todos los productos de la categoría
    allCategoryProducts = galeriaData.getProductsByCategory(categoryId);
    currentProductIndex = allCategoryProducts.findIndex(p => p.id === productId);
    
    // Incrementar visitas
    galeriaData.incrementVisit(categoryId, productId);
    
    // Renderizar producto
    renderProduct();
    
    // Configurar eventos
    setupEvents();
    
    // Configurar keywords dropdown
    setupKeywordsDropdown();
    
    // Configurar búsqueda
    setupSearch();
    
    // Configurar menú móvil
    setupMobileMenu();
    
    // Si es slideshow, iniciar automáticamente
    if (slideshow) {
        startSlideshow();
    }
});

/**
 * Renderiza el producto
 */
function renderProduct() {
    // Actualizar título
    document.getElementById('page-title').textContent = `${currentProduct.nombre} - AM-Herkut`;
    
    // Breadcrumb
    document.getElementById('breadcrumb-category-link').textContent = currentCategory.nombre;
    document.getElementById('breadcrumb-category-link').href = `category.html?category=${currentCategory.id}`;
    document.getElementById('breadcrumb-product').textContent = currentProduct.nombre;
    
    // Contador
    document.getElementById('product-counter').textContent = 
        `${currentProductIndex + 1} / ${allCategoryProducts.length}`;
    
    // Imagen
    const img = document.getElementById('product-main-image');
    img.src = `../${currentProduct.imagen}`;
    img.alt = currentProduct.nombre;
    img.onerror = function() {
        this.src = '../assets/images/placeholder.jpg';
    };
    
    // Título
    document.getElementById('product-title').textContent = currentProduct.nombre;
    
    // Descripción
    const desc = document.getElementById('product-description');
    let descriptionText = '';
    if (currentProduct.descripcion_fi) {
        descriptionText += `<p><strong>FI:</strong> ${currentProduct.descripcion_fi}</p>`;
    }
    if (currentProduct.descripcion_en) {
        descriptionText += `<p><strong>EN:</strong> ${currentProduct.descripcion_en}</p>`;
    }
    if (currentProduct.ingredientes) {
        descriptionText += `<p><strong>Ingredientes:</strong> ${currentProduct.ingredientes}</p>`;
    }
    desc.innerHTML = descriptionText || '<p>Sin descripción disponible</p>';
    
    // Keywords
    const keywordsContainer = document.getElementById('product-keywords');
    if (currentProduct.keywords && currentProduct.keywords.length > 0) {
        keywordsContainer.innerHTML = currentProduct.keywords.map(keyword => `
            <a href="tag.html?keyword=${encodeURIComponent(keyword)}" class="keyword-tag">${keyword}</a>
        `).join('');
    } else {
        keywordsContainer.innerHTML = '<span class="keyword-tag">Sin keywords</span>';
    }
    
    // Meta información
    document.getElementById('meta-album').textContent = currentCategory.nombre;
    document.getElementById('meta-visits').textContent = galeriaData.getVisits(currentCategory.id, currentProduct.id);
    
    const rating = galeriaData.getRating(currentCategory.id, currentProduct.id);
    if (rating > 0) {
        document.getElementById('meta-rating').textContent = rating.toFixed(1);
    } else {
        document.getElementById('meta-rating').textContent = '-';
    }
    
    if (currentProduct.fecha_creacion) {
        const date = new Date(currentProduct.fecha_creacion);
        document.getElementById('meta-date').textContent = date.toLocaleDateString('es-ES');
    } else {
        document.getElementById('meta-date').textContent = '-';
    }
    
    // Likes
    updateLikes();
    
    // Rating stars
    renderRatingStars();
    
    // Comentarios
    loadComments();
}

/**
 * Actualiza el botón de likes
 */
function updateLikes() {
    const likeBtn = document.getElementById('like-btn');
    const likeCount = document.getElementById('like-count');
    const likeIcon = document.getElementById('like-icon');
    
    const isLiked = galeriaData.isLiked(currentCategory.id, currentProduct.id);
    const likes = galeriaData.getLikes(currentCategory.id, currentProduct.id);
    
    likeBtn.classList.toggle('liked', isLiked);
    likeCount.textContent = likes;
    likeIcon.textContent = isLiked ? '👍' : '👍';
}

/**
 * Renderiza las estrellas de rating
 */
function renderRatingStars() {
    const container = document.getElementById('rating-stars');
    const currentRating = galeriaData.getRating(currentCategory.id, currentProduct.id);
    
    container.innerHTML = '';
    
    for (let i = 1; i <= 6; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.textContent = '★';
        star.dataset.rating = i;
        
        if (i <= Math.floor(currentRating)) {
            star.classList.add('active');
        }
        
        star.addEventListener('click', () => {
            galeriaData.setRating(currentCategory.id, currentProduct.id, i);
            renderRatingStars();
            renderProduct(); // Actualizar meta información
        });
        
        star.addEventListener('mouseenter', () => {
            highlightStars(i);
        });
        
        container.appendChild(star);
    }
    
    container.addEventListener('mouseleave', () => {
        renderRatingStars(); // Restaurar estado original
    });
}

/**
 * Resalta las estrellas hasta el índice dado
 */
function highlightStars(index) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, i) => {
        if (i < index) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

/**
 * Configura los eventos
 */
function setupEvents() {
    // Botón de like
    const likeBtn = document.getElementById('like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', () => {
            galeriaData.toggleLike(currentCategory.id, currentProduct.id);
            updateLikes();
        });
    }
    
    // Botón volver a álbum
    const backBtn = document.getElementById('back-to-album');
    if (backBtn) {
        backBtn.href = `category.html?category=${currentCategory.id}`;
    }
    
    // Botón anterior
    const prevBtn = document.getElementById('prev-product');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentProductIndex > 0) {
                const prevProduct = allCategoryProducts[currentProductIndex - 1];
                window.location.href = `product.html?category=${currentCategory.id}&product=${prevProduct.id}`;
            }
        });
    }
    
    // Botón siguiente
    const nextBtn = document.getElementById('next-product');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentProductIndex < allCategoryProducts.length - 1) {
                const nextProduct = allCategoryProducts[currentProductIndex + 1];
                window.location.href = `product.html?category=${currentCategory.id}&product=${nextProduct.id}`;
            }
        });
    }
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentProductIndex > 0) {
            const prevProduct = allCategoryProducts[currentProductIndex - 1];
            window.location.href = `product.html?category=${currentCategory.id}&product=${prevProduct.id}`;
        } else if (e.key === 'ArrowRight' && currentProductIndex < allCategoryProducts.length - 1) {
            const nextProduct = allCategoryProducts[currentProductIndex + 1];
            window.location.href = `product.html?category=${currentCategory.id}&product=${nextProduct.id}`;
        }
    });
    
    // Formulario de comentarios
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            submitComment();
        });
    }
}

/**
 * Envía un comentario
 */
function submitComment() {
    const author = document.getElementById('comment-author').value;
    const email = document.getElementById('comment-email').value;
    const website = document.getElementById('comment-website').value;
    const text = document.getElementById('comment-text').value;
    
    if (!author || !email || !text) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }
    
    const comment = {
        id: Date.now(),
        author: author,
        email: email,
        website: website,
        text: text,
        date: new Date().toISOString(),
        categoryId: currentCategory.id,
        productId: currentProduct.id
    };
    
    saveComment(comment);
    loadComments();
    
    // Limpiar formulario
    document.getElementById('comment-form').reset();
}

/**
 * Guarda un comentario
 */
function saveComment(comment) {
    try {
        const key = `comments_${currentCategory.id}_${currentProduct.id}`;
        const comments = JSON.parse(localStorage.getItem(key) || '[]');
        comments.push(comment);
        localStorage.setItem(key, JSON.stringify(comments));
    } catch (e) {
        console.error('Error guardando comentario:', e);
    }
}

/**
 * Carga los comentarios
 */
function loadComments() {
    try {
        const key = `comments_${currentCategory.id}_${currentProduct.id}`;
        const comments = JSON.parse(localStorage.getItem(key) || '[]');
        
        const commentsList = document.getElementById('comments-list');
        const commentsCount = document.getElementById('comments-count');
        
        commentsCount.textContent = comments.length;
        
        if (comments.length === 0) {
            commentsList.innerHTML = '<p style="color: var(--text-secondary);">No hay comentarios aún. Sé el primero en comentar!</p>';
            return;
        }
        
        commentsList.innerHTML = comments.map(comment => {
            const date = new Date(comment.date);
            return `
                <div class="comment-item">
                    <div class="comment-author">${escapeHtml(comment.author)}</div>
                    <div class="comment-date">${date.toLocaleDateString('es-ES')} ${date.toLocaleTimeString('es-ES')}</div>
                    <div class="comment-text">${escapeHtml(comment.text)}</div>
                </div>
            `;
        }).join('');
    } catch (e) {
        console.error('Error cargando comentarios:', e);
    }
}

/**
 * Escapa HTML para prevenir XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Inicia el slideshow automático
 */
function startSlideshow() {
    let index = currentProductIndex;
    const interval = setInterval(() => {
        index = (index + 1) % allCategoryProducts.length;
        const product = allCategoryProducts[index];
        window.location.href = `product.html?category=${currentCategory.id}&product=${product.id}&slideshow=true`;
        clearInterval(interval);
    }, 5000); // Cambiar cada 5 segundos
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

