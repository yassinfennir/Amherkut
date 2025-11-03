/**
 * SISTEMA DE TRADUCCIÓN MULTIIDIOMA
 * Amherkut - ES/EN/FI/SV
 */

const TRANSLATIONS = {
    es: {
        // Navegación
        'nav.home': 'Inicio',
        'nav.products': 'Productos',
        'nav.about': 'Nosotros',
        'nav.contact': 'Contacto',
        'nav.cart': 'Carrito',
        'nav.wishlist': 'Favoritos',
        'nav.order': 'Ordenar Ahora',
        
        // Hero
        'hero.title': 'Café Premium Artesanal',
        'hero.subtitle': 'Descubre los mejores granos de café, tostados con pasión en el corazón de Helsinki',
        'hero.btn.explore': 'Explorar Menú',
        'hero.btn.contact': 'Contáctanos',
        
        // About
        'about.title': 'Nuestra Historia',
        'about.text1': 'Nuestra historia comienza en las vibrantes calles de Marrakech, donde los aromas de especias, té de menta y panes tradicionales llenan el aire. Inspirados por las tradiciones artesanales marroquíes de los zocos, trajimos a Helsinki la autenticidad y pasión por los productos caseros y de calidad.',
        'about.text2': 'AM Herkut nació del deseo de fusionar las técnicas tradicionales de panadería marroquí con los mejores ingredientes finlandeses. Cada croissant, cada pan y cada pastel lleva consigo las recetas heredadas de generaciones, combinadas con harina local, mantequilla finlandesa y frutas orgánicas de la región.',
        
        // Products
        'products.title': 'Nuestro Menú Completo',
        'products.subtitle': 'Explora todos nuestros productos. Cada bebida y producto es una obra de arte, preparada con pasión y los mejores ingredientes',
        'products.count': 'fotos de productos',
        
        // Locations
        'locations.title': 'Nuestras Ubicaciones',
        'locations.hakaniemet': 'Hakaniemet Myymalá',
        'locations.leipomo': 'Leipomo & Kahvilla',
        'locations.hours': 'Horario',
        'locations.gallery': 'Galería',
        
        // Footer
        'footer.follow': 'Síguenos',
        'footer.rights': '© 2024 AM Herkut. Todos los derechos reservados.'
    },
    
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.products': 'Products',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.cart': 'Cart',
        'nav.wishlist': 'Wishlist',
        'nav.order': 'Order Now',
        
        // Hero
        'hero.title': 'Premium Artisan Coffee',
        'hero.subtitle': 'Discover the best coffee beans, roasted with passion in the heart of Helsinki',
        'hero.btn.explore': 'Explore Menu',
        'hero.btn.contact': 'Contact Us',
        
        // About
        'about.title': 'Our Story',
        'about.text1': 'Our story begins in the vibrant streets of Marrakech, where the aromas of spices, mint tea and traditional breads fill the air. Inspired by the artisan traditions of Moroccan souks, we brought to Helsinki the authenticity and passion for homemade quality products.',
        'about.text2': 'AM Herkut was born from the desire to fuse traditional Moroccan bakery techniques with the finest Finnish ingredients. Each croissant, each bread and each cake carries inherited recipes from generations, combined with local flour, Finnish butter and organic fruits from the region.',
        
        // Products
        'products.title': 'Our Complete Menu',
        'products.subtitle': 'Explore all our products. Each drink and product is a work of art, prepared with passion and the best ingredients',
        'products.count': 'product photos',
        
        // Locations
        'locations.title': 'Our Locations',
        'locations.hakaniemet': 'Hakaniemet Store',
        'locations.leipomo': 'Bakery & Café',
        'locations.hours': 'Hours',
        'locations.gallery': 'Gallery',
        
        // Footer
        'footer.follow': 'Follow Us',
        'footer.rights': '© 2024 AM Herkut. All rights reserved.'
    },
    
    fi: {
        // Navigointi
        'nav.home': 'Etusivu',
        'nav.products': 'Tuotteet',
        'nav.about': 'Meistä',
        'nav.contact': 'Yhteystiedot',
        'nav.cart': 'Ostoskori',
        'nav.wishlist': 'Suosikit',
        'nav.order': 'Tilaa Nyt',
        
        // Hero
        'hero.title': 'Premium Käsityökahvi',
        'hero.subtitle': 'Löydä parhaat kahvipavut, paahdettu intohimolla Helsingin sydämessä',
        'hero.btn.explore': 'Tutustu Menuun',
        'hero.btn.contact': 'Ota Yhteyttä',
        
        // About
        'about.title': 'Meidän Tarina',
        'about.text1': 'Tarinämme alkaa Marrakeshin eloisilta kaduilta, joilla mausteiden, minttuteen ja perinteisten leipien tuoksu täyttää ilman. Marokon sukien käsityöperinteiden inspiroima, toimmme Helsinkiin aitouden ja intohimon kotitekoisiin laatutuotteisiin.',
        'about.text2': 'AM Herkut syntyi halusta yhdistää perinteiset marokkolaiset leipomotekniikka parhaisiin suomalaisiin raaka-aineisiin. Jokainen croissant, jokainen leipä ja jokainen kakku kantaa mukanaan sukupolvien reseptejä, yhdistettynä paikalliseen jauhoon, suomalaiseen voihin ja alueen luomuhedelmiin.',
        
        // Products
        'products.title': 'Koko Valikoimamme',
        'products.subtitle': 'Tutustu kaikkiin tuotteisiimme. Jokainen juoma ja tuote on taideteos, valmistettu intohimolla ja parhaista raaka-aineista',
        'products.count': 'tuotekuvaa',
        
        // Locations
        'locations.title': 'Toimipisteet',
        'locations.hakaniemet': 'Hakaniemen Myymälä',
        'locations.leipomo': 'Leipomo & Kahvila',
        'locations.hours': 'Aukioloajat',
        'locations.gallery': 'Galleria',
        
        // Footer
        'footer.follow': 'Seuraa Meitä',
        'footer.rights': '© 2024 AM Herkut. Kaikki oikeudet pidätetään.'
    },
    
    sv: {
        // Navigation
        'nav.home': 'Hem',
        'nav.products': 'Produkter',
        'nav.about': 'Om Oss',
        'nav.contact': 'Kontakt',
        'nav.cart': 'Varukorg',
        'nav.wishlist': 'Favoriter',
        'nav.order': 'Beställ Nu',
        
        // Hero
        'hero.title': 'Premium Hantverkskaffe',
        'hero.subtitle': 'Upptäck de bästa kaffebönorna, rostade med passion i hjärtat av Helsingfors',
        'hero.btn.explore': 'Utforska Menyn',
        'hero.btn.contact': 'Kontakta Oss',
        
        // About
        'about.title': 'Vår Berättelse',
        'about.text1': 'Vår berättelse börjar på Marrakechs livliga gator, där dofterna av kryddor, mynta te och traditionella bröd fyller luften. Inspirerade av de hantverkstraditioner från marockanska soukerna, tog vi till Helsingfors autenticiteten och passionen för hemgjorda kvalitetsprodukter.',
        'about.text2': 'AM Herkut föddes ur önskan att fusionera traditionella marockanska bageritek niker med de finaste finska ingredienserna. Varje croissant, varje bröd och varje kaka bär med sig ärvda recept från generationer, kombinerade med lokalt mjöl, finskt smör och ekologiska frukter från regionen.',
        
        // Products
        'products.title': 'Vår Kompletta Meny',
        'products.subtitle': 'Utforska alla våra produkter. Varje dryck och produkt är ett konstverk, förberett med passion och de bästa ingredienserna',
        'products.count': 'produktfoton',
        
        // Locations
        'locations.title': 'Våra Platser',
        'locations.hakaniemet': 'Hakaniemi Butik',
        'locations.leipomo': 'Bageri & Kafé',
        'locations.hours': 'Öppettider',
        'locations.gallery': 'Galleri',
        
        // Footer
        'footer.follow': 'Följ Oss',
        'footer.rights': '© 2024 AM Herkut. Alla rättigheter förbehållna.'
    }
};

// Inicializar sistema de idiomas
let currentLang = localStorage.getItem('amherkut-lang') || 'fi';

function setLanguage(lang) {
    if (TRANSLATIONS[lang]) {
        currentLang = lang;
        localStorage.setItem('amherkut-lang', lang);
        translatePage();
        updateLanguageButton();
    }
}

function translatePage() {
    // Traducir todos los elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = TRANSLATIONS[currentLang][key];
        
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
}

function updateLanguageButton() {
    const langButton = document.querySelector('.lang-current');
    if (langButton) {
        const flags = { es: '🇪🇸', en: '🇬🇧', fi: '🇫🇮', sv: '🇸🇪' };
        const codes = { es: 'ES', en: 'EN', fi: 'FI', sv: 'SV' };
        langButton.innerHTML = `<span class="flag">${flags[currentLang]}</span> ${codes[currentLang]}`;
    }
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
    translatePage();
    updateLanguageButton();
    
    // Event listeners para cambio de idioma
    document.querySelectorAll('[data-lang]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = button.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
});

