/**
 * PRODUCT GALLERY WITH ZOOM
 * Sistema de galería para productos con zoom y cambio de perspectiva
 */

class ProductGallery {
    constructor() {
        this.currentProduct = null;
        this.currentImageIndex = 0;
        this.isZoomed = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.minSwipeDistance = 50;
        this.init();
    }

    init() {
        this.createModal();
        this.attachEventListeners();
    }

    /**
     * Crea el modal de galería
     */
    createModal() {
        const modal = document.createElement('div');
        modal.className = 'product-gallery-modal';
        modal.innerHTML = `
            <div class="gallery-modal-overlay"></div>
            <div class="gallery-modal-content">
                <button class="gallery-close-btn" aria-label="Cerrar galería">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                
                <div class="gallery-main-image-container">
                    <img class="gallery-main-image" src="" alt="">
                    <div class="gallery-zoom-controls">
                        <button class="gallery-zoom-btn zoom-in" aria-label="Acercar">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="11" y1="8" x2="11" y2="14"></line>
                                <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
                        </button>
                        <button class="gallery-zoom-btn zoom-out" aria-label="Alejar">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="gallery-thumbnails-container">
                    <button class="gallery-nav-btn prev-btn" aria-label="Imagen anterior">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <div class="gallery-thumbnails"></div>
                    <button class="gallery-nav-btn next-btn" aria-label="Siguiente imagen">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
                
                <div class="gallery-image-counter">
                    <span class="current-image-num">1</span> / <span class="total-images">1</span>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        this.modal = modal;
        this.mainImage = modal.querySelector('.gallery-main-image');
        this.thumbnailsContainer = modal.querySelector('.gallery-thumbnails');
        this.currentImageNum = modal.querySelector('.current-image-num');
        this.totalImages = modal.querySelector('.total-images');
    }

    /**
     * Adjunta los event listeners
     */
    attachEventListeners() {
        // Cerrar modal
        this.modal.querySelector('.gallery-close-btn').addEventListener('click', () => this.close());
        this.modal.querySelector('.gallery-modal-overlay').addEventListener('click', () => this.close());
        
        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (this.modal.classList.contains('active')) {
                if (e.key === 'Escape') this.close();
                if (e.key === 'ArrowLeft') this.prevImage();
                if (e.key === 'ArrowRight') this.nextImage();
            }
        });
        
        // Botones de navegación
        this.modal.querySelector('.prev-btn').addEventListener('click', () => this.prevImage());
        this.modal.querySelector('.next-btn').addEventListener('click', () => this.nextImage());
        
        // Zoom
        this.modal.querySelector('.zoom-in').addEventListener('click', () => this.zoomIn());
        this.modal.querySelector('.zoom-out').addEventListener('click', () => this.zoomOut());
        
        // Zoom con rueda del mouse
        this.mainImage.addEventListener('wheel', (e) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                if (e.deltaY < 0) {
                    this.zoomIn();
                } else {
                    this.zoomOut();
                }
            }
        });
        
        // Click en imagen para zoom
        this.mainImage.addEventListener('click', () => {
            if (!this.isZoomed) {
                this.zoomIn();
            } else {
                this.resetZoom();
            }
        });
        
        // Soporte para swipe táctil
        this.setupSwipeSupport();
    }

    /**
     * Configura el soporte para swipe táctil
     */
    setupSwipeSupport() {
        const container = this.modal.querySelector('.gallery-main-image-container');
        
        // Touch events para móviles
        container.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        container.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
        
        // Mouse events para desktop (drag)
        let mouseDownX = 0;
        let mouseUpX = 0;
        let isDragging = false;
        
        container.addEventListener('mousedown', (e) => {
            if (!this.isZoomed) {
                mouseDownX = e.clientX;
                isDragging = true;
            }
        });
        
        container.addEventListener('mouseup', (e) => {
            if (isDragging && !this.isZoomed) {
                mouseUpX = e.clientX;
                const diff = mouseDownX - mouseUpX;
                if (Math.abs(diff) > this.minSwipeDistance) {
                    if (diff > 0) {
                        this.nextImage();
                    } else {
                        this.prevImage();
                    }
                }
            }
            isDragging = false;
        });
        
        container.addEventListener('mouseleave', () => {
            isDragging = false;
        });
    }

    /**
     * Maneja el gesto de swipe
     */
    handleSwipe() {
        if (!this.touchStartX || !this.touchEndX) return;
        
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) > this.minSwipeDistance && !this.isZoomed) {
            if (diff > 0) {
                // Swipe izquierda - siguiente imagen
                this.nextImage();
            } else {
                // Swipe derecha - imagen anterior
                this.prevImage();
            }
        }
        
        // Reset
        this.touchStartX = 0;
        this.touchEndX = 0;
    }

    /**
     * Abre la galería con un producto
     */
    open(productData) {
        this.currentProduct = productData;
        this.currentImageIndex = 0;
        this.isZoomed = false;
        
        // Actualizar imágenes
        this.updateImages();
        
        // Mostrar modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset zoom
        this.resetZoom();
    }

    /**
     * Cierra la galería
     */
    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.resetZoom();
    }

    /**
     * Actualiza las imágenes en la galería
     */
    updateImages() {
        if (!this.currentProduct || !this.currentProduct.images || this.currentProduct.images.length === 0) {
            return;
        }
        
        const images = this.currentProduct.images;
        this.totalImages.textContent = images.length;
        this.currentImageNum.textContent = this.currentImageIndex + 1;
        
        // Actualizar imagen principal
        this.mainImage.src = images[this.currentImageIndex].path;
        this.mainImage.alt = images[this.currentImageIndex].alt || this.currentProduct.name;
        
        // Actualizar thumbnails
        this.thumbnailsContainer.innerHTML = '';
        images.forEach((img, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = img.path;
            thumbnail.alt = img.alt || `${this.currentProduct.name} - Vista ${index + 1}`;
            thumbnail.className = index === this.currentImageIndex ? 'thumbnail active' : 'thumbnail';
            thumbnail.addEventListener('click', () => this.goToImage(index));
            this.thumbnailsContainer.appendChild(thumbnail);
        });
    }

    /**
     * Va a una imagen específica
     */
    goToImage(index) {
        if (index >= 0 && index < this.currentProduct.images.length) {
            this.currentImageIndex = index;
            this.updateImages();
            this.resetZoom();
        }
    }

    /**
     * Imagen anterior
     */
    prevImage() {
        if (this.currentImageIndex > 0) {
            this.currentImageIndex--;
        } else {
            this.currentImageIndex = this.currentProduct.images.length - 1;
        }
        this.updateImages();
        this.resetZoom();
    }

    /**
     * Siguiente imagen
     */
    nextImage() {
        if (this.currentImageIndex < this.currentProduct.images.length - 1) {
            this.currentImageIndex++;
        } else {
            this.currentImageIndex = 0;
        }
        this.updateImages();
        this.resetZoom();
    }

    /**
     * Acercar zoom
     */
    zoomIn() {
        this.isZoomed = true;
        this.mainImage.style.transform = 'scale(2)';
        this.mainImage.style.cursor = 'zoom-out';
    }

    /**
     * Alejar zoom
     */
    zoomOut() {
        if (this.isZoomed) {
            this.resetZoom();
        }
    }

    /**
     * Resetear zoom
     */
    resetZoom() {
        this.isZoomed = false;
        this.mainImage.style.transform = 'scale(1)';
        this.mainImage.style.cursor = 'zoom-in';
    }
}

// Instancia global
let productGallery;

// Inicializar cuando el DOM esté listo
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        productGallery = new ProductGallery();
    });
}

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductGallery;
}

