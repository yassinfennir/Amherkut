// Language Switcher for AM Herkut
class LanguageSwitcher {
    constructor() {
        this.currentLang = 'es';
        this.translations = {
            es: {
                // Navigation
                'nav.home': 'Inicio',
                'nav.about': 'Nosotros',
                'nav.products': 'Productos',
                'nav.menu': 'Menú',
                'nav.contact': 'Contacto',
                'nav.order': 'Ordenar Ahora',
                'nav.instagram': 'Instagram',
                
                // Hero Section
                'hero.title': 'Amherkut',
                'hero.subtitle': 'SABORES QUE CUENTAN HISTORIAS',
                'hero.description': 'Adéntrate en un mundo de sabores donde la tradición marroquí se encuentra con la pasión finlandesa. Experimenta la calidez y autenticidad de nuestra panadería artesanal – cada bocado está elaborado con amor y cuidado, usando solo los mejores ingredientes naturales. Disfruta momentos llenos de tradición y nuevas experiencias.',
                'hero.btn1': 'Explora Nuestra Selección',
                'hero.btn2': 'Ordenar Ahora',
                
                // About Section
                'about.title': 'NUESTRA HISTORIA: DOS CULTURAS, UNA PASIÓN',
                'about.subtitle': 'Bienvenido a descubrir la historia de Amherkut, que comenzó con un sueño de unir dos mundos – el sol de Marruecos y la naturaleza de Finlandia.',
                'about.subtitle2': 'Tradición y Amor en la Panadería',
                'about.text1': 'Amherkut nació de la pasión por la cocina marroquí y el amor por las tradiciones panaderas finlandesas. Nuestra fundadora, con raíces en Marruecos y corazón en Finlandia, quería unir lo mejor de ambos países. En diciembre de 2020 abrimos nuestras puertas en Hakaniemi Hall, y desde entonces hemos podido compartir nuestra historia y sabores contigo.',
                'about.text2': 'Creemos que el pan es más que solo comida – es comunidad, calidez y momentos compartidos. Por eso elaboramos cada producto a mano, usando solo los mejores ingredientes naturales. Queremos ofrecerte experiencias de sabor que no solo nutren, sino que también inspiran y traen alegría a tu día.',
                'about.feature1': 'Solo los mejores ingredientes',
                'about.feature2': 'Hecho a mano con amor',
                'about.feature3': 'Comunidad y momentos compartidos',
                
                // Products Section
                'products.title': 'NUESTROS PRODUCTOS: DELICIAS ARTESANALES',
                'products.subtitle': 'Cada producto está hecho con cuidado y pasión, usando solo los mejores ingredientes. ¡Explora nuestra selección y encuentra tus favoritos!',
                
                // Reviews Section
                'reviews.title': 'Reseñas de Clientes',
                'reviews.subtitle': 'Lo que nos hace especiales',
                
                // Gallery Section
                'gallery.title': 'Historias de Instagram - Contenido Diario',
                'gallery.subtitle': '¡Síguenos @amherkut para ver historias diarias y los últimos productos!',
                
                // Menu Section
                'menu.title': 'Menú Completo',
                'menu.subtitle': 'Navega por nuestra selección completa',
                
                // Order Section
                'order.title': 'Ordenar Ahora',
                'order.subtitle': 'Pedido fácil y rápido',
                
                // Contact Section
                'contact.title': 'Contáctanos',
                'contact.subtitle': 'Envíanos un mensaje o visita nuestra panadería'
            },
            fi: {
                // Navigation
                'nav.home': 'Koti',
                'nav.about': 'Tietoa meistä',
                'nav.products': 'Tuotteet',
                'nav.menu': 'Menu',
                'nav.contact': 'Yhteystiedot',
                'nav.order': 'Tilaa nyt',
                'nav.instagram': 'Instagram',
                
                // Hero Section
                'hero.title': 'Amherkut',
                'hero.subtitle': 'MAKUJA, JOTKA KERTovat TARINAA',
                'hero.description': 'Astu sisään makujen maailmaan, jossa marokkolainen perinne ja suomalainen intohimo kohtaavat. Koe artesaanileipomomme lämpö ja aitous – jokainen suupala on valmistettu rakkaudella ja huolella, käyttäen vain parhaita luonnonmukaisia raaka-aineita. Nauti hetkestä, joka on täynnä perinteitä ja uusia elämyksiä.',
                'hero.btn1': 'Tutustu Valikoimaan',
                'hero.btn2': 'Tilaa Nyt',
                
                // About Section
                'about.title': 'TARINAMME: KAKSI KULTTUURIA, YKSI INTOHIMO',
                'about.subtitle': 'Lämpimästi tervetuloa tutustumaan Amherkutin tarinaan, joka alkoi unelmasta yhdistää kaksi maailmaa – Marokon auringon ja Suomen luonnon.',
                'about.subtitle2': 'Perinteitä ja Rakkautta Leivontaan',
                'about.text1': 'Amherkut syntyi intohimosta marokkolaiseen ruokakulttuuriin ja rakkaudesta suomalaiseen leipomoperinteeseen. Perustajamme, jolla on juuret Marokossa ja sydän Suomessa, halusi tuoda yhteen näiden kahden maan parhaat puolet. Joulukuussa 2020 avasimme ovemme Hakaniemen Hallissa, ja siitä lähtien olemme saaneet jakaa tarinaamme ja makujamme teidän kanssanne.',
                'about.text2': 'Me uskomme, että leipä on enemmän kuin vain ruokaa – se on yhteisöllisyyttä, lämpöä ja jaettuja hetkiä. Siksi valmistamme jokaisen tuotteemme käsityönä, käyttäen vain parhaita, luonnonmukaisia raaka-aineita. Haluamme tarjota teille makuelämyksiä, jotka eivät ainoastaan ravitse, vaan myös inspiroivat ja tuovat iloa päiväänne.',
                'about.feature1': 'Vain parhaita raaka-aineita',
                'about.feature2': 'Rakkaudella käsintehty',
                'about.feature3': 'Yhteisöllisyyttä ja jaettuja hetkiä',
                
                // Products Section
                'products.title': 'TUOTTEEMME: KÄSINTEHTYJÄ HERKKUJA',
                'products.subtitle': 'Jokainen tuotteemme on valmistettu huolella ja intohimolla, käyttäen vain parhaita raaka-aineita. Tutustu valikoimaamme ja löydä omat suosikkisi!',
                
                // Reviews Section
                'reviews.title': 'Asiakkaiden arvostelut',
                'reviews.subtitle': 'Mikä tekee meistä erityisiä',
                
                // Gallery Section
                'gallery.title': 'Instagram Stories - Päivittäistä Sisältöä',
                'gallery.subtitle': 'Seuraa meitä @amherkut nähdäksesi päivittäisiä tarinoita ja uusimpia tuotteita!',
                
                // Menu Section
                'menu.title': 'Koko menu',
                'menu.subtitle': 'Selaa koko valikoimaamme',
                
                // Order Section
                'order.title': 'Tilaa nyt',
                'order.subtitle': 'Helppo ja nopea tilaus',
                
                // Contact Section
                'contact.title': 'Ota Yhteyttä',
                'contact.subtitle': 'Lähetä meille viesti tai tule käymään leipomossamme'
            },
            en: {
                // Navigation
                'nav.home': 'Home',
                'nav.about': 'About Us',
                'nav.products': 'Products',
                'nav.menu': 'Menu',
                'nav.contact': 'Contact',
                'nav.order': 'Order Now',
                'nav.instagram': 'Instagram',
                
                // Hero Section
                'hero.title': 'Amherkut',
                'hero.subtitle': 'FLAVORS THAT TELL STORIES',
                'hero.description': 'Step into a world of flavors where Moroccan tradition meets Finnish passion. Experience the warmth and authenticity of our artisanal bakery – every bite is crafted with love and care, using only the finest natural ingredients. Enjoy moments filled with tradition and new experiences.',
                'hero.btn1': 'Explore Our Selection',
                'hero.btn2': 'Order Now',
                
                // About Section
                'about.title': 'OUR STORY: TWO CULTURES, ONE PASSION',
                'about.subtitle': 'Welcome to discover the story of Amherkut, which began with a dream to unite two worlds – the sun of Morocco and the nature of Finland.',
                'about.subtitle2': 'Tradition and Love in Baking',
                'about.text1': 'Amherkut was born from a passion for Moroccan cuisine and love for Finnish baking traditions. Our founder, with roots in Morocco and heart in Finland, wanted to bring together the best of both countries. In December 2020, we opened our doors in Hakaniemi Hall, and since then we have been able to share our story and flavors with you.',
                'about.text2': 'We believe that bread is more than just food – it\'s community, warmth and shared moments. That\'s why we make every product by hand, using only the best, natural ingredients. We want to offer you flavor experiences that not only nourish, but also inspire and bring joy to your day.',
                'about.feature1': 'Only the finest ingredients',
                'about.feature2': 'Handcrafted with love',
                'about.feature3': 'Community and shared moments',
                
                // Products Section
                'products.title': 'OUR PRODUCTS: HANDCRAFTED DELICACIES',
                'products.subtitle': 'Every product is made with care and passion, using only the finest ingredients. Explore our selection and find your favorites!',
                
                // Reviews Section
                'reviews.title': 'Customer Reviews',
                'reviews.subtitle': 'What makes us special',
                
                // Gallery Section
                'gallery.title': 'Instagram Stories - Daily Content',
                'gallery.subtitle': 'Follow us @amherkut to see daily stories and latest products!',
                
                // Menu Section
                'menu.title': 'Full Menu',
                'menu.subtitle': 'Browse our complete selection',
                
                // Order Section
                'order.title': 'Order Now',
                'order.subtitle': 'Easy and fast ordering',
                
                // Contact Section
                'contact.title': 'Get in Touch',
                'contact.subtitle': 'Send us a message or visit our bakery'
            },
            sv: {
                // Navigation
                'nav.home': 'Hem',
                'nav.about': 'Om Oss',
                'nav.products': 'Produkter',
                'nav.menu': 'Meny',
                'nav.contact': 'Kontakt',
                'nav.order': 'Beställ Nu',
                'nav.instagram': 'Instagram',
                
                // Hero Section
                'hero.title': 'Amherkut',
                'hero.subtitle': 'SMAKER SOM BERÄTTAR HISTORIER',
                'hero.description': 'Kliv in i en värld av smaker där marockansk tradition möter finsk passion. Upplev värmen och autenticiteten i vårt hantverksbageri – varje tugga är tillverkad med kärlek och omsorg, med endast de finaste naturliga ingredienserna. Njut av stunder fyllda med tradition och nya upplevelser.',
                'hero.btn1': 'Utforska Vårt Urval',
                'hero.btn2': 'Beställ Nu',
                
                // About Section
                'about.title': 'VÅR HISTORIA: TVÅ KULTURER, EN PASSION',
                'about.subtitle': 'Välkommen att upptäcka Amherkuts historia, som började med en dröm om att förena två världar – Marockos sol och Finlands natur.',
                'about.subtitle2': 'Tradition och Kärlek i Bakning',
                'about.text1': 'Amherkut föddes ur en passion för det marockanska köket och kärlek för finska baktraditioner. Vår grundare, med rötter i Marocko och hjärta i Finland, ville förena det bästa från båda länderna. I december 2020 öppnade vi våra dörrar i Hakaniemi Hall, och sedan dess har vi kunnat dela vår historia och smaker med dig.',
                'about.text2': 'Vi tror att bröd är mer än bara mat – det är gemenskap, värme och delade stunder. Därför gör vi varje produkt för hand, med endast de bästa, naturliga ingredienserna. Vi vill erbjuda dig smakupplevelser som inte bara ger näring, utan också inspirerar och ger glädje till din dag.',
                'about.feature1': 'Endast de finaste ingredienserna',
                'about.feature2': 'Handgjord med kärlek',
                'about.feature3': 'Gemenskap och delade stunder',
                
                // Products Section
                'products.title': 'VÅRA PRODUKTER: HANTVERKSDELIKATESSER',
                'products.subtitle': 'Varje produkt är gjord med omsorg och passion, med endast de bästa ingredienserna. Utforska vårt urval och hitta dina favoriter!',
                
                // Reviews Section
                'reviews.title': 'Kundrecensioner',
                'reviews.subtitle': 'Vad som gör oss speciella',
                
                // Gallery Section
                'gallery.title': 'Instagram Berättelser - Dagligt Innehåll',
                'gallery.subtitle': 'Följ oss @amherkut för att se dagliga berättelser och senaste produkter!',
                
                // Menu Section
                'menu.title': 'Fullständig Meny',
                'menu.subtitle': 'Bläddra i vårt kompletta urval',
                
                // Order Section
                'order.title': 'Beställ Nu',
                'order.subtitle': 'Enkel och snabb beställning',
                
                // Contact Section
                'contact.title': 'Kontakta Oss',
                'contact.subtitle': 'Skicka oss ett meddelande eller besök vårt bageri'
            }
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadLanguage();
    }
    
    bindEvents() {
        const languageBtn = document.getElementById('language-btn');
        const languageMenu = document.getElementById('language-menu');
        const languageOptions = document.querySelectorAll('.language-option');
        
        if (languageBtn && languageMenu) {
            languageBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleLanguageMenu();
            });
        }
        
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = option.getAttribute('data-lang');
                this.changeLanguage(lang);
                this.closeLanguageMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', () => {
            this.closeLanguageMenu();
        });
    }
    
    toggleLanguageMenu() {
        const dropdown = document.querySelector('.language-dropdown');
        dropdown.classList.toggle('active');
    }
    
    closeLanguageMenu() {
        const dropdown = document.querySelector('.language-dropdown');
        dropdown.classList.remove('active');
    }
    
    changeLanguage(lang) {
        this.currentLang = lang;
        this.updateContent();
        this.updateLanguageButton();
        localStorage.setItem('amherkut-language', lang);
    }
    
    loadLanguage() {
        const savedLang = localStorage.getItem('amherkut-language');
        if (savedLang && this.translations[savedLang]) {
            this.currentLang = savedLang;
        }
        this.updateContent();
        this.updateLanguageButton();
    }
    
    updateLanguageButton() {
        const currentLangSpan = document.getElementById('language-current');
        if (currentLangSpan) {
            const flags = { es: '🇪🇸', en: '🇬🇧', fi: '🇫🇮', sv: '🇸🇪' };
            const flag = flags[this.currentLang] || '🌐';
            currentLangSpan.textContent = `${flag} ${this.currentLang.toUpperCase()}`;
        }
    }
    
    updateContent() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[this.currentLang] && this.translations[this.currentLang][key]) {
                element.textContent = this.translations[this.currentLang][key];
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});
