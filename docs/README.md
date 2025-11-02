# Amherkut Leipomo - Website Documentation

## 📋 Project Overview

This is a professional website for Amherkut, an authentic Finnish bakery located in Helsinki. The website features modern design, AI-powered chatbot, SEO optimization, and PWA capabilities.

## 🏗️ Project Structure

```
amherkut/
├── index.html                 # Main HTML file
├── manifest.json             # PWA manifest
├── robots.txt                # SEO robots file
├── sitemap.xml              # SEO sitemap
├── sw.js                    # Service Worker
├── assets/                  # Static assets
│   ├── css/
│   │   └── styles.css       # Main stylesheet
│   ├── js/
│   │   ├── script.js        # Main JavaScript
│   │   ├── chatbot-ai.js    # AI Chatbot module
│   │   └── seo-optimizer.js # SEO optimization
│   ├── images/              # Image assets
│   ├── fonts/               # Custom fonts
│   └── icons/               # PWA icons
├── config/
│   └── site-config.json     # Site configuration
└── docs/
    └── README.md            # This file
```

## 🚀 Features

### Core Features
- **Responsive Design**: Mobile-first approach with perfect mobile experience
- **SEO Optimized**: Complete SEO setup with meta tags, structured data, and sitemap
- **PWA Ready**: Progressive Web App with offline functionality
- **AI Chatbot**: Intelligent customer service chatbot
- **Multi-language**: Finnish and English support
- **Performance Optimized**: Fast loading with lazy loading and caching

### Business Features
- **Online Ordering**: Complete order system with form validation
- **Menu Management**: Dynamic menu with categories
- **Contact Information**: Complete business details and hours
- **Social Integration**: Instagram and social media links
- **Analytics Ready**: Google Analytics and custom tracking

## 🛠️ Technical Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern CSS with Flexbox and Grid
- **JavaScript ES6+**: Modern JavaScript with modules
- **PWA**: Service Worker and Web App Manifest
- **SEO**: Structured data, meta tags, and sitemap
- **Performance**: Lazy loading, caching, and optimization

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Setup Instructions

### 1. Basic Setup
```bash
# Clone or download the project
cd amherkut

# Serve locally (using Python)
python -m http.server 8000

# Or using Node.js
npx serve .

# Or using PHP
php -S localhost:8000
```

### 2. Configuration
Edit `config/site-config.json` to customize:
- Business information
- Contact details
- Menu items
- Colors and fonts
- Social media links

### 3. Images
Add your images to `assets/images/`:
- `hero-bakery.jpg` - Main hero image
- `about-bakery.jpg` - About section image
- Product images (ruisleipa.jpg, korvapuusti.jpg, etc.)
- Gallery images

### 4. Icons
Add PWA icons to `assets/icons/`:
- `icon-72x72.png` to `icon-512x512.png`
- `badge-72x72.png`
- Shortcut icons

## 🎨 Customization

### Colors
Edit the color scheme in `config/site-config.json`:
```json
{
  "colors": {
    "primary": "#d4a574",
    "secondary": "#c49660",
    "accent": "#2c3e50"
  }
}
```

### Content
Update content in `config/site-config.json`:
- Hero section text
- About section
- Menu items and prices
- Contact information

### Styling
Modify `assets/css/styles.css` for:
- Layout changes
- Color adjustments
- Typography
- Animations

## 🤖 AI Chatbot

The chatbot is powered by advanced AI and includes:
- Intent recognition
- Multi-language support
- Conversation history
- Offline functionality
- Analytics tracking

### Chatbot Features
- Greeting responses
- Business hours information
- Location details
- Product information
- Order assistance
- Contact information

## 📈 SEO Features

### On-Page SEO
- Optimized meta tags
- Structured data (Schema.org)
- Semantic HTML
- Image alt tags
- Internal linking

### Technical SEO
- XML sitemap
- Robots.txt
- Canonical URLs
- Mobile optimization
- Page speed optimization

### Local SEO
- Google My Business integration
- Local business schema
- Address and contact information
- Opening hours

## 📊 Analytics

### Google Analytics
Add your GA4 measurement ID to `config/site-config.json`:
```json
{
  "analytics": {
    "google_analytics": "GA_MEASUREMENT_ID"
  }
}
```

### Custom Tracking
The site includes custom analytics for:
- Page views
- Button clicks
- Form submissions
- Chatbot interactions
- Performance metrics

## 🚀 Deployment

### 1. Web Hosting
Upload all files to your web server:
- Ensure HTTPS is enabled
- Configure proper MIME types
- Set up redirects if needed

### 2. Domain Setup
- Point your domain to the server
- Configure DNS settings
- Set up SSL certificate

### 3. Search Console
- Submit sitemap to Google Search Console
- Verify ownership
- Monitor performance

## 🔒 Security

### HTTPS
- Always use HTTPS in production
- Configure HSTS headers
- Use secure cookies

### Content Security Policy
Add CSP headers to prevent XSS attacks:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
```

## 📱 PWA Features

### Installation
Users can install the app on their devices:
- Add to home screen (mobile)
- Install as desktop app
- Offline functionality

### Offline Support
- Cached static files
- Offline page
- Background sync for forms
- Push notifications

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**
   - Check file paths in `config/site-config.json`
   - Ensure images exist in `assets/images/`

2. **Chatbot not working**
   - Check browser console for errors
   - Verify JavaScript files are loaded

3. **PWA not installing**
   - Ensure HTTPS is enabled
   - Check manifest.json syntax
   - Verify service worker registration

4. **SEO issues**
   - Validate HTML markup
   - Check structured data
   - Test with Google's tools

## 📞 Support

For technical support or customization requests:
- Email: info@amherkut.fi
- Phone: +358 40 123 4567

## 📄 License

This project is proprietary software for Amherkut Leipomo.
All rights reserved.

---

**Last Updated**: January 2024
**Version**: 1.0.0
