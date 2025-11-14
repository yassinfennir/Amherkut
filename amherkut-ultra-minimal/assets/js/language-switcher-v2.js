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
                'nav.language': 'Byt språk',
                'nav.language': 'Change language',
                'nav.language': 'Vaihda kieltä',
                'nav.language': 'Cambiar idioma',
                
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
                'products.description': 'Explora todos nuestros productos. Cada bebida y producto es una obra de arte, preparada con pasión y los mejores ingredientes',
                'products.count.number': '80',
                'products.count': 'fotos de productos',
                'products.copy.prompt': 'Copiar prompt',
                'products.prompt.copied': '¡Copiado!',
                'products.prompt.error': 'Intenta de nuevo',
                'products.empty': 'Estamos preparando algo delicioso',
                'products.empty.desc': 'Muy pronto añadiremos nuevas fotografías artesanales. ¡Gracias por tu paciencia!',
                
                // Bakery Section
                'bakery.title': 'Repostería Fresca, Artesanía Local',
                'bakery.subtitle': 'Estamos orgullosos de utilizar la mejor harina local y los ingredientes naturales más frescos en cada pan y pastel. Nuestro compromiso con la calidad garantiza un sabor auténtico en cada bocado: mantequilla de origen local y frutas orgánicas. ¡Descubre el verdadero sabor del trabajo artesanal!',
                'bakery.feature1.title': 'Harina Local',
                'bakery.feature1.desc': 'Harinas locales de la más alta calidad',
                'bakery.feature2.title': 'Ingredientes Frescos',
                'bakery.feature2.desc': 'Ingredientes naturales recién seleccionados',
                'bakery.feature3.title': 'Hecho a Mano',
                'bakery.feature3.desc': 'Métodos tradicionales de elaboración',
                'bakery.feature4.title': 'Frutas Orgánicas',
                'bakery.feature4.desc': 'Frutas cultivadas de forma natural',
                
                // Filter Buttons
                'filter.all': 'Todos',
                'filter.bread': 'Pan',
                'filter.drinks': 'Bebidas',
                'filter.food': 'Comida',
                'filter.sweet': 'Dulces',
                
                // Favorites Section
                'favorites.title': 'Nuestros Favoritos',
                'favorites.subtitle': 'Cada bebida es una obra de arte, preparada con pasión y los mejores ingredientes',
                'favorites.search': 'Buscar productos...',
                'favorites.all.categories': 'Todas las categorías',
                'favorites.sort.bestseller': 'Más vendidos',
                'favorites.sort.price.low': 'Precio: menor a mayor',
                'favorites.sort.price.high': 'Precio: mayor a menor',
                'favorites.sort.new': 'Más nuevos',
                'favorites.sort.rating': 'Mejor valorados',
                'favorites.products.count': 'productos',
                
                // Cart
                'cart.title': 'Tu Carrito',
                'cart.checkout': 'Proceder al Pago',
                'cart.empty': 'Tu carrito está vacío',
                'cart.continue': 'Continuar comprando',
                'cart.added': 'agregado al carrito',
                'cart.total': 'Total',
                'cart.items': 'productos',
                'cart.close': 'Cerrar carrito',
                
                // Product Badges
                'badge.bestseller': 'Más Vendido',
                'badge.new': 'Nuevo',
                'badge.outofstock': 'Agotado',
                'badge.lowstock': 'Solo quedan pocos',
                
                // Product Buttons
                'product.details': 'Ver detalles',
                'product.add': 'Añadir',
                'product.outofstock': 'Agotado',
                'product.addtocart': 'Añadir al Carrito',
                'product.quantity': 'Cantidad',
                'product.category': 'Categoría',
                'product.stock': 'Stock',
                'product.available': 'disponibles',
                'product.reviews': 'reseñas',
                'product.noresults': 'No se encontraron productos',
                'product.adjustfilters': 'Intenta ajustar tus filtros de búsqueda',
                'product.consult.price': 'Consultar Precio',
                'product.ingredients': 'Ingredientes',
                'product.more': 'más',
                
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
                'footer.rights': '© 2025 Amherkut. Todos los derechos reservados.',
                'footer.privacy': 'Privacidad',
                'footer.terms': 'Términos',
                'footer.cookies': 'Política de Cookies',
                
                // Featured Product Section
                'featured.product.title': '🥜 Pistaasi Baklava - Producto Destacado',
                'featured.product.description': 'Nuestro producto estrella: Tuore pistaasi, filotaikina, siirappi',
                'featured.product.subtitle': 'Fresh pistachio, filo pastry, syrup',
                
                // Keywords Section
                'keywords.section.title': '🔍 Búsqueda Rápida - Keywords',
                'keywords.section.description': 'Haz clic en cualquier keyword para buscar productos rápidamente',
                
                // Cart Labels
                'cart.total.label': 'Total (<span id="cart-item-count">0</span> productos):',
                
                // Aria Labels
                'cart.close.aria': 'Cerrar carrito',
                'lightbox.close.aria': 'Cerrar',
                'lightbox.prev.aria': 'Imagen anterior',
                'lightbox.next.aria': 'Siguiente imagen',
                
                // Footer Locations
                'footer.location1': 'Tienda Hakaniemi',
                'footer.location2': 'Panadería y Café',
                
                // Categories
                'category.cafe': 'Café',
                'category.hot': 'Bebidas Calientes',
                'category.cold': 'Bebidas Frías',
                'category.desserts': 'Postres',
                'category.bread': 'Pan',
                'category.drinks': 'Bebidas',
                'category.food': 'Comida',
                'category.sweet': 'Dulces'
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
                'footer.rights': '© 2025 Amherkut. Kaikki oikeudet pidätetään.',
                'footer.privacy': 'Tietosuoja',
                'footer.terms': 'Ehdot',
                'footer.cookies': 'Evästekäytäntö',
                
                // Products Page
                'products.view': 'Näytä Tuotteet',
                'products.description': 'Tutustu kaikkiin tuotteisiimme. Jokainen juoma ja tuote on taideteos, valmistettu intohimolla ja parhaista raaka-aineista',
                'products.count.number': '80',
                'products.count': 'tuotekuvaa',
                'products.copy.prompt': 'Kopiera prompten',
                'products.prompt.copied': 'Kopierad!',
                'products.prompt.error': 'Försök igen',
                'products.empty': 'Vi förbereder något gott',
                'products.empty.desc': 'Vi lägger snart till nya hantverksbilder. Tack för ditt tålamod!',
                
                // Bakery Section
                'bakery.title': 'Tuoreita Leivonnaisia, Paikallista Käsityötä!',
                'bakery.subtitle': 'Olemme ylpeitä käyttäessämme parasta kotimaista vehnää ja tuoreita, luonnollisia raaka-aineita leivonnaisten ja leipien valmistuksessa. Laadun sitoutumisemme takaa, että jokaisessa suupalassa on aito maku, paikallisesti hankittua voita ja luomuhedelmiä. Koe käsityön todellinen maku joka suupalassa!',
                'bakery.feature1.title': 'Kotimainen Vehnä',
                'bakery.feature1.desc': 'Laadukkaimpia kotimaisia jauhoja',
                'bakery.feature2.title': 'Tuoret Raaka-aineet',
                'bakery.feature2.desc': 'Luonnolliset ja tuoreet ainekset',
                'bakery.feature3.title': 'Käsityötä',
                'bakery.feature3.desc': 'Perinteiset valmistustavat',
                'bakery.feature4.title': 'Luomuhedelmät',
                'bakery.feature4.desc': 'Luonnonmukaiset hedelmät',
                
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
                'cart.close': 'Sulje ostoskori',
                
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
                'product.consult.price': 'Kysy Hintaa',
                'product.ingredients': 'Ainekset',
                'product.more': 'lisää',
                
                // Product Data
                'product.1.name': 'Pistaasi Baklava',
                'product.1.desc': 'Pistaasi baklava: Tuore pistaasi, filotaikina, siirappi. Pistachio baklava: Fresh pistachio, filo pastry, syrup.',
                'product.2.name': 'Pähkinä Baklava',
                'product.2.desc': 'Pähkinä Baklava: Filotaikina, manteli, saksanpähkinä, siirappi (V,L). Walnut Baklava: Filo pastry, almond, walnut, syrup (V,L).',
                'product.3.name': 'Pan Artesanal',
                'product.3.desc': 'Pan artesanal hecho con harina de graham orgánica, harina de trigo sarraceno y aceite de oliva orgánico. Pan fresco y tradicional con masa madre.',
                'product.4.name': 'Cold Brew',
                'product.4.desc': 'Pehmeä, virkistävä ja ihanteellinen kuumille päiville. Valmistettu 24 tunnin ajan',
                'product.5.name': 'Latte Macchiato',
                'product.5.desc': 'Kermainen ja pehmeä eleganssia joka huuraukossa. Täydellinen aamiaiselle',
                'product.6.name': 'Americana',
                'product.6.desc': 'Klassinen ja vankka syvällä maulla. Perinteisen kahvin ystäville',
                'product.7.name': 'Affogato',
                'product.7.desc': 'Vaniljajäätelöä kuuman espresso kanssa. Täydellinen jälkiruoka',
                'product.8.name': 'Chocolate Dubai',
                'product.8.desc': 'Premium maitosuklaa, käsityönä valmistettu. Ainutlaatuinen makuelämys',
                
                // Categories
                'category.cafe': 'Kahvi',
                'category.hot': 'Kuumat Juomat',
                'category.cold': 'Kylmät Juomat',
                'category.desserts': 'Jälkiruoat',
                'category.bread': 'Leipä',
                'category.drinks': 'Juomat',
                'category.food': 'Ruoka',
                'category.sweet': 'Makeiset',
                
                // Filter Buttons
                'filter.all': 'Kaikki',
                'filter.bread': 'Leipä',
                'filter.drinks': 'Juomat',
                'filter.food': 'Ruoka',
                'filter.sweet': 'Makeiset',
                
                // Featured Product Section
                'featured.product.title': '🥜 Pistaasi Baklava - Suosituin Tuote',
                'featured.product.description': 'Suosituin tuotteemme: Tuore pistaasi, filotaikina, siirappi',
                'featured.product.subtitle': 'Fresh pistachio, filo pastry, syrup',
                
                // Keywords Section
                'keywords.section.title': '🔍 Pikahaku - Avainsanat',
                'keywords.section.description': 'Klikkaa mitä tahansa avainsanaa löytääksesi tuotteita nopeasti',
                
                // Cart Labels
                'cart.total.label': 'Yhteensä (<span id="cart-item-count">0</span> tuotetta):',
                
                // Aria Labels
                'cart.close.aria': 'Sulje ostoskori',
                'lightbox.close.aria': 'Sulje',
                'lightbox.prev.aria': 'Edellinen kuva',
                'lightbox.next.aria': 'Seuraava kuva',
                
                // Footer Locations
                'footer.location1': 'Hakaniemen Myymälä',
                'footer.location2': 'Leipomo & Kahvilla'
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
                'footer.rights': '© 2025 Amherkut. All rights reserved.',
                'footer.privacy': 'Privacy',
                'footer.terms': 'Terms',
                'footer.cookies': 'Cookie Policy',
                
                // Products Page
                'products.view': 'View Products',
                'products.description': 'Explore all our products. Each drink and product is a work of art, prepared with passion and the best ingredients',
                'products.count.number': '80',
                'products.count': 'product photos',
                'products.copy.prompt': 'Copy prompt',
                'products.prompt.copied': 'Copied!',
                'products.prompt.error': 'Please try again',
                'products.empty': 'More artisan creations coming soon',
                'products.empty.desc': 'We are preparing new handcrafted images for this menu. Thank you for your patience!',
                
                // Bakery Section
                'bakery.title': 'Fresh Pastries, Local Craftsmanship',
                'bakery.subtitle': 'We proudly use the best locally sourced wheat and the freshest natural ingredients in every loaf and pastry. Our commitment to quality ensures authentic flavor in every bite, with locally churned butter and organic fruits. Experience the true taste of craftsmanship!',
                'bakery.feature1.title': 'Local Wheat',
                'bakery.feature1.desc': 'Premium locally milled flour',
                'bakery.feature2.title': 'Fresh Ingredients',
                'bakery.feature2.desc': 'Natural and freshly selected ingredients',
                'bakery.feature3.title': 'Handcrafted',
                'bakery.feature3.desc': 'Traditional baking methods',
                'bakery.feature4.title': 'Organic Fruits',
                'bakery.feature4.desc': 'Naturally grown fruits',
                
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
                'cart.close': 'Close cart',
                
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
                'product.consult.price': 'Consult Price',
                'product.ingredients': 'Ingredients',
                'product.more': 'more',
                
                // Product Data
                'product.1.name': 'Pistaasi Baklava',
                'product.1.desc': 'Pistaasi baklava: Tuore pistaasi, filotaikina, siirappi. Pistachio baklava: Fresh pistachio, filo pastry, syrup.',
                'product.2.name': 'Pähkinä Baklava',
                'product.2.desc': 'Pähkinä Baklava: Filotaikina, manteli, saksanpähkinä, siirappi (V,L). Walnut Baklava: Filo pastry, almond, walnut, syrup (V,L).',
                'product.3.name': 'Artisan Bread',
                'product.3.desc': 'Artisan bread made with organic graham flour, buckwheat flour and organic olive oil. Fresh and traditional bread with sourdough.',
                'product.4.name': 'Cold Brew',
                'product.4.desc': 'Smooth, refreshing and ideal for hot days. Prepared for 24 hours',
                'product.5.name': 'Latte Macchiato',
                'product.5.desc': 'Creamy and smooth with elegance in every sip. Perfect for breakfast',
                'product.6.name': 'Americana',
                'product.6.desc': 'Classic and robust with deep flavor. For traditional coffee lovers',
                'product.7.name': 'Affogato',
                'product.7.desc': 'Vanilla ice cream with hot espresso. A perfect dessert',
                'product.8.name': 'Chocolate Dubai',
                'product.7.desc': 'Premium milk chocolate, handcrafted. A unique flavor experience',
                
                // Categories
                'category.cafe': 'Coffee',
                'category.hot': 'Hot Drinks',
                'category.cold': 'Cold Drinks',
                'category.desserts': 'Desserts',
                'category.bread': 'Bread',
                'category.drinks': 'Drinks',
                'category.food': 'Food',
                'category.sweet': 'Sweets',
                
                // Filter Buttons
                'filter.all': 'All',
                'filter.bread': 'Bread',
                'filter.drinks': 'Drinks',
                'filter.food': 'Food',
                'filter.sweet': 'Sweets',
                
                // Featured Product Section
                'featured.product.title': '🥜 Pistaasi Baklava - Featured Product',
                'featured.product.description': 'Our star product: Fresh pistachio, filo pastry, syrup',
                'featured.product.subtitle': 'Fresh pistachio, filo pastry, syrup',
                
                // Keywords Section
                'keywords.section.title': '🔍 Quick Search - Keywords',
                'keywords.section.description': 'Click on any keyword to search products quickly',
                
                // Cart Labels
                'cart.total.label': 'Total (<span id="cart-item-count">0</span> items):',
                
                // Aria Labels
                'cart.close.aria': 'Close cart',
                'lightbox.close.aria': 'Close',
                'lightbox.prev.aria': 'Previous image',
                'lightbox.next.aria': 'Next image',
                
                // Footer Locations
                'footer.location1': 'Hakaniemi Store',
                'footer.location2': 'Bakery & Café'
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
                'footer.rights': '© 2025 Amherkut. Alla rättigheter förbehållna.',
                'footer.privacy': 'Integritet',
                'footer.terms': 'Villkor',
                'footer.cookies': 'Cookie Policy',
                
                // Products Page
                'products.view': 'Visa Produkter',
                'products.description': 'Utforska alla våra produkter. Varje dryck och produkt är ett konstverk, förberett med passion och de bästa ingredienserna',
                'products.count.number': '80',
                'products.count': 'produktfoton',
                'products.copy.prompt': 'Kopioi prompt',
                'products.prompt.copied': 'Kopioitu!',
                'products.prompt.error': 'Yritä uudelleen',
                'products.empty': 'Uusia makuelämyksiä tulossa',
                'products.empty.desc': 'Palaathan pian – lisää käsintehtyjä tuotteita och kuvia on tulossa.',
                
                // Bakery Section
                'bakery.title': 'Färska Bakverk, Lokal Hantverksskicklighet',
                'bakery.subtitle': 'Vi är stolta över att använda det bästa lokalt odlade vetet och de färskaste naturliga ingredienserna i varje bröd och bakverk. Vårt engagemang för kvalitet garanterar äkta smak i varje tugga, med lokalt kärnat smör och ekologiska frukter. Upplev den äkta smaken av hantverk!',
                'bakery.feature1.title': 'Lokalt Vete',
                'bakery.feature1.desc': 'Lokalt mjöl av högsta kvalitet',
                'bakery.feature2.title': 'Färska Ingredienser',
                'bakery.feature2.desc': 'Naturliga och nyplockade ingredienser',
                'bakery.feature3.title': 'Hantverk',
                'bakery.feature3.desc': 'Traditionella tillverkningsmetoder',
                'bakery.feature4.title': 'Ekologiska Frukter',
                'bakery.feature4.desc': 'Naturligt odlade frukter',
                
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
                'cart.close': 'Stäng kundvagn',
                
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
                'product.consult.price': 'Fråga om Pris',
                'product.ingredients': 'Ingredienser',
                'product.more': 'mer',
                
                // Product Data
                'product.1.name': 'Pistaasi Baklava',
                'product.1.desc': 'Pistaasi baklava: Tuore pistaasi, filotaikina, siirappi. Pistachio baklava: Fresh pistachio, filo pastry, syrup.',
                'product.2.name': 'Pähkinä Baklava',
                'product.2.desc': 'Pähkinä Baklava: Filotaikina, manteli, saksanpähkinä, siirappi (V,L). Walnut Baklava: Filo pastry, almond, walnut, syrup (V,L).',
                'product.3.name': 'Artisan Bread',
                'product.3.desc': 'Artisan bread made with organic graham flour, buckwheat flour and organic olive oil. Fresh and traditional bread with sourdough.',
                'product.4.name': 'Cold Brew',
                'product.4.desc': 'Mjuk, uppfriskande och idealisk för varma dagar. Förberedd i 24 timmar',
                'product.5.name': 'Latte Macchiato',
                'product.5.desc': 'Krämig och mjuk med elegans i varje klunk. Perfekt för frukost',
                'product.6.name': 'Americana',
                'product.6.desc': 'Klassisk och robust med djup smak. För traditionella kaffeälskare',
                'product.7.name': 'Affogato',
                'product.7.desc': 'Vaniljglass med varm espresso. En perfekt dessert',
                'product.8.name': 'Chocolate Dubai',
                'product.7.desc': 'Premium mjölkchoklad, handgjord. En unik smakupplevelse',
                
                // Categories
                'category.cafe': 'Kaffe',
                'category.hot': 'Varma Drycker',
                'category.cold': 'Kalla Drycker',
                'category.desserts': 'Desserter',
                'category.bread': 'Bröd',
                'category.drinks': 'Drycker',
                'category.food': 'Mat',
                'category.sweet': 'Sötsaker',
                
                // Filter Buttons
                'filter.all': 'Alla',
                'filter.bread': 'Bröd',
                'filter.drinks': 'Drycker',
                'filter.food': 'Mat',
                'filter.sweet': 'Sötsaker',
                
                // Featured Product Section
                'featured.product.title': '🥜 Pistaasi Baklava - Utvald Produkt',
                'featured.product.description': 'Vår stjärnprodukt: Färsk pistage, filodeg, sirap',
                'featured.product.subtitle': 'Fresh pistachio, filo pastry, syrup',
                
                // Keywords Section
                'keywords.section.title': '🔍 Snabb Sökning - Nyckelord',
                'keywords.section.description': 'Klicka på vilket nyckelord som helst för att söka produkter snabbt',
                
                // Cart Labels
                'cart.total.label': 'Totalt (<span id="cart-item-count">0</span> produkter):',
                
                // Aria Labels
                'cart.close.aria': 'Stäng varukorg',
                'lightbox.close.aria': 'Stäng',
                'lightbox.prev.aria': 'Föregående bild',
                'lightbox.next.aria': 'Nästa bild',
                
                // Footer Locations
                'footer.location1': 'Hakaniemi Butik',
                'footer.location2': 'Bageri & Kafé'
            }
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadLanguage();
    }
    
    bindEvents() {
        const languageBtn = document.getElementById('language-btn') || document.getElementById('language-toggle');
        const languageDropdown = document.getElementById('language-dropdown');
        const languageOptions = document.querySelectorAll('.language-option');
        
        if (languageBtn && languageDropdown) {
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
        const dropdown = document.getElementById('language-dropdown');
        const button = document.getElementById('language-btn') || document.getElementById('language-toggle');
        if (!dropdown) return;
        
        const isActive = dropdown.classList.toggle('active');
        if (button) {
            button.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        }
    }
    
    closeLanguageMenu() {
        const dropdown = document.getElementById('language-dropdown');
        const button = document.getElementById('language-btn') || document.getElementById('language-toggle');
        if (!dropdown) return;
        
        dropdown.classList.remove('active');
        if (button) {
            button.setAttribute('aria-expanded', 'false');
        }
    }
    
    changeLanguage(lang) {
        if (!this.translations[lang]) {
            console.warn(`Idioma no soportado: ${lang}`);
            return;
        }
        this.currentLang = lang;
        this.updateContent();
        this.updateLanguageButton();
        this.updateActiveOption();
        localStorage.setItem('amherkut-language', lang);
        
        // Re-renderizar productos si existe el display
        if (typeof productDisplay !== 'undefined' && productDisplay) {
            productDisplay.renderProducts();
        }

        if (typeof imageGallery !== 'undefined' && imageGallery) {
            imageGallery.populateCategorySelect();
            imageGallery.renderProductsGallery();
        }
        
        // Actualizar el carrito si existe
        if (typeof cartManager !== 'undefined' && cartManager) {
            cartManager.renderCart();
        }
    }
    
    loadLanguage() {
        const savedLang = localStorage.getItem('amherkut-language');
        const availableLanguages = Array.from(document.querySelectorAll('.language-option'))
            .map(option => option.getAttribute('data-lang'));
        
        if (savedLang && this.translations[savedLang] && availableLanguages.includes(savedLang)) {
            this.currentLang = savedLang;
        } else if (availableLanguages.includes('fi')) {
            this.currentLang = 'fi';
            localStorage.setItem('amherkut-language', this.currentLang);
        } else if (availableLanguages.length > 0) {
            this.currentLang = availableLanguages[0];
            localStorage.setItem('amherkut-language', this.currentLang);
        }
        this.updateContent();
        this.updateLanguageButton();
        this.updateActiveOption();
    }
    
    updateLanguageButton() {
        const currentLangSpan = document.getElementById('language-current');
        if (currentLangSpan) {
            const flags = { es: '🇪🇸', en: '🇬🇧', fi: '🇫🇮', sv: '🇸🇪' };
            const flag = flags[this.currentLang] || '🌐';
            currentLangSpan.textContent = `${flag} ${this.currentLang.toUpperCase()}`;
        }
        
        const languageBtn = document.getElementById('language-btn') || document.getElementById('language-toggle');
        if (languageBtn && this.translations[this.currentLang]) {
            const labelKey = 'nav.language';
            const translation = this.translations[this.currentLang][labelKey];
            if (translation) {
                languageBtn.setAttribute('aria-label', translation);
            }
        }
    }
    
    updateActiveOption() {
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            const lang = option.getAttribute('data-lang');
            option.classList.toggle('active', lang === this.currentLang);
        });
    }
    
    updateContent() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[this.currentLang] && this.translations[this.currentLang][key]) {
                const translation = this.translations[this.currentLang][key];
                // Si la traducción contiene HTML, usar innerHTML; de lo contrario, usar textContent
                if (translation.includes('<')) {
                    // Para elementos con spans que tienen IDs (como cart.total.label), preservar el contenido dinámico
                    const existingSpan = element.querySelector('span[id]');
                    if (existingSpan && key === 'cart.total.label') {
                        const spanId = existingSpan.id;
                        const spanContent = existingSpan.textContent;
                        // Reemplazar el placeholder con el contenido actual del span
                        const updatedTranslation = translation.replace(/<span id="[^"]+">[^<]*<\/span>/, `<span id="${spanId}">${spanContent}</span>`);
                        element.innerHTML = updatedTranslation;
                    } else {
                        element.innerHTML = translation;
                    }
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
        
        const ariaElements = document.querySelectorAll('[data-translate-aria]');
        ariaElements.forEach(element => {
            const key = element.getAttribute('data-translate-aria');
            if (this.translations[this.currentLang] && this.translations[this.currentLang][key]) {
                element.setAttribute('aria-label', this.translations[this.currentLang][key]);
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
