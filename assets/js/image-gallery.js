/**
 * IMAGE GALLERY SYSTEM - Amherkut
 * Carga dinámica de imágenes con lightbox
 */

class ImageGalleryManager {
    constructor() {
        this.images = {
            food: [],
            hakaniemet: [],
            leipomo: []
        };
        this.currentGallery = '';
        this.currentIndex = 0;
    }

    async init() {
        await this.loadImageArrays();
        this.setupLightbox();
    }

    // Cargar listas de imágenes desde configuración
    async loadImageArrays() {
        // Usar configuración global GALLERY_IMAGES
        if (typeof GALLERY_IMAGES !== 'undefined') {
            this.images.hakaniemet = this.generateImagePaths('assets/images/hakaniemet', GALLERY_IMAGES.hakaniemet);
            this.images.leipomo = this.generateImagePaths('assets/images/leipomo', GALLERY_IMAGES.leipomo);
            this.images.food = this.generateImagePaths('assets/images/food', GALLERY_IMAGES.food);
        }
    }

    generateImagePaths(folder, imageFiles = []) {
        // Detectar si estamos en GitHub Pages
        const basePath = window.location.hostname.includes('github.io') ? '/Amherkut/' : '/';
        return imageFiles.map(img => {
            // Codificar espacios y caracteres especiales en la URL
            const encodedImg = encodeURIComponent(img).replace(/%2F/g, '/');
            return `${basePath}${folder}/${encodedImg}`;
        });
    }

    // Renderizar galería de Hakaniemet
    renderHakaniemetGallery(container) {
        if (!container) return;
        
        this.currentGallery = 'hakaniemet';
        const images = this.images.hakaniemet;
        
        container.innerHTML = images.map((img, index) => `
            <div class="gallery-thumbnail fade-in" style="animation-delay: ${index * 0.05}s">
                <img src="${img}" 
                     alt="Hakaniemet Myymalá - Imagen ${index + 1}" 
                     loading="lazy"
                     onclick="imageGallery.openLightbox('hakaniemet', ${index})">
            </div>
        `).join('');
    }

    // Renderizar galería de Leipomo (videos)
    renderLeipomoGallery(container) {
        if (!container) return;
        
        this.currentGallery = 'leipomo';
        const videos = this.images.leipomo;
        
        if (videos.length === 0) {
            container.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">No hay videos disponibles</p>';
            return;
        }
        
        container.innerHTML = videos.map((video, index) => `
            <div class="gallery-thumbnail fade-in" style="animation-delay: ${index * 0.05}s">
                <video 
                    src="${video}" 
                    class="video-thumbnail"
                    style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; cursor: pointer;"
                    muted
                    loop
                    onmouseover="this.play()" 
                    onmouseout="this.pause(); this.currentTime=0;"
                    onclick="window.open('${video}', '_blank')">
                </video>
            </div>
        `).join('');
    }

    // Renderizar galería de Food
    renderFoodGallery(container) {
        if (!container) return;
        
        this.currentGallery = 'food';
        const images = this.images.food;
        
        if (images.length === 0) {
            container.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">No hay imágenes disponibles</p>';
            return;
        }
        
        container.innerHTML = images.map((img, index) => `
            <div class="gallery-thumbnail fade-in" style="animation-delay: ${index * 0.02}s">
                <img src="${img}" 
                     alt="Producto ${index + 1}" 
                     loading="lazy"
                     onclick="imageGallery.openLightbox('food', ${index})">
            </div>
        `).join('');
    }

    // Setup del lightbox
    setupLightbox() {
        // Event listeners para navegación
        const lightbox = document.getElementById('image-lightbox');
        if (!lightbox) return;

        const closeBtn = document.getElementById('lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');

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
    }

    // Abrir lightbox
    openLightbox(galleryType, index = 0) {
        this.currentGallery = galleryType;
        this.currentIndex = index;
        
        const lightbox = document.getElementById('image-lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const counter = document.getElementById('lightbox-counter');
        
        if (!lightbox || !lightboxImage) return;

        const images = this.images[galleryType];
        if (!images || images.length === 0) return;

        // Actualizar imagen
        lightboxImage.src = images[index];
        lightboxImage.alt = `${galleryType} - Imagen ${index + 1}`;

        // Actualizar contador
        if (counter) {
            counter.textContent = `Foto ${index + 1} de ${images.length}`;
        }

        // Mostrar lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Cerrar lightbox
    closeLightbox() {
        const lightbox = document.getElementById('image-lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Imagen anterior
    prevImage() {
        const images = this.images[this.currentGallery];
        if (!images || images.length === 0) return;

        this.currentIndex = (this.currentIndex - 1 + images.length) % images.length;
        this.updateLightboxImage();
    }

    // Imagen siguiente
    nextImage() {
        const images = this.images[this.currentGallery];
        if (!images || images.length === 0) return;

        this.currentIndex = (this.currentIndex + 1) % images.length;
        this.updateLightboxImage();
    }

    // Actualizar imagen en lightbox
    updateLightboxImage() {
        const lightboxImage = document.getElementById('lightbox-image');
        const counter = document.getElementById('lightbox-counter');
        const images = this.images[this.currentGallery];

        if (!lightboxImage || !images || images.length === 0) return;

        lightboxImage.src = images[this.currentIndex];
        lightboxImage.alt = `${this.currentGallery} - Imagen ${this.currentIndex + 1}`;

        if (counter) {
            counter.textContent = `Foto ${this.currentIndex + 1} de ${images.length}`;
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

    const foodContainer = document.querySelector('[data-gallery="food"]');
    if (foodContainer) {
        imageGallery.renderFoodGallery(foodContainer);
    }
});

