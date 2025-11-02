// AM Herkut - Image Error Handler & Fallback System
// Ensures all images load properly without errors

class ImageHandler {
    constructor() {
        this.fallbackImages = {
            'hero': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkZGNkU2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM4QjQ1MTMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkFNIEhlcmt1dCBMZWlwb21vPC90ZXh0Pgo8L3N2Zz4K',
            'product': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjU4IiBmaWxsPSIjRkZGNkU2IiBzdHJva2U9IiNEQUE1MjAiIHN0cm9rZS13aWR0aD0iNCIvPgo8dGV4dCB4PSI2MCIgeT0iNjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzVEMDAzNyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VHVvdGU8L3RleHQ+Cjwvc3ZnPgo=',
            'gallery': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDI1MCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRkZGNkU2IiBzdHJva2U9IiNEQUE1MjAiIHN0cm9rZS13aWR0aD0iMyIvPgo8dGV4dCB4PSIyNTAiIHk9IjI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNUQwMDM3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5LdXZhPC90ZXh0Pgo8L3N2Zz4K',
            'avatar': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjMiIGZpbGw9IiNGRkY2RTYiIHN0cm9rZT0iI0RBQTUyMCIgc3Ryb2tlLXdpZHRoPSIzIi8+Cjx0ZXh0IHg9IjI1IiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNUQwMDM3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5GEPC90ZXh0Pgo8L3N2Zz4K'
        };
        this.init();
    }

    init() {
        this.setupImageErrorHandling();
        this.preloadImages();
        this.setupLazyLoading();
    }

    setupImageErrorHandling() {
        // Handle all image error events
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                this.handleImageError(e.target);
            }
        }, true);

        // Handle images that fail to load
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete || img.naturalHeight === 0) {
                img.addEventListener('error', () => this.handleImageError(img));
            }
        });
    }

    handleImageError(img) {
        const src = img.src;
        const alt = img.alt || '';
        
        // Determine fallback type based on class or context
        let fallbackType = 'gallery';
        if (img.classList.contains('hero-main-image')) {
            fallbackType = 'hero';
        } else if (img.classList.contains('about-main-image')) {
            fallbackType = 'hero';
        } else if (img.closest('.product-image')) {
            fallbackType = 'product';
        } else if (img.classList.contains('review-avatar')) {
            fallbackType = 'avatar';
        }

        // Set fallback image
        img.src = this.fallbackImages[fallbackType];
        img.alt = alt || 'Kuva ei latautunut';
        
        // Add error class for styling
        img.classList.add('image-error');
        
        // Log error for debugging
        console.warn('Image failed to load:', src, 'Using fallback for:', fallbackType);
    }

    preloadImages() {
        // Preload critical images
        const criticalImages = [
            'assets/images/20230506_085815.png',
            'assets/images/20230428_130831.png',
            'assets/images/20230519_150338.png'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    setupLazyLoading() {
        // Simple lazy loading for gallery images
        const galleryImages = document.querySelectorAll('.gallery-image');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        }
                    }
                });
            });

            galleryImages.forEach(img => {
                if (img.dataset.src) {
                    imageObserver.observe(img);
                }
            });
        }
    }

    // Method to check if image exists
    checkImageExists(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
        });
    }

    // Method to replace broken images
    async replaceBrokenImages() {
        const images = document.querySelectorAll('img');
        
        for (const img of images) {
            if (img.src && !img.src.startsWith('data:')) {
                const exists = await this.checkImageExists(img.src);
                if (!exists) {
                    this.handleImageError(img);
                }
            }
        }
    }

    // Method to add loading states
    addLoadingStates() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete) {
                img.classList.add('loading');
            }
            
            img.addEventListener('load', () => {
                img.classList.remove('loading');
                img.classList.add('loaded');
            });
        });
    }
}

// Initialize image handler when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.imageHandler = new ImageHandler();
    
    // Add loading states
    window.imageHandler.addLoadingStates();
    
    // Check for broken images after a delay
    setTimeout(() => {
        window.imageHandler.replaceBrokenImages();
    }, 2000);
});

// Add CSS for loading states
const loadingStyles = `
    .loading {
        opacity: 0.7;
        filter: blur(2px);
        transition: all 0.3s ease;
    }
    
    .loaded {
        opacity: 1;
        filter: none;
        transition: all 0.3s ease;
    }
    
    .image-error {
        background: linear-gradient(135deg, #FDF5E6, #F5F5DC) !important;
        border: 2px solid #DAA520 !important;
    }
    
    .image-error::before {
        content: "Kuva ei latautunut";
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #5D4037;
        font-size: 0.9rem;
        font-weight: 600;
    }
`;

// Inject loading styles
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageHandler;
}
