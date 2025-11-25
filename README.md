# 🌍 Travel Booking System

A modern, full-stack travel booking platform built with **Spring Boot** and **Vanilla JavaScript**. Book your next adventure with real-time geolocation, live deals, and intelligent travel recommendations.

![Travel Mate](https://img.shields.io/badge/Travel-Booking-blue?style=flat-square)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.5-green?style=flat-square)
![Java](https://img.shields.io/badge/Java-21-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage Guide](#usage-guide)
- [Project Architecture](#project-architecture)
- [Data Persistence](#data-persistence)
- [Future Enhancements](#future-enhancements)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Features

### Core Functionality
✅ **IP-Based Geolocation** - Automatically detect user location and show localized deals  
✅ **Live Geolocation** - Browser-based GPS positioning with user permission  
✅ **Dynamic Deals** - Country-specific travel deals with real-time filtering  
✅ **Advanced Booking System** - Complete booking form with advance payment tracking  
✅ **Smart Suggestions** - Post-booking recommendations for transport, hotels, and food  
✅ **Admin Dashboard** - Manage travel offers and view analytics  

### Travel Features
🇮🇳 **India Highlights** - Hotels, tours, and adventure spots across India  
🗺️ **Interactive Map** - Leaflet-based map with user location tracking  
✈️ **Suggested Travels** - Curated travel suggestions with emoji cards  
💱 **Currency Toggle** - USD ↔ INR conversion (Rate: 83:1)  
🎚️ **Price Range Slider** - Filter deals by budget  
📊 **Analytics** - Review distribution, booking trends, statistics  

### Safety & Trust
⚠️ **Safety Section** - Travel guidelines and security warnings  
🔒 **Hidden Sensitive Data** - IP, coordinates, ISP masked from display  
⭐ **Review System** - User ratings and feedback on bookings  

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Spring Boot 3.1.5
- **Language:** Java 21 LTS
- **Build Tool:** Apache Maven 3.9.6
- **Server:** Apache Tomcat 10.1.15 (Embedded)
- **JSON Library:** Gson 2.10.1

### Frontend
- **Core:** Vanilla JavaScript (ES6+)
- **Mapping:** Leaflet 1.9.4 (with OpenStreetMap tiles)
- **Charts:** Chart.js (Pie & Line charts)
- **Icons:** Font Awesome 6.4.0
- **APIs:** Fetch API, Browser Geolocation API

### External Services
- **IP Geolocation:** ipinfo.io
- **Maps Direction:** Google Maps
- **Local Storage:** Browser localStorage for data persistence

---

## 📁 Project Structure

```
CodeAlpha_TravelBookingSystem/
├── pom.xml                           # Maven configuration
├── README.md                         # This file
│
└── src/
    └── main/
        ├── java/
        │   └── com/codealpha/travel/
        │       ├── TravelApplication.java      # Spring Boot main class
        │       ├── LocationController.java     # REST API controller
        │       ├── LocationData.java          # Data model
        │       └── IpService.java             # IP geolocation service
        │
        └── resources/
            └── static/
                ├── index.html                 # Home page
                ├── booking.html              # Booking page
                ├── admin.html                # Admin dashboard
                ├── style.css                 # Global styles
                └── app.js                    # Frontend logic
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Java 21 LTS** (JDK installed and in PATH)
- **Apache Maven 3.9.6** (configured in PATH)
- **Modern web browser** (Chrome, Firefox, Edge, Safari)
- **Internet connection** (for external APIs)

### Step 1: Clone or Download Project
```bash
cd CodeAlpha_TravelBookingSystem
```

### Step 2: Build the Project
```bash
mvn clean package -DskipTests
```

This will:
- Clean previous builds
- Download all dependencies
- Compile Java source code
- Package into executable JAR: `travel-booking-system-1.0.0.jar`

### Step 3: Verify Build
```bash
ls target/travel-booking-system-1.0.0.jar
```

---

## ▶️ Running the Application

### Start the Server
```bash
java -jar target/travel-booking-system-1.0.0.jar
```

### Expected Output
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.1.5)

Started TravelApplication in X.XXX seconds
Tomcat started on port(s): 8080 (http) with context path '/api'
```

### Access the Application
Open your browser and navigate to:
```
http://localhost:8080/api/
```

### Stop the Server
Press `Ctrl+C` in the terminal

---

## 📡 API Endpoints

All endpoints are prefixed with `/api`

### 1. Get IP Geolocation
```
GET /location/ip
```
**Response:**
```json
{
  "ip": "1.2.3.4",
  "city": "New Delhi",
  "region": "Delhi",
  "country": "IN",
  "loc": "28.6139,77.2090",
  "org": "AS13335 Cloudflare Inc"
}
```

### 2. Get Location Info (Text)
```
GET /location/info
```
**Response:**
```
You are in New Delhi, Delhi, India
```

---

## 📖 Usage Guide

### Home Page (`index.html`)
1. **Get Your Location & Deals**
   - Click the "Get My Location & Deals" button in the hero section
   - View your detected location (IP masked as "Hidden")
   - See deals tailored to your country

2. **View Suggested Travels**
   - Scroll to "Suggested Travels" section
   - Browse emoji-based travel cards
   - Use price range slider to filter by budget

3. **Toggle Currency**
   - Click the currency toggle button (USD ↔ INR)
   - All prices automatically convert (Rate: 83:1)

4. **Interactive Map**
   - View Leaflet map centered on India
   - Click "Show Live Location" to see your GPS coordinates
   - Map will recenter to your location if permitted

5. **India Highlights**
   - Click "Show India Highlights" to expand
   - Browse hotels, tours, and adventure spots
   - View options for Bodh Gaya, Rohtas Pahadi, Goa, Manali

### Booking Page (`booking.html`)
1. **Fill Booking Form**
   - Enter Name, Mobile, Email
   - Specify advance payment amount
   - Select tour destination and travel mode
   - Add special requests (optional)

2. **Use Live Location**
   - Click "Live Location" button
   - Grant geolocation permission
   - Your coordinates will be captured for routing

3. **Confirm Booking**
   - Click "Confirm Booking"
   - View confirmation summary
   - See suggested routes, hotels, and food options

4. **Open Google Maps**
   - Click "Open Google Maps" link
   - Get real-time directions from your location

5. **Leave Review**
   - Rate your trip (1-5 stars)
   - Write optional review
   - Submit to contribute to admin analytics

### Admin Dashboard (`admin.html`)
1. **View Analytics**
   - Total bookings counter
   - Review distribution pie chart (5★ to 1★)
   - Bookings over time line chart

2. **Create New Offer**
   - Fill offer details (title, country, price)
   - Add emoji for visual appeal
   - Write description
   - Click "Save Offer"

3. **Manage Offers**
   - View all active offers as cards
   - See offer details, pricing, country
   - Delete offers as needed

---

## 🏗️ Project Architecture

### Backend Architecture
```
Request → LocationController → IpService → ipinfo.io API
   ↓
JSON Response ← LocationData POJO
```

### Frontend Flow
```
User Action (Click) → Event Listener → Fetch API
   ↓
JSON Response → Parse → DOM Update
   ↓
localStorage Save (for persistence)
```

### Data Flow - Booking Example
```
Booking Form Submit
   ↓
Validate Input
   ↓
Create Booking Object
   ↓
Save to localStorage (key: 'bookings')
   ↓
Show Confirmation & Suggestions
   ↓
Build Google Maps URL & Display
```

---

## 💾 Data Persistence

### localStorage Keys

#### 1. **adminOffers** (Array)
Stores all travel offers created by admin
```javascript
[
  {
    country: "IN",
    emoji: "✈️",
    title: "Summer Flight Sale",
    discount: "-30%",
    original: "$500",
    price: "$350",
    desc: "Fly to Goa this summer!"
  }
]
```

#### 2. **bookings** (Array)
Stores all user bookings
```javascript
[
  {
    id: 1234567890,
    name: "John Doe",
    mobile: "9876543210",
    email: "john@example.com",
    advance: "5000",
    tourPlace: "Bodh Gaya",
    travelMode: "train",
    notes: "Need vegetarian meals",
    timestamp: "2025-11-25T17:11:35.326+05:30",
    coords: { lat: "28.6139", lon: "77.2090" },
    rating: 5,
    review: "Amazing experience!"
  }
]
```

#### 3. **currency** (String)
Stores user's preferred currency
```javascript
"USD"  // or "INR"
```

---

## 🔄 Currency Conversion

**Current Rate:** 1 USD = 83 INR

### How It Works
- User clicks currency toggle button
- `currentCurrency` variable switches between "USD" and "INR"
- All prices reformatted using `formatCurrency()` function
- Conversion: `INR = USD * 83`
- Persisted in localStorage as 'currency' key

---

## 🎨 Styling & Design

### Color Scheme
| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary | #FF6B6B | Buttons, highlights |
| Secondary | #4ECDC4 | Accents, hover states |
| Tertiary | #45B7D1 | Links, secondary elements |
| Accent | #FFD93D | Call-to-action |

### Key CSS Features
- **Glassmorphism:** Frosted glass effect with backdrop-filter
- **Animations:** Ripple buttons, slide-up sections, smooth transitions
- **Responsive:** Mobile-first design with breakpoints at 768px
- **Modern:** CSS Grid, Flexbox, custom properties

---

## 🔍 Troubleshooting

### Issue: Port 8080 Already in Use
**Solution:**
```bash
# Windows (PowerShell)
Stop-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess -Force

# Or run on different port
java -jar target/travel-booking-system-1.0.0.jar --server.port=8081
```

### Issue: Maven Not Found
**Solution:**
```bash
# Check Maven version
mvn --version

# If not installed, download from: https://maven.apache.org/download.cgi
# Add to PATH environment variable
```

### Issue: Geolocation Not Working
**Solution:**
- Browser must access app via HTTPS or localhost
- Grant location permission when prompted
- Check browser privacy settings
- Allow geolocation for localhost

### Issue: IP Geolocation API Rate Limited
**Solution:**
- ipinfo.io has a free tier limit (~1000 requests/day)
- Consider self-hosting MaxMind GeoIP2 for production
- Add caching to reduce API calls

### Issue: Charts Not Rendering in Admin
**Solution:**
- Ensure Chart.js CDN is loaded: `https://cdn.jsdelivr.net/npm/chart.js`
- Check browser console for errors
- Verify bookings data exists in localStorage
- Clear localStorage and create new bookings

---

## 📈 Future Enhancements

### Phase 1: Backend Improvements
- [ ] Database integration (MySQL, PostgreSQL, H2)
- [ ] User authentication & authorization
- [ ] Email notifications for bookings
- [ ] Payment gateway integration (Razorpay, Stripe)
- [ ] Offer scheduling & expiration

### Phase 2: Frontend Features
- [ ] Advanced search filters
- [ ] Photo gallery for destinations
- [ ] User profile management
- [ ] Wishlist functionality
- [ ] Mobile app (React Native)

### Phase 3: Deployment
- [ ] AWS/Azure deployment
- [ ] Docker containerization
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Performance optimization
- [ ] SEO optimization

### Phase 4: Analytics & Reporting
- [ ] Advanced analytics dashboard
- [ ] Revenue reporting
- [ ] Customer behavior analysis
- [ ] Marketing automation

---

## 📝 Configuration

### Application Properties
Edit `src/main/resources/application.properties` to customize:

```properties
# Server port
server.port=8080

# Context path
server.servlet.context-path=/api

# Application name
spring.application.name=Travel Booking System
```

### Maven Configuration
Edit `pom.xml` to modify:
- Java version
- Spring Boot version
- Dependencies
- Build plugins

---

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 👨‍💻 Author

**CodeAlpha Travel Team**

---

## 📞 Support

For issues, questions, or suggestions:
- Check the [Troubleshooting](#troubleshooting) section
- Review the [API Endpoints](#api-endpoints) documentation
- Check browser console for error messages
- Verify all prerequisites are installed

---

## 🙏 Acknowledgments

- **Spring Boot** - Java web framework
- **Leaflet** - Mapping library
- **Chart.js** - Charting library
- **Font Awesome** - Icon library
- **ipinfo.io** - IP geolocation API
- **Google Maps** - Direction routing

---

## 📊 Project Stats

- **Lines of Code:** 2000+
- **Java Files:** 4
- **HTML Files:** 3
- **CSS:** 1100+ lines
- **JavaScript:** 500+ lines
- **API Endpoints:** 2
- **Features:** 15+

---

**Last Updated:** November 25, 2025  
**Version:** 1.0.0  
**Status:** ✅ Production Ready

---

*Happy Travels! 🌍✈️*
#   C o d e A l p h a _ T r a v e l B o o k i n g S y s t e m  
 