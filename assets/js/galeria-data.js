/**
 * GALERÍA DATA MANAGER
 * Maneja la carga y gestión de datos de productos
 */

class GaleriaDataManager {
    constructor() {
        this.data = null;
        this.likes = this.loadLikes();
        this.ratings = this.loadRatings();
        this.visits = this.loadVisits();
    }

    /**
     * Carga los datos de productos desde el JSON
     */
    async loadData() {
        try {
            const response = await fetch('../data/productos.json');
            this.data = await response.json();
            return this.data;
        } catch (error) {
            console.error('Error cargando datos:', error);
            return null;
        }
    }

    /**
     * Obtiene todas las categorías
     */
    getCategories() {
        if (!this.data) return [];
        return this.data.categorias.map(cat => ({
            ...cat,
            productos_count: cat.productos ? cat.productos.length : 0
        }));
    }

    /**
     * Obtiene una categoría por ID
     */
    getCategory(categoryId) {
        if (!this.data) return null;
        return this.data.categorias.find(cat => cat.id === categoryId);
    }

    /**
     * Obtiene un producto por categoría e ID
     */
    getProduct(categoryId, productId) {
        const category = this.getCategory(categoryId);
        if (!category || !category.productos) return null;
        return category.productos.find(prod => prod.id === productId);
    }

    /**
     * Obtiene todos los productos de una categoría
     */
    getProductsByCategory(categoryId) {
        const category = this.getCategory(categoryId);
        if (!category || !category.productos) return [];
        return category.productos.map(prod => ({
            ...prod,
            categoria: category
        }));
    }

    /**
     * Busca productos por texto
     */
    searchProducts(query) {
        if (!this.data || !query) return [];
        const searchTerm = query.toLowerCase();
        const results = [];

        this.data.categorias.forEach(category => {
            if (!category.productos) return;
            
            category.productos.forEach(product => {
                const matches = 
                    product.nombre.toLowerCase().includes(searchTerm) ||
                    product.nombre_en?.toLowerCase().includes(searchTerm) ||
                    product.descripcion_fi?.toLowerCase().includes(searchTerm) ||
                    product.descripcion_en?.toLowerCase().includes(searchTerm) ||
                    product.ingredientes?.toLowerCase().includes(searchTerm) ||
                    product.keywords?.some(k => k.toLowerCase().includes(searchTerm));

                if (matches) {
                    results.push({
                        ...product,
                        categoria: category
                    });
                }
            });
        });

        return results;
    }

    /**
     * Filtra productos por keyword
     */
    filterByKeyword(keyword) {
        if (!this.data || !keyword) return [];
        const results = [];

        this.data.categorias.forEach(category => {
            if (!category.productos) return;
            
            category.productos.forEach(product => {
                if (product.keywords && product.keywords.includes(keyword)) {
                    results.push({
                        ...product,
                        categoria: category
                    });
                }
            });
        });

        return results;
    }

    /**
     * Obtiene productos más visitados
     */
    getMostVisited(limit = 20) {
        if (!this.data) return [];
        const allProducts = [];

        this.data.categorias.forEach(category => {
            if (!category.productos) return;
            category.productos.forEach(product => {
                allProducts.push({
                    ...product,
                    categoria: category,
                    visitas: this.getVisits(category.id, product.id)
                });
            });
        });

        return allProducts
            .sort((a, b) => b.visitas - a.visitas)
            .slice(0, limit);
    }

    /**
     * Obtiene productos mejor valorados
     */
    getHighestRated(limit = 20) {
        if (!this.data) return [];
        const allProducts = [];

        this.data.categorias.forEach(category => {
            if (!category.productos) return;
            category.productos.forEach(product => {
                const rating = this.getRating(category.id, product.id);
                if (rating > 0) {
                    allProducts.push({
                        ...product,
                        categoria: category,
                        rating: rating
                    });
                }
            });
        });

        return allProducts
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }

    /**
     * Obtiene productos más recientes
     */
    getRecent(limit = 20) {
        if (!this.data) return [];
        const allProducts = [];

        this.data.categorias.forEach(category => {
            if (!category.productos) return;
            category.productos.forEach(product => {
                allProducts.push({
                    ...product,
                    categoria: category
                });
            });
        });

        return allProducts
            .sort((a, b) => {
                const dateA = new Date(a.fecha_creacion || 0);
                const dateB = new Date(b.fecha_creacion || 0);
                return dateB - dateA;
            })
            .slice(0, limit);
    }

    /**
     * Obtiene todos los keywords
     */
    getAllKeywords() {
        if (!this.data) return [];
        return this.data.keywords_globales || [];
    }

    /**
     * Sistema de Likes
     */
    loadLikes() {
        try {
            const stored = localStorage.getItem('galeria_likes');
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            return {};
        }
    }

    saveLikes() {
        try {
            localStorage.setItem('galeria_likes', JSON.stringify(this.likes));
        } catch (e) {
            console.error('Error guardando likes:', e);
        }
    }

    isLiked(categoryId, productId) {
        const key = `${categoryId}_${productId}`;
        return this.likes[key] === true;
    }

    toggleLike(categoryId, productId) {
        const key = `${categoryId}_${productId}`;
        this.likes[key] = !this.likes[key];
        this.saveLikes();
        return this.likes[key];
    }

    getLikes(categoryId, productId) {
        const product = this.getProduct(categoryId, productId);
        const baseLikes = product ? (product.likes || 0) : 0;
        const key = `${categoryId}_${productId}`;
        return baseLikes + (this.likes[key] ? 1 : 0);
    }

    /**
     * Sistema de Ratings
     */
    loadRatings() {
        try {
            const stored = localStorage.getItem('galeria_ratings');
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            return {};
        }
    }

    saveRatings() {
        try {
            localStorage.setItem('galeria_ratings', JSON.stringify(this.ratings));
        } catch (e) {
            console.error('Error guardando ratings:', e);
        }
    }

    getRating(categoryId, productId) {
        const product = this.getProduct(categoryId, productId);
        const baseRating = product ? (product.rating || 0) : 0;
        const key = `${categoryId}_${productId}`;
        const userRating = this.ratings[key];
        
        if (userRating) {
            return userRating;
        }
        return baseRating;
    }

    setRating(categoryId, productId, rating) {
        const key = `${categoryId}_${productId}`;
        this.ratings[key] = rating;
        this.saveRatings();
    }

    /**
     * Sistema de Visitas
     */
    loadVisits() {
        try {
            const stored = localStorage.getItem('galeria_visits');
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            return {};
        }
    }

    saveVisits() {
        try {
            localStorage.setItem('galeria_visits', JSON.stringify(this.visits));
        } catch (e) {
            console.error('Error guardando visitas:', e);
        }
    }

    incrementVisit(categoryId, productId) {
        const key = `${categoryId}_${productId}`;
        this.visits[key] = (this.visits[key] || 0) + 1;
        this.saveVisits();
    }

    getVisits(categoryId, productId) {
        const product = this.getProduct(categoryId, productId);
        const baseVisits = product ? (product.visitas || 0) : 0;
        const key = `${categoryId}_${productId}`;
        const storedVisits = this.visits[key] || 0;
        return baseVisits + storedVisits;
    }
}

// Instancia global
const galeriaData = new GaleriaDataManager();

