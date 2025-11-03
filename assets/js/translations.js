// Sistema de Traducción AM Herkut
const translations = {
    es: {
        // Navegación
        'nav.home': 'Inicio',
        'nav.about': 'Nosotros',
        'nav.products': 'Productos',
        'nav.menu': 'Menú',
        'nav.contact': 'Contacto',
        'nav.gallery': 'Galería',
        'nav.order': 'Ordenar Ahora',
        
        // Hero Section
        'hero.title': 'Café Premium Artesanal',
        'hero.subtitle': 'Descubre los mejores granos de café, tostados con pasión en el corazón de Helsinki',
        'hero.btn.menu': 'Explorar Menú',
        'hero.btn.contact': 'Contáctanos',
        
        // About Section
        'about.title': 'Nuestra Historia',
        'about.text1': 'Nuestra historia comienza en las vibrantes calles de Marrakech, donde los aromas de especias, té de menta y panes tradicionales llenan el aire. Inspirados por las tradiciones artesanales marroquíes de los zocos, trajimos a Helsinki la autenticidad y pasión por los productos caseros y de calidad.',
        'about.text2': 'AM Herkut nació del deseo de fusionar las técnicas tradicionales de panadería marroquí con los mejores ingredientes finlandeses. Cada croissant, cada pan y cada pastel lleva consigo las recetas heredadas de generaciones, combinadas con harina local, mantequilla finlandesa y frutas orgánicas de la región.',
        
        // Products Section
        'products.title': 'Nuestro Menú Completo',
        'products.subtitle': 'Explora todos nuestros productos. Cada bebida y producto es una obra de arte, preparada con pasión y los mejores ingredientes',
        'products.count': 'fotos de productos',
        
        // Locations Section
        'locations.title': 'Nuestras Ubicaciones',
        'locations.subtitle': 'Visítanos en Helsinki',
        'locations.hakaniemet.name': 'Hakaniemet Myymalá',
        'locations.hakaniemet.address': 'Hämeentie 1a, 00530 Helsinki, Finland',
        'locations.hakaniemet.hours': 'Lun - Sáb: 08:00 - 18:00 | Domingo: Cerrado',
        'locations.leipomo.name': 'Leipomo & Kahvilla',
        'locations.leipomo.address': 'Niittylänpolku 7, 00630 Helsinki, Finland',
        'locations.leipomo.hours': 'Lun - Sáb: 08:00 - 18:00 | Domingo: Cerrado',
        'locations.gallery': 'Galería',
        'locations.gallery.videos': 'Galería de videos próximamente',
        
        // Contact
        'contact.title': 'Contacto',
        'contact.subtitle': 'Estamos aquí para ti',
        'contact.phone': 'Teléfono',
        'contact.email': 'Email',
        'contact.visit': 'Visítanos',
        'contact.hours': 'Horario',
        
        // Footer
        'footer.follow': 'Síguenos',
        'footer.copyright': '© 2024 AM Herkut. Todos los derechos reservados.'
    },
    
    fi: {
        // Navegación
        'nav.home': 'Koti',
        'nav.about': 'Tietoa',
        'nav.products': 'Tuotteet',
        'nav.menu': 'Menu',
        'nav.contact': 'Yhteystiedot',
        'nav.gallery': 'Galleria',
        
        // Hero Section
        'hero.title': 'AM Herkut - #1 Leipomo Helsingissä',
        'hero.subtitle': 'Marokkolais-mediterraaninen leipomo Hakaniemen Hallissa',
        'hero.description': 'Tervetuloa AM Herkut -leipomoon! Tarjoamme tuoreita, perinteisiä marokkolaisia ja mediterraanisia leipä- ja leivonnaistuotteita Helsingin sydämessä. Nora Kammah perusti leipomon vuonna 2024 tuomaan ainutlaatuisia maut Hakaniemen Halliin.',
        'hero.cta': 'Tutustu Tuotteisiin',
        'hero.instagram': 'Seuraa Instagramissa',
        
        // About Section
        'about.title': 'Tietoa AM Herkut',
        'about.subtitle': 'Perinteitä ja Innovatiivisuutta',
        'about.description': 'AM Herkut on marokkolais-mediterraaninen leipomo, joka yhdistää perinteiset reseptit moderniin leipomotekniikkaan. Nora Kammah, perustaja ja pääleipuri, tuo mukanaan vuosien kokemuksen autenttisista marokkolaisista ja mediterraanisista leipä- ja leivonnaistuotteista.',
        
        // Features
        'feature.fresh.title': 'Tuoreet Ainekset',
        'feature.fresh.desc': 'Käytämme vain parhaita, tuoreimpia aineksia',
        'feature.traditional.title': 'Perinteiset Reseptit',
        'feature.traditional.desc': 'Autenttiset marokkolaiset ja mediterraaniset reseptit',
        'feature.quality.title': 'Korkea Laatu',
        'feature.quality.desc': 'Jokainen tuote tehdään huolella ja rakkaudella',
        
        // Products Section
        'products.title': 'Meidän Tuotteet',
        'products.subtitle': 'Marokkolaisia ja Mediterraanisia Herkkuja',
        'products.khobz.title': 'Marokkolainen Khobz',
        'products.khobz.desc': 'Perinteinen marokkolainen leipä, täydellinen couscousin kanssa',
        'products.focaccia.title': 'Mediterraaninen Focaccia',
        'products.focaccia.desc': 'Italialainen focaccia, maustettu oliiviöljyllä ja rosmariinilla',
        'products.baklava.title': 'Baklava-kakku',
        'products.baklava.desc': 'Marokkolainen baklava-kakku, täytetty pähkinöillä ja hunajalla',
        
        // Menu Section
        'menu.title': 'Meidän Menu',
        'menu.subtitle': 'Tuoreet Leivonnaiset ja Leipä',
        'menu.bread.title': 'Leipä',
        'menu.bread.khobz': 'Marokkolainen Khobz',
        'menu.bread.focaccia': 'Mediterraaninen Focaccia',
        'menu.bread.ciabatta': 'Italialainen Ciabatta',
        'menu.pastries.title': 'Leivonnaiset',
        'menu.pastries.baklava': 'Baklava-kakku',
        'menu.pastries.croissant': 'Voileipäkroissantit',
        'menu.pastries.muffins': 'Marokkolaiset Muffinit',
        'menu.drinks.title': 'Juomat',
        'menu.drinks.coffee': 'Tuore Kahvi',
        'menu.drinks.tea': 'Marokkolainen Minttutee',
        'menu.drinks.juice': 'Tuoreet Mehu',
        
        // Gallery Section
        'gallery.title': 'Instagram Galleria',
        'gallery.subtitle': 'Seuraa Meitä @amherkut',
        'gallery.products.title': 'Tuotteet ja Leivonnaiset',
        'gallery.interior.title': 'Leipomon Sisätilat ja Työskentely',
        'gallery.reviews.title': 'Asiakkaiden Kokemukset ja Arvostelut',
        'gallery.cta': 'Seuraa Meitä Instagramissa!',
        'gallery.cta.desc': 'Katso uusimmat tuotteet ja päivittäiset tarjoukset',
        'gallery.cta.button': 'Seuraa @amherkut',
        
        // Contact Section
        'contact.title': 'Yhteystiedot',
        'contact.subtitle': 'Tule Vierailemaan Meidän Leipomoon',
        'contact.address': 'Osoite',
        'contact.address.value': 'Hämeentie 1a, 00530 Helsinki',
        'contact.phone': 'Puhelin',
        'contact.phone.value': '+358 40 123 4567',
        'contact.email': 'Sähköposti',
        'contact.email.value': 'info@amherkut.fi',
        'contact.hours': 'Aukioloajat',
        'contact.hours.value': 'Ma-Pe: 7:00-18:00, La: 8:00-16:00, Su: Suljettu',
        'contact.form.title': 'Lähetä Viesti',
        'contact.form.name': 'Nimi',
        'contact.form.email': 'Sähköposti',
        'contact.form.phone': 'Puhelin',
        'contact.form.subject': 'Aihe',
        'contact.form.message': 'Viesti',
        'contact.form.newsletter': 'Haluan vastaanottaa uutiskirjeen',
        'contact.form.privacy': 'Hyväksyn tietosuojakäytännöt',
        'contact.form.send': 'Lähetä Viesti',
        
        // Footer
        'footer.description': 'Marokkolais-mediterraaninen leipomo Helsingissä. Yhdistämme perinteiset maut ainutlaatuiseen makuelämystä Hakaniemen Hallissa!',
        'footer.links': 'Linkit',
        'footer.contact': 'Yhteystiedot',
        'footer.follow': 'Seuraa Meitä',
        'footer.copyright': '© 2024 AM Herkut. Kaikki oikeudet pidätetään.',
        
        // Reviews
        'reviews.title': 'Asiakkaiden Arvostelut',
        'reviews.subtitle': 'Mitä Asiakkaamme Sanovat',
        'review1.text': 'Upeita leipä- ja leivonnaistuotteita! Nora on todellinen mestari.',
        'review1.author': 'Maria K.',
        'review2.text': 'Paras leipomo Helsingissä. Tuoreet ainekset ja loistava palvelu.',
        'review2.author': 'Jukka L.',
        'review3.text': 'Autenttiset marokkolaiset maut tuovat kodin tuntua Helsinkiin.',
        'review3.author': 'Aisha M.'
    },
    
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.products': 'Products',
        'nav.menu': 'Menu',
        'nav.contact': 'Contact',
        'nav.gallery': 'Gallery',
        
        // Hero Section
        'hero.title': 'AM Herkut - #1 Bakery in Helsinki',
        'hero.subtitle': 'Moroccan-Mediterranean Bakery in Hakaniemi Hall',
        'hero.description': 'Welcome to AM Herkut Bakery! We offer fresh, traditional Moroccan and Mediterranean bread and pastry products in the heart of Helsinki. Nora Kammah founded the bakery in 2024 to bring unique flavors to Hakaniemi Hall.',
        'hero.cta': 'Explore Products',
        'hero.instagram': 'Follow on Instagram',
        
        // About Section
        'about.title': 'About AM Herkut',
        'about.subtitle': 'Tradition and Innovation',
        'about.description': 'AM Herkut is a Moroccan-Mediterranean bakery that combines traditional recipes with modern baking techniques. Nora Kammah, founder and head baker, brings years of experience in authentic Moroccan and Mediterranean bread and pastry products.',
        
        // Features
        'feature.fresh.title': 'Fresh Ingredients',
        'feature.fresh.desc': 'We use only the best, freshest ingredients',
        'feature.traditional.title': 'Traditional Recipes',
        'feature.traditional.desc': 'Authentic Moroccan and Mediterranean recipes',
        'feature.quality.title': 'High Quality',
        'feature.quality.desc': 'Every product is made with care and love',
        
        // Products Section
        'products.title': 'Our Products',
        'products.subtitle': 'Moroccan and Mediterranean Delicacies',
        'products.khobz.title': 'Moroccan Khobz',
        'products.khobz.desc': 'Traditional Moroccan bread, perfect with couscous',
        'products.focaccia.title': 'Mediterranean Focaccia',
        'products.focaccia.desc': 'Italian focaccia, seasoned with olive oil and rosemary',
        'products.baklava.title': 'Baklava Cake',
        'products.baklava.desc': 'Moroccan baklava cake, filled with nuts and honey',
        
        // Menu Section
        'menu.title': 'Our Menu',
        'menu.subtitle': 'Fresh Pastries and Bread',
        'menu.bread.title': 'Bread',
        'menu.bread.khobz': 'Moroccan Khobz',
        'menu.bread.focaccia': 'Mediterranean Focaccia',
        'menu.bread.ciabatta': 'Italian Ciabatta',
        'menu.pastries.title': 'Pastries',
        'menu.pastries.baklava': 'Baklava Cake',
        'menu.pastries.croissant': 'Butter Croissants',
        'menu.pastries.muffins': 'Moroccan Muffins',
        'menu.drinks.title': 'Drinks',
        'menu.drinks.coffee': 'Fresh Coffee',
        'menu.drinks.tea': 'Moroccan Mint Tea',
        'menu.drinks.juice': 'Fresh Juices',
        
        // Gallery Section
        'gallery.title': 'Instagram Gallery',
        'gallery.subtitle': 'Follow Us @amherkut',
        'gallery.products.title': 'Products and Pastries',
        'gallery.interior.title': 'Bakery Interior and Work',
        'gallery.reviews.title': 'Customer Experiences and Reviews',
        'gallery.cta': 'Follow Us on Instagram!',
        'gallery.cta.desc': 'See latest products and daily offers',
        'gallery.cta.button': 'Follow @amherkut',
        
        // Contact Section
        'contact.title': 'Contact Us',
        'contact.subtitle': 'Visit Our Bakery',
        'contact.address': 'Address',
        'contact.address.value': 'Hämeentie 1a, 00530 Helsinki',
        'contact.phone': 'Phone',
        'contact.phone.value': '+358 40 123 4567',
        'contact.email': 'Email',
        'contact.email.value': 'info@amherkut.fi',
        'contact.hours': 'Opening Hours',
        'contact.hours.value': 'Mon-Fri: 7:00-18:00, Sat: 8:00-16:00, Sun: Closed',
        'contact.form.title': 'Send Message',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.phone': 'Phone',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Message',
        'contact.form.newsletter': 'I want to receive newsletter',
        'contact.form.privacy': 'I accept privacy policy',
        'contact.form.send': 'Send Message',
        
        // Footer
        'footer.description': 'Moroccan-Mediterranean bakery in Helsinki. We combine traditional flavors with unique taste experiences at Hakaniemi Hall!',
        'footer.links': 'Links',
        'footer.contact': 'Contact',
        'footer.follow': 'Follow Us',
        'footer.copyright': '© 2024 AM Herkut. All rights reserved.',
        
        // Reviews
        'reviews.title': 'Customer Reviews',
        'reviews.subtitle': 'What Our Customers Say',
        'review1.text': 'Amazing bread and pastry products! Nora is a true master.',
        'review1.author': 'Maria K.',
        'review2.text': 'Best bakery in Helsinki. Fresh ingredients and excellent service.',
        'review2.author': 'Jukka L.',
        'review3.text': 'Authentic Moroccan flavors bring home feeling to Helsinki.',
        'review3.author': 'Aisha M.'
    },
    
    sv: {
        // Navigation
        'nav.home': 'Hem',
        'nav.about': 'Om Oss',
        'nav.products': 'Produkter',
        'nav.menu': 'Meny',
        'nav.contact': 'Kontakt',
        'nav.gallery': 'Galleri',
        
        // Hero Section
        'hero.title': 'AM Herkut - #1 Bageri i Helsingfors',
        'hero.subtitle': 'Marockansk-medelhavs bageri i Hakaniemi Hall',
        'hero.description': 'Välkommen till AM Herkut Bageri! Vi erbjuder färska, traditionella marockanska och medelhavs bröd- och bakverk i hjärtat av Helsingfors. Nora Kammah grundade bageriet 2024 för att ta unika smaker till Hakaniemi Hall.',
        'hero.cta': 'Utforska Produkter',
        'hero.instagram': 'Följ på Instagram',
        
        // About Section
        'about.title': 'Om AM Herkut',
        'about.subtitle': 'Tradition och Innovation',
        'about.description': 'AM Herkut är en marockansk-medelhavs bageri som kombinerar traditionella recept med modern bakteknik. Nora Kammah, grundare och huvudbagare, tar med sig års erfarenhet av autentiska marockanska och medelhavs bröd- och bakverk.',
        
        // Features
        'feature.fresh.title': 'Färska Ingredienser',
        'feature.fresh.desc': 'Vi använder bara de bästa, färskaste ingredienserna',
        'feature.traditional.title': 'Traditionella Recept',
        'feature.traditional.desc': 'Autentiska marockanska och medelhavs recept',
        'feature.quality.title': 'Hög Kvalitet',
        'feature.quality.desc': 'Varje produkt görs med omsorg och kärlek',
        
        // Products Section
        'products.title': 'Våra Produkter',
        'products.subtitle': 'Marockanska och Medelhavs Delikatesser',
        'products.khobz.title': 'Marockansk Khobz',
        'products.khobz.desc': 'Traditionellt marockanskt bröd, perfekt med couscous',
        'products.focaccia.title': 'Medelhavs Focaccia',
        'products.focaccia.desc': 'Italiensk focaccia, kryddad med olivolja och rosmarin',
        'products.baklava.title': 'Baklava Kaka',
        'products.baklava.desc': 'Marockansk baklava kaka, fylld med nötter och honung',
        
        // Menu Section
        'menu.title': 'Vår Meny',
        'menu.subtitle': 'Färska Bakverk och Bröd',
        'menu.bread.title': 'Bröd',
        'menu.bread.khobz': 'Marockansk Khobz',
        'menu.bread.focaccia': 'Medelhavs Focaccia',
        'menu.bread.ciabatta': 'Italiensk Ciabatta',
        'menu.pastries.title': 'Bakverk',
        'menu.pastries.baklava': 'Baklava Kaka',
        'menu.pastries.croissant': 'Smör Croissanter',
        'menu.pastries.muffins': 'Marockanska Muffins',
        'menu.drinks.title': 'Drycker',
        'menu.drinks.coffee': 'Färskt Kaffe',
        'menu.drinks.tea': 'Marockanskt Mynta Te',
        'menu.drinks.juice': 'Färska Juicer',
        
        // Gallery Section
        'gallery.title': 'Instagram Galleri',
        'gallery.subtitle': 'Följ Oss @amherkut',
        'gallery.products.title': 'Produkter och Bakverk',
        'gallery.interior.title': 'Bageri Interiör och Arbete',
        'gallery.reviews.title': 'Kundupplevelser och Recensioner',
        'gallery.cta': 'Följ Oss på Instagram!',
        'gallery.cta.desc': 'Se senaste produkter och dagliga erbjudanden',
        'gallery.cta.button': 'Följ @amherkut',
        
        // Contact Section
        'contact.title': 'Kontakta Oss',
        'contact.subtitle': 'Besök Vårt Bageri',
        'contact.address': 'Adress',
        'contact.address.value': 'Hämeentie 1a, 00530 Helsingfors',
        'contact.phone': 'Telefon',
        'contact.phone.value': '+358 40 123 4567',
        'contact.email': 'E-post',
        'contact.email.value': 'info@amherkut.fi',
        'contact.hours': 'Öppettider',
        'contact.hours.value': 'Mån-Fre: 7:00-18:00, Lör: 8:00-16:00, Sön: Stängt',
        'contact.form.title': 'Skicka Meddelande',
        'contact.form.name': 'Namn',
        'contact.form.email': 'E-post',
        'contact.form.phone': 'Telefon',
        'contact.form.subject': 'Ämne',
        'contact.form.message': 'Meddelande',
        'contact.form.newsletter': 'Jag vill ta emot nyhetsbrev',
        'contact.form.privacy': 'Jag accepterar integritetspolicy',
        'contact.form.send': 'Skicka Meddelande',
        
        // Footer
        'footer.description': 'Marockansk-medelhavs bageri i Helsingfors. Vi kombinerar traditionella smaker med unika smakupplevelser på Hakaniemi Hall!',
        'footer.links': 'Länkar',
        'footer.contact': 'Kontakt',
        'footer.follow': 'Följ Oss',
        'footer.copyright': '© 2024 AM Herkut. Alla rättigheter förbehållna.',
        
        // Reviews
        'reviews.title': 'Kundrecensioner',
        'reviews.subtitle': 'Vad Våra Kunder Säger',
        'review1.text': 'Fantastiska bröd- och bakverk! Nora är en sann mästare.',
        'review1.author': 'Maria K.',
        'review2.text': 'Bästa bageriet i Helsingfors. Färska ingredienser och utmärkt service.',
        'review2.author': 'Jukka L.',
        'review3.text': 'Autentiska marockanska smaker för hemkänsla till Helsingfors.',
        'review3.author': 'Aisha M.'
    }
};

