// Ejemplo de uso del sistema de búsqueda de keywords con traducciones
// Este archivo muestra cómo integrar el sistema de búsqueda en tus páginas

document.addEventListener('DOMContentLoaded', async () => {
    // Inicializar el sistema de búsqueda
    const keywordsSearch = new KeywordsSearch();
    
    // Esperar a que se carguen las traducciones
    await keywordsSearch.loadTranslations();
    
    // Obtener el idioma actual del language switcher si existe
    const currentLang = localStorage.getItem('currentLanguage') || 'fi';
    keywordsSearch.setLanguage(currentLang);
    
    // Cargar productos
    let allProducts = [];
    try {
        const response = await fetch('productos.json');
        const data = await response.json();
        allProducts = data.productos || [];
    } catch (error) {
        console.error('Error cargando productos:', error);
    }
    
    // Elementos del DOM
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    // Función para renderizar productos
    function renderProducts(products) {
        if (!searchResults) return;
        
        if (products.length === 0) {
            searchResults.innerHTML = '<p>No se encontraron productos</p>';
            return;
        }
        
        searchResults.innerHTML = products.map(product => `
            <div class="product-card">
                <h3>${product.nombre}</h3>
                <p><strong>Ingredientes:</strong> ${Array.isArray(product.ingredientes) ? product.ingredientes.join(', ') : product.ingredientes}</p>
                <p><strong>Keywords:</strong> ${Array.isArray(product.keywords) ? product.keywords.map(k => keywordsSearch.translateKeyword(k, currentLang)).join(', ') : ''}</p>
            </div>
        `).join('');
    }
    
    // Función para mostrar sugerencias
    function showSuggestions(searchTerm) {
        if (!suggestionsContainer || !searchTerm || searchTerm.length < 2) {
            if (suggestionsContainer) suggestionsContainer.innerHTML = '';
            return;
        }
        
        const suggestions = keywordsSearch.getSearchSuggestions(searchTerm, currentLang);
        
        if (suggestions.length > 0) {
            suggestionsContainer.innerHTML = suggestions.map(s => `
                <div class="suggestion-item" onclick="selectSuggestion('${s.translated}')">
                    ${s.translated}
                </div>
            `).join('');
        } else {
            suggestionsContainer.innerHTML = '';
        }
    }
    
    // Función para seleccionar una sugerencia
    window.selectSuggestion = function(term) {
        if (searchInput) {
            searchInput.value = term;
            performSearch(term);
        }
    };
    
    // Función de búsqueda
    function performSearch(searchTerm) {
        const filtered = keywordsSearch.searchProductsByKeyword(allProducts, searchTerm);
        renderProducts(filtered);
        
        // Mostrar contador de resultados
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            resultsCount.textContent = `${filtered.length} producto(s) encontrado(s)`;
        }
    }
    
    // Event listeners
    if (searchInput) {
        // Búsqueda en tiempo real
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value;
            performSearch(searchTerm);
            showSuggestions(searchTerm);
        });
        
        // Búsqueda al presionar Enter
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(e.target.value);
            }
        });
    }
    
    // Escuchar cambios de idioma
    document.addEventListener('languageChanged', (e) => {
        const newLang = e.detail.language || 'fi';
        keywordsSearch.setLanguage(newLang);
        
        // Re-buscar con el nuevo idioma si hay un término de búsqueda
        if (searchInput && searchInput.value) {
            performSearch(searchInput.value);
        }
    });
    
    // Renderizar todos los productos inicialmente
    renderProducts(allProducts);
    
    // Mostrar todos los keywords traducidos (útil para debugging o mostrar lista completa)
    const allKeywords = keywordsSearch.getAllKeywordsTranslated(currentLang);
    console.log('Keywords disponibles:', allKeywords);
});

