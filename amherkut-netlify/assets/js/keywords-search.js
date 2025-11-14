// Keywords Search System with Translations
class KeywordsSearch {
    constructor() {
        this.translations = {};
        this.keywordsMap = new Map(); // Mapa para búsquedas rápidas
        this.currentLang = 'fi'; // Idioma por defecto
        this.loadTranslations();
    }

    async loadTranslations() {
        try {
            const response = await fetch('productos.json');
            const data = await response.json();
            
            if (data.keywords_translations) {
                this.translations = data.keywords_translations;
                this.buildKeywordsMap();
            }
        } catch (error) {
            console.error('Error cargando traducciones de keywords:', error);
        }
    }

    buildKeywordsMap() {
        // Crear mapa inverso: traducción -> keyword original
        Object.keys(this.translations).forEach(keyword => {
            const translations = this.translations[keyword];
            
            // Mapear todas las traducciones al keyword original
            Object.keys(translations).forEach(lang => {
                const translated = translations[lang].toLowerCase();
                if (!this.keywordsMap.has(translated)) {
                    this.keywordsMap.set(translated, []);
                }
                this.keywordsMap.get(translated).push({
                    original: keyword,
                    lang: lang
                });
            });
        });
    }

    setLanguage(lang) {
        this.currentLang = lang;
    }

    // Obtener traducción de un keyword
    translateKeyword(keyword, targetLang = null) {
        const lang = targetLang || this.currentLang;
        if (this.translations[keyword] && this.translations[keyword][lang]) {
            return this.translations[keyword][lang];
        }
        return keyword; // Retornar original si no hay traducción
    }

    // Buscar keyword original desde una traducción
    findOriginalKeyword(searchTerm, lang = null) {
        const searchLang = lang || this.currentLang;
        const searchLower = searchTerm.toLowerCase().trim();
        
        // Buscar en todas las traducciones
        for (const [keyword, translations] of Object.entries(this.translations)) {
            for (const [transLang, translated] of Object.entries(translations)) {
                if (translated.toLowerCase() === searchLower) {
                    return keyword;
                }
            }
        }
        
        // Si no encuentra exacto, buscar parcial
        const matches = [];
        for (const [keyword, translations] of Object.entries(this.translations)) {
            for (const [transLang, translated] of Object.entries(translations)) {
                if (translated.toLowerCase().includes(searchLower) || 
                    searchLower.includes(translated.toLowerCase())) {
                    matches.push(keyword);
                    break;
                }
            }
        }
        
        return matches.length > 0 ? matches : null;
    }

    // Buscar productos por keyword (soporta múltiples idiomas)
    searchProductsByKeyword(products, searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            return products;
        }

        const searchLower = searchTerm.toLowerCase().trim();
        const matchedKeywords = this.findOriginalKeyword(searchTerm);
        const keywordsToSearch = matchedKeywords ? 
            (Array.isArray(matchedKeywords) ? matchedKeywords : [matchedKeywords]) : 
            [];

        // Si encontramos keywords originales, agregarlos a la búsqueda
        if (keywordsToSearch.length > 0) {
            keywordsToSearch.push(searchTerm); // También buscar el término original
        }

        return products.filter(product => {
            // Buscar en keywords del producto
            if (product.keywords && Array.isArray(product.keywords)) {
                for (const keyword of product.keywords) {
                    const keywordLower = keyword.toLowerCase();
                    
                    // Buscar coincidencia exacta
                    if (keywordLower === searchLower) {
                        return true;
                    }
                    
                    // Buscar en traducciones
                    if (keywordsToSearch.length > 0) {
                        for (const origKeyword of keywordsToSearch) {
                            if (keywordLower === origKeyword.toLowerCase()) {
                                return true;
                            }
                        }
                    }
                    
                    // Buscar coincidencia parcial
                    if (keywordLower.includes(searchLower) || searchLower.includes(keywordLower)) {
                        return true;
                    }
                    
                    // Buscar traducción del keyword
                    if (this.translations[keyword]) {
                        const translations = this.translations[keyword];
                        for (const lang in translations) {
                            const translated = translations[lang].toLowerCase();
                            if (translated === searchLower || 
                                translated.includes(searchLower) || 
                                searchLower.includes(translated)) {
                                return true;
                            }
                        }
                    }
                }
            }
            
            // También buscar en nombre e ingredientes
            const nombreLower = (product.nombre || '').toLowerCase();
            const ingredientesStr = Array.isArray(product.ingredientes) ? 
                product.ingredientes.join(' ').toLowerCase() : 
                (product.ingredientes || '').toLowerCase();
            
            if (nombreLower.includes(searchLower) || ingredientesStr.includes(searchLower)) {
                return true;
            }
            
            return false;
        });
    }

    // Obtener todos los keywords traducidos para el idioma actual
    getAllKeywordsTranslated(lang = null) {
        const targetLang = lang || this.currentLang;
        const translatedKeywords = [];
        
        Object.keys(this.translations).forEach(keyword => {
            const translation = this.translateKeyword(keyword, targetLang);
            translatedKeywords.push({
                original: keyword,
                translated: translation,
                lang: targetLang
            });
        });
        
        return translatedKeywords.sort((a, b) => 
            a.translated.localeCompare(b.translated)
        );
    }

    // Obtener sugerencias de búsqueda
    getSearchSuggestions(searchTerm, lang = null) {
        const targetLang = lang || this.currentLang;
        const suggestions = [];
        const searchLower = searchTerm.toLowerCase().trim();
        
        if (searchTerm.length < 2) {
            return suggestions;
        }
        
        Object.keys(this.translations).forEach(keyword => {
            const translation = this.translateKeyword(keyword, targetLang);
            const translationLower = translation.toLowerCase();
            
            if (translationLower.includes(searchLower) || 
                keyword.toLowerCase().includes(searchLower)) {
                suggestions.push({
                    keyword: keyword,
                    translated: translation,
                    lang: targetLang
                });
            }
        });
        
        return suggestions.slice(0, 10); // Máximo 10 sugerencias
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.KeywordsSearch = KeywordsSearch;
}

