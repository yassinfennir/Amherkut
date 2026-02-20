/**
 * IMAGE GALLERY SYSTEM - Amherkut
 * Carga dinámica de imágenes con lightbox
 */

class ImageGalleryManager {
    constructor() {
        this.images = {
            food: [],
            bread: [],
            drinks: [],
            sweet: [],
            hakaniemet: [],
            leipomo: []
        };
        this.currentGallery = '';
        this.currentIndex = 0;
        this.currentProductId = null;
        this.currentFilter = 'all';
        this.currentSearch = '';
        this.currentSort = 'bestSeller';
        this.searchDebounce = null;
    }

    async init() {
        await this.loadImageArrays();
        this.setupLightbox();
        this.setupFilters();
        this.populateCategorySelect();
        this.setupControls();
    }

    // Cargar listas de imágenes desde configuración
    async loadImageArrays() {
        // Usar configuración global GALLERY_IMAGES
        if (typeof GALLERY_IMAGES !== 'undefined') {
            // Hakaniemet (tienda de Mohamed/Moha, izquierda): imágenes + videos (hakaniemet + carpeta Moha)
            const hakaniemetFiles = GALLERY_IMAGES.hakaniemet || [];
            const mohaFiles = GALLERY_IMAGES.moha || [];
            this.images.hakaniemet = [
                ...this.generateImagePaths('assets/images/hakaniemet', hakaniemetFiles),
                ...this.generateImagePaths('Moha', mohaFiles)
            ];
            // Leipomo (tienda de Nora, derecha): solo fotos y videos de la carpeta "nora 2" en la raíz del proyecto
            const leipomoFiles = GALLERY_IMAGES.leipomo || [];
            this.images.leipomo = this.generateImagePaths('nora 2', leipomoFiles, true);
            this.images.food = this.generateImagePaths('photos/FOOD', GALLERY_IMAGES.food);
            this.images.bread = this.generateImagePaths('photos/Bread', GALLERY_IMAGES.bread);
            this.images.drinks = this.generateImagePaths('photos/DRINKS', GALLERY_IMAGES.drinks);
            this.images.sweet = this.generateImagePaths('photos/SWEET', GALLERY_IMAGES.sweet);
        }
    }

    generateImagePaths(folder, imageFiles = [], allowExternalUrls = false) {
        const basePath = window.location.hostname.includes('github.io') ? '/Amherkut/' : './';
        const encodedFolder = (folder || '').replace(/ /g, '%20');
        return imageFiles.map(img => {
            // URLs externas (https?) se usan tal cual para galería Leipomo
            if (allowExternalUrls && (img.startsWith('http://') || img.startsWith('https://'))) {
                return img;
            }
            const encodedImg = img.replace(/ /g, '%20');
            if (img.includes('/')) {
                return `${basePath}${encodedFolder}/${encodedImg}`;
            }
            return `${basePath}${encodedFolder}/${encodedImg}`;
        });
    }

