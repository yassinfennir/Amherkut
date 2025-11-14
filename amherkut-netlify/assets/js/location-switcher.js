// Location Switcher for AM Herkut
class LocationSwitcher {
    constructor() {
        this.currentLocation = 'hakaniemi';
        this.locations = {
            hakaniemi: {
                name: 'Hakaniemi Halli',
                address: 'Hämeentie 1a, 00530 Helsinki, Suomi',
                mapUrl: 'https://www.google.com/maps?q=Am+herkut+hakaniemen+myym%C3%A4l%C3%A4,+H%C3%A4meentie+1a,+00530+Helsinki',
                phone: '+358 50 405 9862',
                email: 'larakimo@hotmail.com',
                hours: 'Ma-Pe: 06:00-18:00\nLa: 07:00-16:00\nSu: 08:00-15:00'
            },
            hakaniemi2: {
                name: 'Hakaniemen Myymälä',
                address: 'Helsinki, Suomi',
                mapUrl: 'https://www.google.com/maps/search/AMHERKUT+HAKANIEMEN+MYYM%C3%84L%C3%84',
                phone: '+358 50 405 9862',
                email: 'larakimo@hotmail.com',
                hours: 'Ma-Pe: 06:00-18:00\nLa: 07:00-16:00\nSu: 08:00-15:00'
            }
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadLocation();
    }
    
    bindEvents() {
        // Navigation dropdown
        const locationBtn = document.getElementById('location-btn');
        const locationMenu = document.getElementById('location-menu');
        const locationOptions = document.querySelectorAll('.location-option');
        
        if (locationBtn && locationMenu) {
            locationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleLocationMenu();
            });
        }
        
        locationOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const location = option.getAttribute('data-location');
                this.changeLocation(location);
                this.closeLocationMenu();
            });
        });
        
        // Contact section tabs
        const locationTabs = document.querySelectorAll('.location-tab');
        locationTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const location = tab.getAttribute('data-location');
                this.changeLocation(location);
                this.updateContactTabs(location);
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', () => {
            this.closeLocationMenu();
        });
    }
    
    toggleLocationMenu() {
        const dropdown = document.querySelector('.location-dropdown');
        dropdown.classList.toggle('active');
    }
    
    closeLocationMenu() {
        const dropdown = document.querySelector('.location-dropdown');
        dropdown.classList.remove('active');
    }
    
    changeLocation(location) {
        this.currentLocation = location;
        this.updateLocationButton();
        this.updateContactInfo();
        this.updateMaps();
        localStorage.setItem('amherkut-location', location);
    }
    
    loadLocation() {
        const savedLocation = localStorage.getItem('amherkut-location');
        if (savedLocation && this.locations[savedLocation]) {
            this.currentLocation = savedLocation;
        }
        this.updateLocationButton();
        this.updateContactInfo();
        this.updateMaps();
        this.updateContactTabs(this.currentLocation);
    }
    
    updateLocationButton() {
        const currentLocationSpan = document.getElementById('current-location');
        if (currentLocationSpan) {
            const locationName = this.locations[this.currentLocation].name;
            currentLocationSpan.textContent = locationName.includes('Hakaniemi') ? 'Hakaniemi' : locationName;
        }
    }
    
    updateContactTabs(activeLocation) {
        const tabs = document.querySelectorAll('.location-tab');
        const locationInfos = document.querySelectorAll('.location-info');
        
        tabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-location') === activeLocation) {
                tab.classList.add('active');
            }
        });
        
        locationInfos.forEach(info => {
            info.style.display = 'none';
            if (info.id === `location-${activeLocation}`) {
                info.style.display = 'block';
            }
        });
    }
    
    updateContactInfo() {
        const location = this.locations[this.currentLocation];
        
        // Update contact cards
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach(card => {
            const addressElement = card.querySelector('.contact-details h4');
            const phoneElement = card.querySelector('.contact-details p a[href^="tel:"]');
            const emailElement = card.querySelector('.contact-details p a[href^="mailto:"]');
            
            if (addressElement && addressElement.textContent.includes('Osoite')) {
                const addressP = addressElement.nextElementSibling;
                if (addressP) {
                    addressP.innerHTML = location.address.replace('\n', '<br>');
                }
            }
            
            if (phoneElement) {
                phoneElement.href = `tel:${location.phone}`;
                phoneElement.textContent = location.phone;
            }
            
            if (emailElement) {
                emailElement.href = `mailto:${location.email}`;
                emailElement.textContent = location.email;
            }
        });
    }
    
    updateMaps() {
        const location = this.locations[this.currentLocation];
        
        // Update map iframe
        const mapIframe = document.querySelector('.map-container iframe');
        if (mapIframe) {
            mapIframe.src = location.mapUrl;
        }
        
        // Update map links
        const mapLinks = document.querySelectorAll('.map-link');
        mapLinks.forEach(link => {
            link.href = location.mapUrl;
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LocationSwitcher();
});
