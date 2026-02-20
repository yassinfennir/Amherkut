// Language Switcher for AM Herkut
class LanguageSwitcher {
    constructor() {
        this.currentLang = 'fi';
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
                'contact.subtitle': 'Envíanos un mensaje o visita nuestra panadería',
                'contact.main.title': 'Estamos Aquí Para Ti',
                'contact.main.subtitle': 'Ven a disfrutar de una experiencia de café única en Helsinki',
                'contact.visit': 'Visítanos',
                'contact.call': 'Llama',
                'contact.write': 'Escríbenos',
                'contact.hours.title': 'Horarios',
                'contact.hours.text': 'Lun - Sáb: 08:00 - 18:00<br>Domingo: Cerrado',
                'contact.chat': 'Chatea con nosotros',
                'contact.chat.subtitle': 'Respuesta rápida por WhatsApp',
                'contact.whatsapp': 'WhatsApp',
                'contact.call.btn': 'Llamar',
                
                // Locations
                'locations.title': 'Nuestras Ubicaciones',
                'locations.subtitle': 'Visítanos en cualquiera de nuestras dos ubicaciones en Helsinki',
                'locations.hours': 'Horarios',
                'locations.hours.schedule': '<strong>Horario:</strong> Lun - Sáb: 08:00 - 18:00 | Domingo: Cerrado',
                
                // Footer
                'footer.tagline': 'Café Premium Artesanal en Helsinki',
                'footer.locations': 'Ubicaciones',
                'footer.contact': 'Contacto',
                'footer.follow': 'Síguenos',
                'footer.rights': '© 2026 Amherkut. Todos los derechos reservados.',
                'footer.privacy': 'Privacidad',
                'footer.terms': 'Términos',
                'footer.cookies': 'Política de Cookies'
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
                'hero.subtitle': 'MAKUJA, JOTKA KERTOVAT TARINAA',
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
                'contact.subtitle': 'Lähetä meille viesti tai tule käymään leipomossamme',
                'contact.main.title': 'Olemme Täällä Sinua Varten',
                'contact.main.subtitle': 'Tule nauttimaan ainutlaatuisesta kahvikokemuksesta Helsingissä',
                'contact.visit': 'Käy Luonamme',
                'contact.call': 'Soita Meille',
                'contact.write': 'Kirjoita Meille',
                'contact.hours.title': 'Aukioloajat',
                'contact.hours.text': 'Ma - La: 08:00 - 18:00<br>Sunnuntai: Suljettu',
                'contact.chat': 'Chattaile Kanssamme',
                'contact.chat.subtitle': 'Nopea vastaus WhatsAppin kautta',
                'contact.whatsapp': 'WhatsApp',
                'contact.call.btn': 'Soita',
                
                // Locations
                'locations.title': 'Toimipisteet',
                'locations.subtitle': 'Vieraile jommallakummalla kahdesta toimipisteestämme Helsingissä',
                'locations.hours': 'Aukioloajat',
                'locations.hours.schedule': '<strong>Aukioloajat:</strong> Ma - La: 08:00 - 18:00 | Sunnuntai: Suljettu',
                
                // Footer
                'footer.tagline': 'Premium Käsityökahvi Helsingissä',
                'footer.locations': 'Toimipisteet',
                'footer.contact': 'Yhteystiedot',
                'footer.follow': 'Seuraa Meitä',
                'footer.rights': '© 2026 Amherkut. Kaikki oikeudet pidätetään.',
                'footer.privacy': 'Tietosuoja',
                'footer.terms': 'Ehdot',
                'footer.cookies': 'Evästekäytäntö',
                
                // Products Page
                'products.view': 'Näytä Tuotteet',
                'products.description': 'Tutustu kaikkiin tuotteisiimme. Jokainen juoma ja tuote on taideteos, valmistettu intohimolla ja parhaista raaka-aineista',
                'products.count.number': '80',
                'products.count': 'tuotekuvaa',
                
                // Favorites Section
                'favorites.title': 'Suosikkimme',
                'favorites.subtitle': 'Jokainen juoma on taideteos, valmistettu intohimolla ja parhaista raaka-aineista',
                'favorites.search': 'Hae tuotteita...',
                'favorites.all.categories': 'Kaikki kategoriat',
                'favorites.sort.bestseller': 'Myydyimmät',
                'favorites.sort.price.low': 'Alin ensin',
                'favorites.sort.price.high': 'Korkein ensin',
                'favorites.sort.new': 'Uusimmat',
                'favorites.sort.rating': 'Parhaat arvostelut',
                'favorites.products.count': 'tuotetta',
                
                // Cart
                'cart.title': 'Ostoskorisi',
                'cart.checkout': 'Siirry Kassalle',
                'cart.empty': 'Ostoskorisi on tyhjä',
                'cart.continue': 'Jatka ostoksia',
                'cart.added': 'lisätty ostoskoriin',
                'cart.total': 'Yhteensä',
                'cart.items': 'tuotetta',
                
                // Product Badges
                'badge.bestseller': 'Myydyin',
                'badge.new': 'Uusi',
                'badge.outofstock': 'Loppu',
                'badge.lowstock': 'Vain muutama jäljellä',
                
                // Product Buttons
                'product.details': 'Näytä tiedot',
                'product.add': 'Lisää',
                'product.outofstock': 'Loppu',
                'product.addtocart': 'Lisää ostoskoriin',
                'product.quantity': 'Määrä',
                'product.category': 'Kategoria',
                'product.stock': 'Varastossa',
                'product.available': 'saatavilla',
                'product.reviews': 'arvostelua',
                'product.noresults': 'Ei tuotteita löytynyt',
                'product.adjustfilters': 'Yritä säätää hakusuodattimia',
                
                // Product Data
                'product.1.name': 'Klassinen Espresso',
                'product.1.desc': 'Voimakas ja tasapainoinen, täydellinen aidoille kahvinystäville',
                'product.2.name': 'Käsityö Cappuccino',
                'product.2.desc': 'Tuore maitovaahdotus premium-suklaan kanssa, ainutlaatuinen kokemus',
                'product.3.name': 'Cold Brew',
                'product.3.desc': 'Pehmeä, virkistävä ja ihanteellinen kuumille päiville. Valmistettu 24 tunnin ajan',
                'product.4.name': 'Latte Macchiato',
                'product.4.desc': 'Kermainen ja pehmeä eleganssia joka huuraukossa. Täydellinen aamiaiselle',
                'product.5.name': 'Americana',
                'product.5.desc': 'Klassinen ja vankka syvällä maulla. Perinteisen kahvin ystäville',
                'product.6.name': 'Affogato',
                'product.6.desc': 'Vaniljajäätelöä kuuman espresso kanssa. Täydellinen jälkiruoka',
                
                // Categories
                'category.cafe': 'Kahvi',
                'category.hot': 'Kuumat Juomat',
                'category.cold': 'Kylmät Juomat',
                'category.desserts': 'Jälkiruoat'
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
                'contact.subtitle': 'Send us a message or visit our bakery',
                'contact.main.title': 'We Are Here For You',
                'contact.main.subtitle': 'Come and enjoy a unique coffee experience in Helsinki',
                'contact.visit': 'Visit Us',
                'contact.call': 'Call Us',
                'contact.write': 'Write To Us',
                'contact.hours.title': 'Hours',
                'contact.hours.text': 'Mon - Sat: 08:00 - 18:00<br>Sunday: Closed',
                'contact.chat': 'Chat With Us',
                'contact.chat.subtitle': 'Quick response via WhatsApp',
                'contact.whatsapp': 'WhatsApp',
                'contact.call.btn': 'Call',
                
                // Locations
                'locations.title': 'Our Locations',
                'locations.subtitle': 'Visit us at any of our two locations in Helsinki',
                'locations.hours': 'Hours',
                'locations.hours.schedule': '<strong>Hours:</strong> Mon - Sat: 08:00 - 18:00 | Sunday: Closed',
                
                // Footer
                'footer.tagline': 'Premium Artisan Coffee in Helsinki',
                'footer.locations': 'Locations',
                'footer.contact': 'Contact',
                'footer.follow': 'Follow Us',
                'footer.rights': '© 2026 Amherkut. All rights reserved.',
                'footer.privacy': 'Privacy',
                'footer.terms': 'Terms',
                'footer.cookies': 'Cookie Policy',
                
                // Products Page
                'products.view': 'View Products',
                'products.description': 'Explore all our products. Each drink and product is a work of art, prepared with passion and the best ingredients',
                'products.count.number': '80',
                'products.count': 'product photos',
                
                // Favorites Section
                'favorites.title': 'Our Favorites',
                'favorites.subtitle': 'Each drink is a work of art, prepared with passion and the finest ingredients',
                'favorites.search': 'Search products...',
                'favorites.all.categories': 'All categories',
                'favorites.sort.bestseller': 'Best sellers',
                'favorites.sort.price.low': 'Price: low to high',
                'favorites.sort.price.high': 'Price: high to low',
                'favorites.sort.new': 'Newest',
                'favorites.sort.rating': 'Best rated',
                'favorites.products.count': 'products',
                
                // Cart
                'cart.title': 'Your Cart',
                'cart.checkout': 'Proceed to Checkout',
                'cart.empty': 'Your cart is empty',
                'cart.continue': 'Continue shopping',
                'cart.added': 'added to cart',
                'cart.total': 'Total',
                'cart.items': 'items',
                
                // Product Badges
                'badge.bestseller': 'Best Seller',
                'badge.new': 'New',
                'badge.outofstock': 'Out of Stock',
                'badge.lowstock': 'Only few left',
                
                // Product Buttons
                'product.details': 'View details',
                'product.add': 'Add',
                'product.outofstock': 'Out of Stock',
                'product.addtocart': 'Add to Cart',
                'product.quantity': 'Quantity',
                'product.category': 'Category',
                'product.stock': 'Stock',
                'product.available': 'available',
                'product.reviews': 'reviews',
                'product.noresults': 'No products found',
                'product.adjustfilters': 'Try adjusting your search filters',
                
                // Product Data
                'product.1.name': 'Classic Espresso',
                'product.1.desc': 'Intense and balanced, perfect for true coffee lovers',
                'product.2.name': 'Artisan Cappuccino',
                'product.2.desc': 'Fresh frothed milk with premium chocolate, a unique experience',
                'product.3.name': 'Cold Brew',
                'product.3.desc': 'Smooth, refreshing and ideal for hot days. Prepared for 24 hours',
                'product.4.name': 'Latte Macchiato',
                'product.4.desc': 'Creamy and smooth with elegance in every sip. Perfect for breakfast',
                'product.5.name': 'Americana',
                'product.5.desc': 'Classic and robust with deep flavor. For traditional coffee lovers',
                'product.6.name': 'Affogato',
                'product.6.desc': 'Vanilla ice cream with hot espresso. A perfect dessert',
                
                // Categories
                'category.cafe': 'Coffee',
                'category.hot': 'Hot Drinks',
                'category.cold': 'Cold Drinks',
                'category.desserts': 'Desserts'
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
                'contact.subtitle': 'Skicka oss ett meddelande eller besök vårt bageri',
                'contact.main.title': 'Vi Är Här För Dig',
                'contact.main.subtitle': 'Kom och njut av en unik kaffeupplevelse i Helsingfors',
                'contact.visit': 'Besök Oss',
                'contact.call': 'Ring Oss',
                'contact.write': 'Skriv Till Oss',
                'contact.hours.title': 'Öppettider',
                'contact.hours.text': 'Mån - Lör: 08:00 - 18:00<br>Söndag: Stängt',
                'contact.chat': 'Chatta Med Oss',
                'contact.chat.subtitle': 'Snabbt svar via WhatsApp',
                'contact.whatsapp': 'WhatsApp',
                'contact.call.btn': 'Ring',
                
                // Locations
                'locations.title': 'Våra Platser',
                'locations.subtitle': 'Besök oss på någon av våra två platser i Helsingfors',
                'locations.hours': 'Öppettider',
                'locations.hours.schedule': '<strong>Öppettider:</strong> Mån - Lör: 08:00 - 18:00 | Söndag: Stängt',
                
                // Footer
                'footer.tagline': 'Premium Hantverkskaffe i Helsingfors',
                'footer.locations': 'Platser',
                'footer.contact': 'Kontakt',
                'footer.follow': 'Följ Oss',
                'footer.rights': '© 2026 Amherkut. Alla rättigheter förbehållna.',
                'footer.privacy': 'Integritet',
                'footer.terms': 'Villkor',
                'footer.cookies': 'Cookie Policy',
                
                // Products Page
                'products.view': 'Visa Produkter',
                'products.description': 'Utforska alla våra produkter. Varje dryck och produkt är ett konstverk, förberett med passion och de bästa ingredienserna',
                'products.count.number': '80',
                'products.count': 'produktfoton',
                
                // Favorites Section
                'favorites.title': 'Våra Favoriter',
                'favorites.subtitle': 'Varje dryck är ett konstverk, förberett med passion och de bästa ingredienserna',
                'favorites.search': 'Sök produkter...',
                'favorites.all.categories': 'Alla kategorier',
                'favorites.sort.bestseller': 'Bästsäljare',
                'favorites.sort.price.low': 'Pris: lågt till högt',
                'favorites.sort.price.high': 'Pris: högt till lågt',
                'favorites.sort.new': 'Nyaste',
                'favorites.sort.rating': 'Bäst betyg',
                'favorites.products.count': 'produkter',
                
                // Cart
                'cart.title': 'Din Varukorg',
                'cart.checkout': 'Gå Till Kassan',
                'cart.empty': 'Din varukorg är tom',
                'cart.continue': 'Fortsätt handla',
                'cart.added': 'tillagd i varukorgen',
                'cart.total': 'Totalt',
                'cart.items': 'produkter',
                
                // Product Badges
                'badge.bestseller': 'Bästsäljare',
                'badge.new': 'Ny',
                'badge.outofstock': 'Slut i lager',
                'badge.lowstock': 'Endast få kvar',
                
                // Product Buttons
                'product.details': 'Visa detaljer',
                'product.add': 'Lägg till',
                'product.outofstock': 'Slut',
                'product.addtocart': 'Lägg till i varukorgen',
                'product.quantity': 'Antal',
                'product.category': 'Kategori',
                'product.stock': 'Lager',
                'product.available': 'tillgängliga',
                'product.reviews': 'recensioner',
                'product.noresults': 'Inga produkter hittades',
                'product.adjustfilters': 'Försök justera dina sökfilter',
                
                // Product Data
                'product.1.name': 'Klassisk Espresso',
                'product.1.desc': 'Intensiv och balanserad, perfekt för sanna kaffeälskare',
                'product.2.name': 'Hantverks Cappuccino',
                'product.2.desc': 'Färsk skummad mjölk med premium-choklad, en unik upplevelse',
                'product.3.name': 'Cold Brew',
                'product.3.desc': 'Mjuk, uppfriskande och idealisk för varma dagar. Förberedd i 24 timmar',
                'product.4.name': 'Latte Macchiato',
                'product.4.desc': 'Krämig och mjuk med elegans i varje klunk. Perfekt för frukost',
                'product.5.name': 'Americana',
                'product.5.desc': 'Klassisk och robust med djup smak. För traditionella kaffeälskare',
                'product.6.name': 'Affogato',
                'product.6.desc': 'Vaniljglass med varm espresso. En perfekt dessert',
                
                // Categories
                'category.cafe': 'Kaffe',
                'category.hot': 'Varma Drycker',
                'category.cold': 'Kalla Drycker',
                'category.desserts': 'Desserter'
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
        
        // Re-renderizar productos si existe el display
        if (typeof productDisplay !== 'undefined' && productDisplay) {
            productDisplay.renderProducts();
        }
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
            const flags = { en: '🇬🇧', fi: '🇫🇮', sv: '🇸🇪' };
            const flag = flags[this.currentLang] || '🌐';
            currentLangSpan.textContent = `${flag} ${this.currentLang.toUpperCase()}`;
        }
    }
    
    updateContent() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[this.currentLang] && this.translations[this.currentLang][key]) {
                const translation = this.translations[this.currentLang][key];
                // Si la traducción contiene HTML, usar innerHTML; de lo contrario, usar textContent
                if (translation.includes('<')) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Traducir placeholders
        const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (this.translations[this.currentLang] && this.translations[this.currentLang][key]) {
                element.placeholder = this.translations[this.currentLang][key];
            }
        });
    }
}

// DEFINIR FUNCIÓN getTranslation PRIMERO - Antes de inicializar
window.getTranslation = function(key) {
    try {
        if (window.languageSwitcher && window.languageSwitcher.translations && window.languageSwitcher.translations[window.languageSwitcher.currentLang]) {
            return window.languageSwitcher.translations[window.languageSwitcher.currentLang][key] || key;
        }
        // Fallback a finlandés
        if (window.languageSwitcher && window.languageSwitcher.translations && window.languageSwitcher.translations['fi']) {
            return window.languageSwitcher.translations['fi'][key] || key;
        }
    } catch (e) {
        console.error('Error en getTranslation:', e);
    }
    return key;
};

// Función global para obtener el idioma actual
window.getCurrentLanguage = function() {
    return window.languageSwitcher ? window.languageSwitcher.currentLang : 'fi';
};

// AHORA inicializar languageSwitcher
window.languageSwitcher = new LanguageSwitcher();

// Alias para compatibilidad
const getTranslation = window.getTranslation;
const getCurrentLanguage = window.getCurrentLanguage;
const languageSwitcher = window.languageSwitcher;
