// AM Herkut - Advanced Analytics & Tracking
// Optimized for maximum conversions and SEO insights

class AnalyticsManager {
    constructor() {
        this.config = {
            googleAnalytics: 'GA_MEASUREMENT_ID',
            facebookPixel: 'FB_PIXEL_ID',
            hotjar: 'HOTJAR_ID',
            googleTagManager: 'GTM_ID'
        };
        this.init();
    }

    init() {
        this.loadGoogleAnalytics();
        this.loadFacebookPixel();
        this.setupEventTracking();
        this.setupConversionTracking();
        this.setupScrollTracking();
        this.setupFormTracking();
    }

    loadGoogleAnalytics() {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('config', this.config.googleAnalytics, {
                page_title: 'AM Herkut - #1 Leipomo Helsingissä',
                page_location: window.location.href,
                custom_map: {
                    'custom_parameter_1': 'leipomo_helsinki',
                    'custom_parameter_2': 'hakaniemen_halli',
                    'custom_parameter_3': 'nora_kammah'
                }
            });
        }
    }

    loadFacebookPixel() {
        // Facebook Pixel for social media optimization
        if (typeof fbq !== 'undefined') {
            fbq('init', this.config.facebookPixel);
            fbq('track', 'PageView');
        }
    }

    setupEventTracking() {
        // Track Instagram gallery interactions
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.trackEvent('gallery_interaction', {
                    item_index: index,
                    item_type: 'instagram_photo',
                    location: 'gallery_section'
                });
            });
        });

        // Track Instagram button clicks
        const instagramButtons = document.querySelectorAll('.instagram-btn, .instagram-link');
        instagramButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.trackEvent('instagram_click', {
                    button_location: button.closest('section')?.id || 'unknown',
                    button_text: button.textContent.trim()
                });
            });
        });

        // Track product card interactions
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                const productName = card.querySelector('h3')?.textContent || 'Unknown';
                this.trackEvent('product_view', {
                    product_name: productName,
                    product_index: index
                });
            });
        });

        // Track review interactions
        const reviewCards = document.querySelectorAll('.review-card');
        reviewCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                this.trackEvent('review_interaction', {
                    review_index: index,
                    review_type: 'customer_testimonial'
                });
            });
        });
    }

    setupConversionTracking() {
        // Track form submissions
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                this.trackEvent('form_submission', {
                    form_type: 'contact_form',
                    form_location: 'contact_section'
                });
            });
        }

        // Track phone number clicks
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('phone_click', {
                    phone_number: link.href.replace('tel:', ''),
                    location: link.closest('section')?.id || 'unknown'
                });
            });
        });

        // Track email clicks
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('email_click', {
                    email_address: link.href.replace('mailto:', ''),
                    location: link.closest('section')?.id || 'unknown'
                });
            });
        });
    }

    setupScrollTracking() {
        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (scrollPercent >= 25 && scrollPercent < 50) {
                    this.trackEvent('scroll_depth', { depth: '25%' });
                } else if (scrollPercent >= 50 && scrollPercent < 75) {
                    this.trackEvent('scroll_depth', { depth: '50%' });
                } else if (scrollPercent >= 75 && scrollPercent < 90) {
                    this.trackEvent('scroll_depth', { depth: '75%' });
                } else if (scrollPercent >= 90) {
                    this.trackEvent('scroll_depth', { depth: '90%' });
                }
            }
        });
    }

    setupFormTracking() {
        // Track form field interactions
        const formFields = document.querySelectorAll('input, textarea, select');
        formFields.forEach(field => {
            field.addEventListener('focus', () => {
                this.trackEvent('form_field_focus', {
                    field_name: field.name || field.id,
                    field_type: field.type
                });
            });

            field.addEventListener('blur', () => {
                this.trackEvent('form_field_blur', {
                    field_name: field.name || field.id,
                    field_type: field.type,
                    has_value: field.value.length > 0
                });
            });
        });
    }

    trackEvent(eventName, parameters = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'AM_Herkut_Website',
                event_label: parameters.location || 'unknown',
                ...parameters
            });
        }

        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, parameters);
        }

        // Console log for debugging
        console.log('Analytics Event:', eventName, parameters);
    }

    // Track specific business events
    trackBusinessEvent(eventType, details = {}) {
        const businessEvents = {
            'leipomo_visit': 'Visited bakery page',
            'instagram_engagement': 'Engaged with Instagram content',
            'product_interest': 'Showed interest in products',
            'contact_inquiry': 'Made contact inquiry',
            'phone_call': 'Called the bakery',
            'location_interest': 'Showed interest in location'
        };

        this.trackEvent(eventType, {
            business_event: businessEvents[eventType] || eventType,
            timestamp: new Date().toISOString(),
            page_url: window.location.href,
            ...details
        });
    }

    // Track SEO-related events
    trackSEOEvent(eventType, details = {}) {
        const seoEvents = {
            'keyword_search': 'Searched for specific keywords',
            'location_search': 'Searched by location',
            'product_search': 'Searched for specific products',
            'menu_view': 'Viewed menu',
            'gallery_view': 'Viewed gallery',
            'about_view': 'Viewed about section'
        };

        this.trackEvent(eventType, {
            seo_event: seoEvents[eventType] || eventType,
            search_term: details.search_term || 'unknown',
            ...details
        });
    }
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.analyticsManager = new AnalyticsManager();
    
    // Track page load
    window.analyticsManager.trackBusinessEvent('leipomo_visit', {
        page_type: 'homepage',
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        language: navigator.language
    });
});

// Track page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        window.analyticsManager?.trackEvent('page_hidden');
    } else {
        window.analyticsManager?.trackEvent('page_visible');
    }
});

// Track before page unload
window.addEventListener('beforeunload', function() {
    window.analyticsManager?.trackEvent('page_unload', {
        time_on_page: performance.now()
    });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyticsManager;
}