// Sistema de traducción
class TranslationSystem {
    constructor() {
        this.currentLanguage = 'fi'; // Idioma por defecto: finlandés
        this.init();
    }
    
    init() {
        // Cargar idioma guardado o usar finlandés por defecto
        const savedLanguage = localStorage.getItem('amherkut-language');
        if (savedLanguage && translations[savedLanguage]) {
            this.currentLanguage = savedLanguage;
        }
        
        // Aplicar traducciones al cargar
        this.translatePage();
        
        // Crear botón de idioma
        this.createLanguageButton();
    }
    
    createLanguageButton() {
        // Crear contenedor de idiomas
        const languageContainer = document.createElement('div');
        languageContainer.className = 'language-selector';
        languageContainer.innerHTML = `
            <div class="language-dropdown">
                <button class="language-btn" id="language-btn">
                    <span class="flag">🇫🇮</span>
                    <span class="lang-text">FI</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="language-menu" id="language-menu">
                    <div class="language-option" data-lang="es">
                        <span class="flag">🇪🇸</span>
                        <span>Español</span>
                    </div>
                    <div class="language-option" data-lang="en">
                        <span class="flag">🇬🇧</span>
                        <span>English</span>
                    </div>
                    <div class="language-option" data-lang="fi">
                        <span class="flag">🇫🇮</span>
                        <span>Suomi</span>
                    </div>
                    <div class="language-option" data-lang="sv">
                        <span class="flag">🇸🇪</span>
                        <span>Svenska</span>
                    </div>
                </div>
            </div>
        `;
        
        // Insertar en la navegación
        const navContainer = document.querySelector('.nav-container');
        navContainer.appendChild(languageContainer);
        
        // Agregar eventos
        this.addLanguageEvents();
    }
    
