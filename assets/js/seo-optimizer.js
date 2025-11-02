// Amherkut Leipomo - SEO Optimization Module
// Advanced SEO features and performance optimization

class SEOOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.setupLazyLoading();
        this.optimizePerformance();
        this.setupStructuredData();
        this.trackAnalytics();
    }

    // Image optimization
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" for better performance
            img.setAttribute('loading', 'lazy');
            
            // Add proper alt attributes if missing
            if (!img.alt) {
                img.alt = this.generateAltText(img.src);
            }
            
            // Add responsive images
            this.setupResponsiveImages(img);
        });
    }

    generateAltText(src) {
        const filename = src.split('/').pop().split('.')[0];
        const altTexts = {
            'hero': 'Amherkut leipomo - Tuore leipä ja pullat Helsingissä',
            'bakery': 'Amherkut leipomon sisätilat ja leipomotyö',
            'bread': 'Tuore ruisleipä tehty käsityönä',
            'pulla': 'Perinteinen suomalainen korvapuusti',
            'cake': 'Herkullinen mansikkakakku',
            'store': 'Amherkut leipomon myymälä Helsingin keskustassa'
        };
        
        return altTexts[filename] || 'Amherkut leipomon tuote';
    }

    setupResponsiveImages(img) {
        // Create responsive image sources
        const src = img.src;
        const baseName = src.split('.')[0];
        const extension = src.split('.').pop();
        
        const sizes = [
            { width: 400, suffix: '_small' },
            { width: 800, suffix: '_medium' },
            { width: 1200, suffix: '_large' }
        ];
        
        const picture = document.createElement('picture');
        sizes.forEach(size => {
            const source = document.createElement('source');
            source.media = `(max-width: ${size.width}px)`;
            source.srcset = `${baseName}${size.suffix}.${extension}`;
            picture.appendChild(source);
        });
        
        picture.appendChild(img.cloneNode(true));
        img.parentNode.replaceChild(picture, img);
    }

    // Lazy loading implementation
    setupLazyLoading() {
        const lazyElements = document.querySelectorAll('[data-lazy]');
        
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    this.loadLazyElement(element);
                    lazyObserver.unobserve(element);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        lazyElements.forEach(element => {
            lazyObserver.observe(element);
        });
    }

    loadLazyElement(element) {
        const src = element.dataset.lazy;
        if (element.tagName === 'IMG') {
            element.src = src;
            element.removeAttribute('data-lazy');
        } else {
            element.style.backgroundImage = `url(${src})`;
            element.removeAttribute('data-lazy');
        }
    }

    // Performance optimization
    optimizePerformance() {
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Optimize fonts
        this.optimizeFonts();
        
        // Setup service worker
        this.setupServiceWorker();
        
        // Optimize animations
        this.optimizeAnimations();
    }

    preloadCriticalResources() {
        const criticalResources = [
            { href: '/assets/css/styles.css', as: 'style' },
            { href: '/assets/js/script.js', as: 'script' },
            { href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap', as: 'style' }
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            document.head.appendChild(link);
        });
    }

    optimizeFonts() {
        // Add font-display: swap for better performance
        const fontLink = document.querySelector('link[href*="fonts.googleapis.com"]');
        if (fontLink) {
            fontLink.href += '&display=swap';
        }
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered successfully');
                })
                .catch(error => {
                    console.log('Service Worker registration failed');
                });
        }
    }

    optimizeAnimations() {
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            document.documentElement.style.setProperty('--animation-iteration-count', '1');
        }
    }

    // Structured data setup
    setupStructuredData() {
        // Add breadcrumb structured data
        this.addBreadcrumbStructuredData();
        
        // Add FAQ structured data
        this.addFAQStructuredData();
        
        // Add local business structured data
        this.addLocalBusinessStructuredData();
    }

    addBreadcrumbStructuredData() {
        const breadcrumbData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Koti",
                    "item": "https://amherkut.fi/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Tuotteet",
                    "item": "https://amherkut.fi/#products"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Menu",
                    "item": "https://amherkut.fi/#menu"
                }
            ]
        };
        
        this.addStructuredData(breadcrumbData);
    }

    addFAQStructuredData() {
        const faqData = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Mikä on Amherkut leipomon aukioloaika?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Olemme auki ma-pe 06:00-18:00, la 07:00-16:00 ja su 08:00-15:00."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Missä Amherkut leipomo sijaitsee?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sijaitseemme Mannerheimintie 15:ssä Helsingin keskustassa."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Toimitatteko kotiin?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Kyllä, toimitamme kotiin Helsingin alueella. Toimitusmaksu on 5€."
                    }
                }
            ]
        };
        
        this.addStructuredData(faqData);
    }

    addLocalBusinessStructuredData() {
        const businessData = {
            "@context": "https://schema.org",
            "@type": "Bakery",
            "name": "Amherkut",
            "description": "Autenttinen suomalainen leipomo Helsingin keskustassa",
            "url": "https://amherkut.fi",
            "telephone": "+358-40-123-4567",
            "email": "info@amherkut.fi",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Mannerheimintie 15",
                "addressLocality": "Helsinki",
                "postalCode": "00100",
                "addressCountry": "FI"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 60.1699,
                "longitude": 24.9384
            },
            "openingHours": [
                "Mo-Fr 06:00-18:00",
                "Sa 07:00-16:00",
                "Su 08:00-15:00"
            ],
            "priceRange": "€€",
            "servesCuisine": "Finnish Bakery",
            "hasMenu": "https://amherkut.fi/#menu",
            "sameAs": [
                "https://www.instagram.com/amherkut_leipomo",
                "https://www.facebook.com/amherkut"
            ]
        };
        
        this.addStructuredData(businessData);
    }

    addStructuredData(data) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    }

    // Analytics tracking
    trackAnalytics() {
        // Track page views
        this.trackPageView();
        
        // Track user interactions
        this.trackUserInteractions();
        
        // Track performance metrics
        this.trackPerformanceMetrics();
    }

    trackPageView() {
        // Google Analytics 4 tracking
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href
            });
        }
        
        // Custom analytics
        this.sendAnalyticsEvent('page_view', {
            page: window.location.pathname,
            title: document.title,
            timestamp: new Date().toISOString()
        });
    }

    trackUserInteractions() {
        // Track button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, .btn, .nav-link')) {
                this.sendAnalyticsEvent('button_click', {
                    element: e.target.textContent.trim(),
                    page: window.location.pathname
                });
            }
        });
        
        // Track form submissions
        document.addEventListener('submit', (e) => {
            this.sendAnalyticsEvent('form_submit', {
                form_id: e.target.id || 'unknown',
                page: window.location.pathname
            });
        });
        
        // Track chatbot interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('#chatbot')) {
                this.sendAnalyticsEvent('chatbot_interaction', {
                    action: 'open',
                    page: window.location.pathname
                });
            }
        });
    }

    trackPerformanceMetrics() {
        // Track Core Web Vitals
        window.addEventListener('load', () => {
            // Largest Contentful Paint
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.sendAnalyticsEvent('performance_metric', {
                    metric: 'LCP',
                    value: lastEntry.startTime,
                    page: window.location.pathname
                });
            }).observe({ entryTypes: ['largest-contentful-paint'] });
            
            // First Input Delay
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach(entry => {
                    this.sendAnalyticsEvent('performance_metric', {
                        metric: 'FID',
                        value: entry.processingStart - entry.startTime,
                        page: window.location.pathname
                    });
                });
            }).observe({ entryTypes: ['first-input'] });
        });
    }

    sendAnalyticsEvent(eventName, parameters) {
        // Send to Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
        
        // Send to custom analytics endpoint
        fetch('/api/analytics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event: eventName,
                parameters: parameters,
                timestamp: new Date().toISOString(),
                user_agent: navigator.userAgent,
                url: window.location.href
            })
        }).catch(error => {
            console.log('Analytics tracking failed:', error);
        });
    }

    // SEO utilities
    updateMetaTags(title, description, keywords) {
        // Update title
        if (title) {
            document.title = title;
        }
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && description) {
            metaDescription.content = description;
        }
        
        // Update meta keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords && keywords) {
            metaKeywords.content = keywords;
        }
    }

    generateSitemap() {
        const sitemap = {
            urlset: {
                "@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
                url: [
                    {
                        loc: "https://amherkut.fi/",
                        lastmod: new Date().toISOString().split('T')[0],
                        changefreq: "daily",
                        priority: "1.0"
                    },
                    {
                        loc: "https://amherkut.fi/#about",
                        lastmod: new Date().toISOString().split('T')[0],
                        changefreq: "monthly",
                        priority: "0.8"
                    },
                    {
                        loc: "https://amherkut.fi/#products",
                        lastmod: new Date().toISOString().split('T')[0],
                        changefreq: "weekly",
                        priority: "0.9"
                    },
                    {
                        loc: "https://amherkut.fi/#menu",
                        lastmod: new Date().toISOString().split('T')[0],
                        changefreq: "weekly",
                        priority: "0.9"
                    },
                    {
                        loc: "https://amherkut.fi/#contact",
                        lastmod: new Date().toISOString().split('T')[0],
                        changefreq: "monthly",
                        priority: "0.7"
                    }
                ]
            }
        };
        
        return sitemap;
    }
}

// Initialize SEO optimizer when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.seoOptimizer = new SEOOptimizer();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SEOOptimizer;
}
