// Amherkut Leipomo - AI Chatbot Module
// Advanced AI-powered customer service chatbot

class AmherkutChatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.userPreferences = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadConversationHistory();
        this.setupTypingIndicator();
    }

    setupEventListeners() {
        const toggleBtn = document.getElementById('chatbot-toggle');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });

            input.addEventListener('input', () => this.handleTyping());
        }
    }

    toggle() {
        const chatbot = document.getElementById('chatbot');
        if (chatbot) {
            chatbot.classList.toggle('active');
            this.isOpen = !this.isOpen;
            
            if (this.isOpen) {
                this.focusInput();
                this.loadWelcomeMessage();
            }
        }
    }

    close() {
        const chatbot = document.getElementById('chatbot');
        if (chatbot) {
            chatbot.classList.remove('active');
            this.isOpen = false;
        }
    }

    focusInput() {
        const input = document.getElementById('chatbot-input');
        if (input) {
            setTimeout(() => input.focus(), 300);
        }
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Process message with AI
        try {
            const response = await this.processMessage(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('Anteeksi, tapahtui virhe. Yritä uudelleen tai soita meille +358 40 123 4567', 'bot');
        }
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}`;
        
        // Format message with links and special formatting
        const formattedText = this.formatMessage(text);
        messageDiv.innerHTML = `<p>${formattedText}</p>`;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Store in conversation history
        this.conversationHistory.push({
            sender,
            message: text,
            timestamp: new Date().toISOString()
        });

        this.saveConversationHistory();
    }

    formatMessage(text) {
        // Convert URLs to clickable links
        text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
        
        // Convert phone numbers to clickable links
        text = text.replace(/(\+358\s?\d{2}\s?\d{3}\s?\d{4})/g, '<a href="tel:$1">$1</a>');
        
        // Convert email addresses to clickable links
        text = text.replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1">$1</a>');
        
        return text;
    }

    async processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Intent recognition
        const intent = this.recognizeIntent(lowerMessage);
        
        // Generate response based on intent
        switch (intent) {
            case 'greeting':
                return this.getGreetingResponse();
            case 'hours':
                return this.getHoursResponse();
            case 'location':
                return this.getLocationResponse();
            case 'prices':
                return this.getPricesResponse();
            case 'products':
                return this.getProductsResponse();
            case 'order':
                return this.getOrderResponse();
            case 'delivery':
                return this.getDeliveryResponse();
            case 'allergies':
                return this.getAllergiesResponse();
            case 'contact':
                return this.getContactResponse();
            case 'complaint':
                return this.getComplaintResponse();
            case 'compliment':
                return this.getComplimentResponse();
            default:
                return this.getDefaultResponse(lowerMessage);
        }
    }

    recognizeIntent(message) {
        const intents = {
            greeting: ['hei', 'hello', 'moi', 'terve', 'hyvää päivää', 'good morning', 'good afternoon'],
            hours: ['aukioloajat', 'aika', 'aikoina', 'open', 'hours', 'kello', 'milloin'],
            location: ['osoite', 'sijainti', 'address', 'location', 'missä', 'where', 'mannerheimintie'],
            prices: ['hinnat', 'hinta', 'paljonko', 'maksaa', 'price', 'cost', 'euro'],
            products: ['tuotteet', 'leipä', 'pulla', 'kakku', 'makeinen', 'products', 'bread', 'cake'],
            order: ['tilaus', 'tilata', 'order', 'tilaa', 'tilata', 'reserve'],
            delivery: ['toimitus', 'kotiintoimitus', 'delivery', 'toimita', 'kotiin'],
            allergies: ['allergia', 'gluteeniton', 'vegaaninen', 'allergy', 'gluten', 'vegan'],
            contact: ['yhteystiedot', 'puhelin', 'sähköposti', 'contact', 'phone', 'email'],
            complaint: ['valitus', 'ongelma', 'huono', 'complaint', 'problem', 'bad'],
            compliment: ['kiitos', 'hyvä', 'loistava', 'mahtava', 'thanks', 'great', 'excellent']
        };

        for (const [intent, keywords] of Object.entries(intents)) {
            if (keywords.some(keyword => message.includes(keyword))) {
                return intent;
            }
        }

        return 'unknown';
    }

    getGreetingResponse() {
        const greetings = [
            'Hei! Tervetuloa Amherkut leipomoon! 🥖 Kuinka voin auttaa sinua tänään?',
            'Moi! Olen Amherkut leipomon virtuaalinen avustaja. Mitä haluaisit tietää?',
            'Tervetuloa! Olen täällä auttamassa sinua kaikissa leipomokysymyksissä! 😊'
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    getHoursResponse() {
        return `🕒 Aukioloajat:
• Ma-Pe: 06:00-18:00
• La: 07:00-16:00  
• Su: 08:00-15:00

Leivomme tuoretta joka aamu kello 4:00, joten saat aina parhaan mahdollisen tuoreuden! 🥐`;
    }

    getLocationResponse() {
        return `📍 Sijaintimme:
Mannerheimintie 15, 00100 Helsinki

Helppo löytää Helsingin keskustassa! Hyvät kulkuyhteydet ja parkkipaikkoja lähistöllä. 

Haluatko ohjeet tänne? 🗺️`;
    }

    getPricesResponse() {
        return `💰 Suosittujen tuotteiden hinnat:
• Ruisleipä: 3,50€
• Korvapuusti: 2,80€
• Pulla: 2,50€
• Munkki: 1,50€
• Valkoleipä: 2,20€
• Mansikkakakku: 25,00€

Katso koko menu sivulta tai kysy tarkempia hintoja! 📋`;
    }

    getProductsResponse() {
        return `🥖 Tuotteemme:
• Tuore leipä (ruis, valkoinen, sämpylät)
• Perinteiset pullat (korvapuusti, pulla)
• Kakut ja makeiset
• Munkit ja vohvelit
• Gluteenittomat vaihtoehdot
• Vegaaniset tuotteet

Kaikki tehdään käsityönä laadukkaista raaka-aineista! 🌾`;
    }

    getOrderResponse() {
        return `📞 Tilaus:
Voit tilata:
• Soittamalla: +358 40 123 4567
• Käyttämällä tilauslomaketta sivulla
• Tulemalla suoraan leipomoon

Toimitamme myös kotiin Helsingin alueella! 🚚`;
    }

    getDeliveryResponse() {
        return `🚚 Kotiintoimitus:
• Toimitusmaksu: 5€
• Toimitusaika: 1-2 tuntia
• Alue: Helsinki ja lähikunnat
• Tilaus: +358 40 123 4567

Tilaa aamulla, niin tuore leipä on iltapäivällä ovellasi! 🏠`;
    }

    getAllergiesResponse() {
        return `🌱 Allergiatiedot:
• Gluteenittomat tuotteet saatavilla
• Vegaaniset vaihtoehdot
• Pähkinäallergiatiedot saatavilla
• Kysy myymälästä tarkempia tietoja

Turvallisuus on meille tärkeää! 🛡️`;
    }

    getContactResponse() {
        return `📞 Yhteystiedot:
• Puhelin: +358 40 123 4567
• Sähköposti: info@amherkut.fi
• Osoite: Mannerheimintie 15, Helsinki
• Instagram: @amherkut_leipomo

Ota rohkeasti yhteyttä! 💬`;
    }

    getComplaintResponse() {
        return `😔 Anteeksi, että olet pettynyt! 

Ota yhteyttä:
• Puhelimella: +358 40 123 4567
• Sähköpostilla: info@amherkut.fi

Haluamme korjata tilanteen ja varmistaa, että olet tyytyväinen! 🤝`;
    }

    getComplimentResponse() {
        return `😊 Kiitos paljon! 

Iloitsemme, että tuotteemme miellyttävät! Tervetuloa uudelleen ja kerro kavereillesi! 

Seuraa meitä Instagramissa @amherkut_leipomo! 📸`;
    }

    getDefaultResponse(message) {
        const responses = [
            'Kiitos viestistäsi! Voit soittaa meille +358 40 123 4567 tai tulla käymään Mannerheimintie 15:ssä.',
            'Voin auttaa sinua kysymyksissä aukioloajoista, hinnoista, tuotteista tai tilauksista!',
            'Tervetuloa käymään leipomossamme! Tuoretta ja herkullista joka päivä! 🥖',
            'Kysy rohkeasti, jos tarvitset apua! Olen täällä auttamassa! 😊'
        ];

        // Check for specific keywords and provide more targeted responses
        if (message.includes('kiitos') || message.includes('thanks')) {
            return 'Ole hyvä! Mukavaa päivää! 😊';
        }

        if (message.includes('apua') || message.includes('help')) {
            return 'Tietenkin autan! Voit kysyä aukioloajoista, hinnoista, tuotteista tai tilauksista! 🤝';
        }

        return responses[Math.floor(Math.random() * responses.length)];
    }

    setupTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        this.typingIndicator = document.createElement('div');
        this.typingIndicator.className = 'chatbot-message bot typing-indicator';
        this.typingIndicator.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        this.typingIndicator.style.display = 'none';
        messagesContainer.appendChild(this.typingIndicator);
    }

    showTypingIndicator() {
        if (this.typingIndicator) {
            this.typingIndicator.style.display = 'block';
            const messagesContainer = document.getElementById('chatbot-messages');
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }
    }

    hideTypingIndicator() {
        if (this.typingIndicator) {
            this.typingIndicator.style.display = 'none';
        }
    }

    handleTyping() {
        // Could implement typing indicators or other real-time features
    }

    loadWelcomeMessage() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer || messagesContainer.children.length > 1) return;

        const welcomeMessages = [
            'Hei! Olen Amherkut leipomon virtuaalinen avustaja. Kuinka voin auttaa sinua tänään?',
            'Tervetuloa Amherkut leipomoon! Mitä haluaisit tietää tuotteistamme?',
            'Moi! Olen täällä auttamassa sinua kaikissa leipomokysymyksissä! 😊'
        ];

        const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        this.addMessage(randomWelcome, 'bot');
    }

    loadConversationHistory() {
        const saved = localStorage.getItem('amherkut-chat-history');
        if (saved) {
            this.conversationHistory = JSON.parse(saved);
        }
    }

    saveConversationHistory() {
        // Keep only last 50 messages to avoid storage bloat
        if (this.conversationHistory.length > 50) {
            this.conversationHistory = this.conversationHistory.slice(-50);
        }
        localStorage.setItem('amherkut-chat-history', JSON.stringify(this.conversationHistory));
    }

    // Analytics and insights
    getConversationInsights() {
        const totalMessages = this.conversationHistory.length;
        const userMessages = this.conversationHistory.filter(msg => msg.sender === 'user').length;
        const botMessages = this.conversationHistory.filter(msg => msg.sender === 'bot').length;
        
        return {
            totalMessages,
            userMessages,
            botMessages,
            conversationLength: totalMessages
        };
    }

    // Export conversation for analysis
    exportConversation() {
        return {
            timestamp: new Date().toISOString(),
            conversation: this.conversationHistory,
            insights: this.getConversationInsights()
        };
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.amherkutChatbot = new AmherkutChatbot();
});

// Add typing indicator styles
const typingStyles = `
.typing-indicator {
    display: flex;
    align-items: center;
    padding: 10px 15px;
}

.typing-dots {
    display: flex;
    gap: 4px;
}

.typing-dots span {
    width: 8px;
    height: 8px;
    background: #d4a574;
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(1) {
    animation-delay: -0.32s;
}

.typing-dots span:nth-child(2) {
    animation-delay: -0.16s;
}

@keyframes typing {
    0%, 80%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
    }
    40% {
        transform: scale(1);
        opacity: 1;
    }
}
`;

// Inject typing indicator styles
const styleSheet = document.createElement('style');
styleSheet.textContent = typingStyles;
document.head.appendChild(styleSheet);