    addLanguageEvents() {
        const languageBtn = document.getElementById('language-btn');
        const languageMenu = document.getElementById('language-menu');
        const languageOptions = document.querySelectorAll('.language-option');
        
        // Toggle menú
        languageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            languageMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', () => {
            languageMenu.classList.remove('active');
        });
        
        // Cambiar idioma
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const newLang = e.currentTarget.dataset.lang;
                this.changeLanguage(newLang);
                languageMenu.classList.remove('active');
            });
        });
    }
    
    changeLanguage(lang) {
        if (translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('amherkut-language', lang);
            this.translatePage();
            this.updateLanguageButton();
        }
    }
    
    updateLanguageButton() {
        const languageBtn = document.getElementById('language-btn');
        const flag = languageBtn.querySelector('.flag');
        const langText = languageBtn.querySelector('.lang-text');
        
        const flags = {
            'es': '🇪🇸',
            'en': '🇬🇧',
            'fi': '🇫🇮',
            'sv': '🇸🇪'
        };
        
        const codes = {
            'es': 'ES',
            'en': 'EN',
            'fi': 'FI',
            'sv': 'SV'
        };
        
        flag.textContent = flags[this.currentLanguage];
        langText.textContent = codes[this.currentLanguage];
    }
    
    translatePage() {
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else if (element.tagName === 'INPUT' && element.type === 'email') {
                    element.placeholder = translation;
                } else if (element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }
    
    getTranslation(key) {
        return translations[this.currentLanguage][key] || key;
    }
}

// Inicializar sistema de traducción cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new TranslationSystem();
});