    shuffleArray(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // Renderizar galería de Hakaniemet (tienda de Mohamed, izquierda): fotos y videos
    renderHakaniemetGallery(container) {
        if (!container) return;
        
        this.currentGallery = 'hakaniemet';
        const mediaFiles = this.images.hakaniemet || [];
        
        if (mediaFiles.length === 0) {
            container.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">No hay contenido disponible</p>';
            return;
        }
        
        const isVideo = (file) => /\.(mp4|mov|webm)$/i.test(file || '');
        
        const html = mediaFiles.map((file, index) => {
            if (isVideo(file)) {
                return `
                <div class="gallery-thumbnail fade-in" style="animation-delay: ${index * 0.05}s">
                    <video 
                        src="${file}" 
                        class="video-thumbnail"
                        style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; cursor: pointer; background: #000;"
                        muted
                        loop
                        playsinline
                        preload="metadata"
                        onloadedmetadata="this.currentTime = 0.1"
                        onmouseover="this.play()" 
                        onmouseout="this.pause(); this.currentTime=0.1;"
                        ontouchstart="this.play()"
                        onclick="window.open('${file.replace(/'/g, "\\'")}', '_blank')">
                        Tu navegador no soporta videos
                    </video>
                </div>
                `;
            }
            return `
            <div class="gallery-thumbnail fade-in" style="animation-delay: ${index * 0.05}s">
                <img src="${file}" 
                     alt="hakaniemen myymälä - Imagen ${index + 1}" 
                     loading="lazy"
                     decoding="async"
                     onclick="imageGallery.openLightbox('hakaniemet', ${index})">
            </div>
            `;
        }).join('');
        
        container.innerHTML = html;
        
        setTimeout(() => {
            container.querySelectorAll('video').forEach(video => {
                video.load();
                video.currentTime = 0.1;
            });
        }, 100);
    }

    // Renderizar galería de Leipomo (tienda de Nora): mix de 20 fotos y videos en el orden mezclado
    renderLeipomoGallery(container) {
        if (!container) return;
        
        this.currentGallery = 'leipomo';
        const mediaFiles = this.images.leipomo || [];
        
        if (mediaFiles.length === 0) {
            container.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">No hay contenido disponible</p>';
            return;
        }
        
        const isVideo = (file) => /\.(mp4|mov|webm)$/i.test(file || '');
        
        let html = mediaFiles.map((file, index) => {
            if (isVideo(file)) {
                return `
                <div class="gallery-thumbnail fade-in" style="animation-delay: ${index * 0.05}s">
                    <video 
                        src="${file}" 
                        class="video-thumbnail"
                        style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; cursor: pointer; background: #000;"
                        muted
                        loop
                        playsinline
                        preload="metadata"
                        onloadedmetadata="this.currentTime = 0.1"
                        onmouseover="this.play()" 
                        onmouseout="this.pause(); this.currentTime=0.1;"
                        ontouchstart="this.play()"
                        onclick="window.open('${file.replace(/'/g, "\\'")}', '_blank')">
                        Tu navegador no soporta videos
                    </video>
                </div>
                `;
            }
            return `
                <div class="gallery-thumbnail fade-in" style="animation-delay: ${index * 0.05}s">
                    <img src="${file}" 
                         alt="leipomo & kahvila - Imagen ${index + 1}" 
                         loading="lazy"
                         decoding="async"
                         onerror="handleImageError(this, 'assets/images/placeholder.svg')"
                         onclick="imageGallery.openLightbox('leipomo', ${index})">
                </div>
            `;
        }).join('');
        
        container.innerHTML = html;
        
        setTimeout(() => {
            container.querySelectorAll('video').forEach(video => {
                video.load();
                video.currentTime = 0.1;
            });
        }, 100);
    }

    // Renderizar galería de productos con filtros
    renderProductsGallery(container = document.querySelector('[data-gallery="menu"]')) {
        if (!container) return;
        
        const metas = this.applySearchAndSort(this.collectImagesWithMeta());
 
         if (metas.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <h3>${getTranslation('products.empty') || 'No hay contenido disponible'}</h3>
                    <p>${getTranslation('products.empty.desc') || 'Vuelve pronto para descubrir nuevas creaciones artesanales.'}</p>
                </div>
            `;
            this.updateProductCount(0);
            return;
        }

        container.innerHTML = metas.map((meta, index) => {
            // Verificar si el producto tiene múltiples imágenes
            const productId = this.findProductIdFromImage(meta.img, meta.type);
            const hasMultipleAngles = productId && typeof productImagesManager !== 'undefined' 
                ? productImagesManager.hasMultipleAngles(productId) 
                : false;

            return `
            <article class="product-card enhanced fade-in" style="animation-delay: ${index * 0.03}s" data-category="${meta.type}">
                <div class="product-image menu-card-image" 
                     data-gallery-type="${meta.type}" 
                     data-index="${meta.index}"
                     ${productId ? `data-product-id="${productId}"` : ''}>
                    <img src="${meta.img}" alt="${meta.title}" loading="lazy" decoding="async">
                    <span class="menu-card-category">${meta.categoryLabel}</span>
                    ${hasMultipleAngles ? '<span class="multiple-angles-badge" title="Múltiples ángulos disponibles">📷</span>' : ''}
                    <button type="button" class="menu-card-zoom" 
                            aria-label="Zoom ${meta.title}" 
                            data-gallery-type="${meta.type}" 
                            data-index="${meta.index}"
                            ${productId ? `data-product-id="${productId}"` : ''}>+</button>
                </div>
                <div class="product-card-content menu-card-content">
                    <div class="menu-card-header">
                        <h3>${meta.title}</h3>
                        <button type="button" class="prompt-copy-btn" data-prompt="${encodeURIComponent(meta.prompt)}">
                            ${getTranslation('products.copy.prompt') || 'Copy prompt'}
                        </button>
                    </div>
                    <p class="menu-card-description">${meta.description}</p>
                    ${meta.keywords && meta.keywords.length ? `<div class="menu-card-keywords">${this.renderKeywords(meta.keywords)}</div>` : ''}
                </div>
            </article>
        `;
        }).join('');

        this.attachCardEvents(container);
        this.updateProductCount(metas.length);
    }

    // Renderizar galería de Food (mantener compatibilidad)
    renderFoodGallery(container) {
        this.currentFilter = 'food';
        this.renderProductsGallery(container);
    }

    // Configurar filtros
    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = btn.dataset.filter || 'all';
                this.setFilter(filter);
            });
        });
    }

    setupControls() {
        const searchInput = document.getElementById('product-search');
        const categorySelect = document.getElementById('category-filter');
        const sortSelect = document.getElementById('sort-filter');

        if (searchInput) {
            searchInput.addEventListener('input', (event) => {
                const value = (event.target.value || '').trim();
                clearTimeout(this.searchDebounce);
                this.searchDebounce = setTimeout(() => {
                    this.currentSearch = value.toLowerCase();
                    this.renderProductsGallery();
                }, 180);
            });
        }

        if (categorySelect) {
            categorySelect.addEventListener('change', (event) => {
                const value = event.target.value || 'all';
                this.setFilter(value);
            });
        }

        if (sortSelect) {
            sortSelect.addEventListener('change', (event) => {
                this.currentSort = event.target.value || 'bestSeller';
                this.renderProductsGallery();
            });
        }
    }

    populateCategorySelect() {
        const categorySelect = document.getElementById('category-filter');
        if (!categorySelect) return;

        const categories = [
            { value: 'all', translate: 'favorites.all.categories', fallback: 'filter.all' },
            { value: 'bread', translate: 'filter.bread' },
            { value: 'drinks', translate: 'filter.drinks' },
            { value: 'food', translate: 'filter.food' },
            { value: 'sweet', translate: 'filter.sweet' }
        ];

        categorySelect.innerHTML = categories.map(cat => {
            const translation = typeof getTranslation === 'function' ? (getTranslation(cat.translate) || (cat.fallback ? getTranslation(cat.fallback) : '')) : '';
            const label = translation || this.toTitleCase(cat.value);
            const translateAttr = cat.translate || cat.fallback || '';
            const translateMarkup = translateAttr ? ` data-translate="${translateAttr}"` : '';
            return `<option value="${cat.value}"${translateMarkup}>${label}</option>`;
        }).join('');

        categorySelect.value = this.currentFilter;
    }

    syncCategorySelect(filter) {
        const categorySelect = document.getElementById('category-filter');
        if (categorySelect && categorySelect.value !== filter) {
            categorySelect.value = filter;
        }
    }

    updateFilterButtons(filter) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if ((btn.dataset.filter || 'all') === filter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    applySearchAndSort(metas = []) {
        let processed = [...metas];

        if (this.currentSearch) {
            processed = processed.filter(meta => {
                const lowerTitle = meta.title.toLowerCase();
                const keywordMatch = meta.keywords && meta.keywords.some(keyword => keyword.includes(this.currentSearch));
                return lowerTitle.includes(this.currentSearch) || keywordMatch;
            });
        }

        switch (this.currentSort) {
            case 'new':
                processed.sort((a, b) => (b.index || 0) - (a.index || 0));
                break;
            case 'rating':
                processed.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'bestSeller':
            default:
                processed.sort((a, b) => {
                    const priorityDiff = this.getCategoryPriority(a.type) - this.getCategoryPriority(b.type);
                    if (priorityDiff !== 0) return priorityDiff;
                    return a.title.localeCompare(b.title);
                });
                break;
        }

        return processed;
    }

    getCategoryPriority(type = '') {
        const order = ['sweet', 'bread', 'food', 'drinks'];
        const index = order.indexOf(type);
        return index === -1 ? order.length : index;
    }

    // Establecer filtro
    setFilter(filter) {
        this.currentFilter = filter;
        this.syncCategorySelect(filter);
        this.updateFilterButtons(filter);
        this.renderProductsGallery();
    }

    // Actualizar contador de productos
    updateProductCount(count) {
        const countElement = document.getElementById('products-count');
        if (countElement) {
            const label = (typeof getTranslation === 'function' && (getTranslation('favorites.products.count') || getTranslation('products.count'))) || 'products';
            countElement.innerHTML = `<span class="products-count-number">${count}</span> ${label}`;
        }
    }

    collectImagesWithMeta() {
        const metas = [];

        const addMeta = (imgs, type) => {
            imgs.forEach((img, index) => {
                metas.push(this.buildImageMeta(img, type, index));
            });
        };

        switch (this.currentFilter) {
            case 'bread':
                addMeta(this.images.bread, 'bread');
                break;
            case 'drinks':
                addMeta(this.images.drinks, 'drinks');
                break;
            case 'sweet':
                addMeta(this.images.sweet, 'sweet');
                break;
            case 'food':
                addMeta(this.images.food, 'food');
                break;
            case 'all':
            default:
                addMeta(this.images.food, 'food');
                addMeta(this.images.bread, 'bread');
                addMeta(this.images.drinks, 'drinks');
                addMeta(this.images.sweet, 'sweet');
                break;
        }

        return metas;
    }

    buildImageMeta(img, type, index) {
        const fileName = decodeURIComponent(img.substring(img.lastIndexOf('/') + 1)).replace(/\.[^/.]+$/, '');
        const cleaned = fileName.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
        const title = this.toTitleCase(cleaned || type);
        const categoryLabel = this.getCategoryLabel(type);
        const keywords = this.generateKeywords(title, type);
        const description = this.generateDescription(title, categoryLabel, keywords);
        const prompt = this.generatePrompt(title, categoryLabel, keywords);

        return {
            img,
            type,
            index,
            title,
            categoryLabel,
            keywords,
            description,
            prompt
        };
    }

    generateKeywords(title, type) {
        const typeKeywords = [type, this.getCategoryLabel(type)];
        const words = title
            .toLowerCase()
            .split(/\s+/)
            .filter(Boolean);

        const keywords = new Set([
            ...typeKeywords.map(w => w.toLowerCase()),
            ...words.filter(w => w.length > 2)
        ]);

        return Array.from(keywords);
    }

    generateDescription(title, categoryLabel, keywords) {
        const highlights = keywords
            .filter(k => k !== categoryLabel.toLowerCase())
            .slice(0, 3)
            .map(k => this.toTitleCase(k))
            .join(', ');

        const essence = highlights || title;

        return `${categoryLabel}: ${essence}`;
    }

    generatePrompt(title, categoryLabel, keywords) {
        const descriptors = keywords.slice(0, 4).join(', ');
        return `${categoryLabel} • ${title} • artisan bakery photography, soft natural light, ${descriptors}`;
    }

    renderKeywords(keywords = []) {
        return keywords
            .map(keyword => `<span class="keyword-tag">${this.toTitleCase(keyword)}</span>`)
            .join('');
    }

    attachCardEvents(container) {
        const cards = container.querySelectorAll('.menu-card-image, .menu-card-zoom');
        cards.forEach(el => {
            el.addEventListener('click', (event) => {
                event.preventDefault();
                const type = el.getAttribute('data-gallery-type');
                const index = parseInt(el.getAttribute('data-index'), 10) || 0;
                const productId = el.getAttribute('data-product-id');
                
                // Si hay productId, abrir con múltiples imágenes
                if (productId) {
                    this.openLightbox(type, 0, productId);
                } else {
                    this.openLightbox(type, index);
                }
            });
        });

        const promptButtons = container.querySelectorAll('.prompt-copy-btn');
        promptButtons.forEach(btn => {
            btn.addEventListener('click', async (event) => {
                event.preventDefault();
                const prompt = btn.dataset.prompt ? decodeURIComponent(btn.dataset.prompt) : '';
                await this.copyPrompt(prompt, btn);
            });
        });
    }

    async copyPrompt(prompt, button) {
        if (!prompt || !button) return;

        const originalText = button.textContent;
        try {
            if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
                await navigator.clipboard.writeText(prompt);
            } else {
                const tempInput = document.createElement('textarea');
                tempInput.value = prompt;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
            }

            button.classList.add('copied');
            button.textContent = getTranslation('products.prompt.copied') || 'Copied!';
            setTimeout(() => {
                button.classList.remove('copied');
                button.textContent = originalText;
            }, 1800);
        } catch (error) {
            console.error('Clipboard copy failed', error);
            button.textContent = getTranslation('products.prompt.error') || 'Try again';
            setTimeout(() => {
                button.textContent = originalText;
            }, 1800);
        }
    }

    getCategoryLabel(type = '') {
        const key = `filter.${type}`;
        const fallback = `category.${type}`;
        if (typeof getTranslation === 'function') {
            return getTranslation(key) || getTranslation(fallback) || this.toTitleCase(type);
        }
        return this.toTitleCase(type);
    }

    toTitleCase(text = '') {
        return text
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    // Encontrar productId desde una imagen
    findProductIdFromImage(imagePath, category) {
        if (typeof productImagesManager === 'undefined') return null;
        
        // Normalizar la ruta para comparación (remover basePath, decodificar espacios)
        const normalizePath = (path) => {
            return path
                .replace(/^\.\//, '')
                .replace(/^\/Amherkut\//, '')
                .replace(/%20/g, ' ')
                .toLowerCase();
        };
        
        const normalizedImagePath = normalizePath(imagePath);
        
        // Buscar en productos de la categoría
        const products = productImagesManager.getProductsByCategory(category);
        for (const product of products) {
            const found = product.images.find(img => {
                const normalizedImgPath = normalizePath(img.path);
                const normalizedFullPath = normalizePath(img.fullPath);
                return normalizedImagePath.includes(normalizedImgPath) || 
                       normalizedImagePath === normalizedFullPath ||
                       normalizedImgPath.includes(normalizedImagePath.split('/').pop());
            });
            if (found) {
                return product.id;
            }
        }
        return null;
    }

    // Setup del lightbox
    setupLightbox() {
        // Event listeners para navegación
        const lightbox = document.getElementById('image-lightbox');
        if (!lightbox) return;

        const closeBtn = document.getElementById('lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        const lightboxImage = document.getElementById('lightbox-image');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeLightbox());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevImage());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextImage());
        }

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                this.closeLightbox();
            } else if (e.key === 'ArrowLeft' && lightbox.classList.contains('active')) {
                this.prevImage();
            } else if (e.key === 'ArrowRight' && lightbox.classList.contains('active')) {
                this.nextImage();
            }
        });

        // Cerrar al hacer click en overlay
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });

        // Swipe support para móviles - aplicar tanto a la imagen como al contenedor
        if (lightboxImage) {
            this.setupSwipe(lightboxImage);
        }
        // También aplicar swipe al contenedor completo para mejor experiencia
        const lightboxContent = document.querySelector('.lightbox-content');
        if (lightboxContent) {
            this.setupSwipe(lightboxContent);
        }
    }

    // Configurar swipe para navegación táctil (horizontal y vertical)
    setupSwipe(element) {
        let startX = 0;
        let startY = 0;
        let isSwiping = false;
        const swipeThreshold = 50; // Mínimo de píxeles para considerar un swipe

        element.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwiping = true;
        }, { passive: true });

        element.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            // Permitir scroll si el movimiento es muy pequeño
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = Math.abs(startX - currentX);
            const diffY = Math.abs(startY - currentY);
            
            // Solo prevenir scroll si es claramente un swipe
            if (diffX > 10 || diffY > 10) {
                e.preventDefault();
            }
        }, { passive: false });

        element.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            const absDiffX = Math.abs(diffX);
            const absDiffY = Math.abs(diffY);

            // Determinar si es swipe horizontal o vertical
            if (absDiffX > absDiffY && absDiffX > swipeThreshold) {
                // Swipe horizontal
                if (diffX > 0) {
                    // Swipe izquierda → siguiente imagen
                    this.nextImage();
                } else {
                    // Swipe derecha → imagen anterior
                    this.prevImage();
                }
            } else if (absDiffY > absDiffX && absDiffY > swipeThreshold) {
                // Swipe vertical
                if (diffY > 0) {
                    // Swipe arriba → siguiente imagen
                    this.nextImage();
                } else {
                    // Swipe abajo → imagen anterior
                    this.prevImage();
                }
            }

            isSwiping = false;
        }, { passive: true });
    }

    // Abrir lightbox
    openLightbox(galleryType, index = 0, productId = null) {
        this.currentGallery = galleryType;
        this.currentIndex = index;
        this.currentProductId = productId;
        
        const lightbox = document.getElementById('image-lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const counter = document.getElementById('lightbox-counter');
        const thumbnailsContainer = document.getElementById('lightbox-thumbnails');
        
        if (!lightbox || !lightboxImage) return;

        // Si hay un productId, usar las imágenes del producto
        let images = [];
        if (productId && typeof productImagesManager !== 'undefined') {
            const productImages = productImagesManager.getProductImages(productId);
            images = productImages.map(img => img.fullPath);
            this.currentGallery = 'product';
        } else {
            images = this.images[galleryType] || [];
        }

        if (images.length === 0) return;

        // Asegurar que el índice esté dentro del rango
        if (index < 0) index = 0;
        if (index >= images.length) index = images.length - 1;
        this.currentIndex = index;

        // Actualizar imagen
        lightboxImage.src = images[index];
        lightboxImage.alt = productId && typeof productImagesManager !== 'undefined' 
            ? productImagesManager.getProduct(productId)?.images[index]?.alt || `${galleryType} - Imagen ${index + 1}`
            : `${galleryType} - Imagen ${index + 1}`;

        // Actualizar contador
        if (counter) {
            counter.textContent = `Foto ${index + 1} de ${images.length}`;
        }

        // Mostrar miniaturas si hay múltiples imágenes
        if (thumbnailsContainer && images.length > 1) {
            this.renderThumbnails(thumbnailsContainer, images, index);
            thumbnailsContainer.style.display = 'flex';
        } else if (thumbnailsContainer) {
            thumbnailsContainer.style.display = 'none';
        }

        // Mostrar lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Renderizar miniaturas en el lightbox
    renderThumbnails(container, images, currentIndex) {
        container.innerHTML = images.map((img, index) => `
            <div class="lightbox-thumbnail ${index === currentIndex ? 'active' : ''}" 
                 data-index="${index}"
                 onclick="imageGallery.goToImage(${index})">
                <img src="${img}" alt="Miniatura ${index + 1}" loading="lazy" decoding="async">
            </div>
        `).join('');
    }

    // Ir a una imagen específica
    goToImage(index) {
        const lightbox = document.getElementById('image-lightbox');
        if (!lightbox || !lightbox.classList.contains('active')) return;

        let images = [];
        if (this.currentProductId && typeof productImagesManager !== 'undefined') {
            const productImages = productImagesManager.getProductImages(this.currentProductId);
            images = productImages.map(img => img.fullPath);
        } else {
            images = this.images[this.currentGallery] || [];
        }

        if (index >= 0 && index < images.length) {
            this.currentIndex = index;
            this.updateLightboxImage();
        }
    }

    // Cerrar lightbox
    closeLightbox() {
        const lightbox = document.getElementById('image-lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            // Limpiar productId al cerrar
            this.currentProductId = null;
        }
    }

    // Imagen anterior
    prevImage() {
        let images = [];
        if (this.currentProductId && typeof productImagesManager !== 'undefined') {
            const productImages = productImagesManager.getProductImages(this.currentProductId);
            images = productImages.map(img => img.fullPath);
        } else {
            images = this.images[this.currentGallery] || [];
        }

        if (images.length === 0) return;

        this.currentIndex = (this.currentIndex - 1 + images.length) % images.length;
        this.updateLightboxImage();
    }

    // Imagen siguiente
    nextImage() {
        let images = [];
        if (this.currentProductId && typeof productImagesManager !== 'undefined') {
            const productImages = productImagesManager.getProductImages(this.currentProductId);
            images = productImages.map(img => img.fullPath);
        } else {
            images = this.images[this.currentGallery] || [];
        }

        if (images.length === 0) return;

        this.currentIndex = (this.currentIndex + 1) % images.length;
        this.updateLightboxImage();
    }

    // Actualizar imagen en lightbox
    updateLightboxImage() {
        const lightboxImage = document.getElementById('lightbox-image');
        const counter = document.getElementById('lightbox-counter');
        const thumbnailsContainer = document.getElementById('lightbox-thumbnails');

        let images = [];
        if (this.currentProductId && typeof productImagesManager !== 'undefined') {
            const productImages = productImagesManager.getProductImages(this.currentProductId);
            images = productImages.map(img => img.fullPath);
        } else {
            images = this.images[this.currentGallery] || [];
        }

        if (!lightboxImage || images.length === 0) return;

        lightboxImage.src = images[this.currentIndex];
        
        if (this.currentProductId && typeof productImagesManager !== 'undefined') {
            const product = productImagesManager.getProduct(this.currentProductId);
            lightboxImage.alt = product?.images[this.currentIndex]?.alt || `${this.currentGallery} - Imagen ${this.currentIndex + 1}`;
        } else {
            lightboxImage.alt = `${this.currentGallery} - Imagen ${this.currentIndex + 1}`;
        }

        if (counter) {
            counter.textContent = `Foto ${this.currentIndex + 1} de ${images.length}`;
        }

        // Actualizar miniaturas activas
        if (thumbnailsContainer) {
            const thumbnails = thumbnailsContainer.querySelectorAll('.lightbox-thumbnail');
            thumbnails.forEach((thumb, index) => {
                if (index === this.currentIndex) {
                    thumb.classList.add('active');
                } else {
                    thumb.classList.remove('active');
                }
            });
        }
    }
}

// Inicializar cuando el DOM esté listo
let imageGallery;
document.addEventListener('DOMContentLoaded', async () => {
    imageGallery = new ImageGalleryManager();
    
    // Esperar a que las imágenes se carguen
    await imageGallery.init();
    
    // Renderizar galerías si existen contenedores
    const hakaniemetContainer = document.querySelector('[data-gallery="hakaniemet"]');
    if (hakaniemetContainer) {
        imageGallery.renderHakaniemetGallery(hakaniemetContainer);
    }

    const leipomoContainer = document.querySelector('[data-gallery="leipomo"]');
    if (leipomoContainer) {
        imageGallery.renderLeipomoGallery(leipomoContainer);
    }

    const foodContainer = document.querySelector('[data-gallery="menu"]');
    if (foodContainer) {
        imageGallery.renderProductsGallery(foodContainer);
    }
});

