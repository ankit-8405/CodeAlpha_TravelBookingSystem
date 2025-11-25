// Deals by country
const dealsByCountry = {
    'US': [
        { emoji: '✈️', title: 'Flight Deals', discount: '-30%', original: '$599', price: '$419', desc: 'Book flights and save up to 30%' },
        { emoji: '🏨', title: 'Hotel Packages', discount: '-40%', original: '$200/night', price: '$120/night', desc: 'Luxury hotels with 40% discount' },
        { emoji: '🏖️', title: 'Vacation Packages', discount: '-25%', original: '$1,999', price: '$1,499', desc: 'All-inclusive vacations' },
        { emoji: '🚗', title: 'Car Rental', discount: '-35%', original: '$50/day', price: '$32.50/day', desc: 'Luxury car rentals' }
    ],
    'IN': [
        { emoji: '✈️', title: 'Flight Deals', discount: '-35%', original: '$699', price: '$454', desc: 'International flights at best rates' },
        { emoji: '🏨', title: 'Hotel Packages', discount: '-45%', original: '$150/night', price: '$82.50/night', desc: 'Budget to luxury hotels' },
        { emoji: '🏖️', title: 'Beach Vacation', discount: '-40%', original: '$899', price: '$539', desc: 'Best beach destinations' },
        { emoji: '🚗', title: 'Cab Services', discount: '-30%', original: '$40/day', price: '$28/day', desc: 'Affordable car rentals' }
    ],
    'GB': [
        { emoji: '✈️', title: 'European Flights', discount: '-28%', original: '$450', price: '$324', desc: 'Explore Europe affordably' },
        { emoji: '🏨', title: 'Premium Hotels', discount: '-35%', original: '$250/night', price: '$162.50/night', desc: 'Luxury accommodations' },
        { emoji: '🏖️', title: 'Mediterranean Tours', discount: '-32%', original: '$2,499', price: '$1,699', desc: 'Exclusive Mediterranean packages' },
        { emoji: '🚗', title: 'Auto Rental', discount: '-25%', original: '$60/day', price: '$45/day', desc: 'Self-drive adventures' }
    ],
    'AU': [
        { emoji: '✈️', title: 'Asia Flights', discount: '-30%', original: '$800', price: '$560', desc: 'Explore Asia from Australia' },
        { emoji: '🏨', title: 'Resort Packages', discount: '-40%', original: '$200/night', price: '$120/night', desc: 'World-class resorts' },
        { emoji: '🏖️', title: 'Island Getaway', discount: '-38%', original: '$3,000', price: '$1,860', desc: 'Tropical island packages' },
        { emoji: '🚗', title: 'RV Rentals', discount: '-33%', original: '$150/day', price: '$100.50/day', desc: 'Road trip adventures' }
    ],
    'default': [
        { emoji: '✈️', title: 'Flight Deals', discount: '-30%', original: '$599', price: '$419', desc: 'Amazing flight deals worldwide' },
        { emoji: '🏨', title: 'Hotel Packages', discount: '-40%', original: '$200/night', price: '$120/night', desc: 'Premium accommodations' },
        { emoji: '🏖️', title: 'Vacation Packages', discount: '-25%', original: '$1,999', price: '$1,499', desc: 'All-inclusive vacations' },
        { emoji: '🚗', title: 'Car Rental', discount: '-35%', original: '$50/day', price: '$32.50/day', desc: 'Luxury car rentals' }
    ]
};

// Get reference to DOM elements
const getLocationBtn = document.getElementById('getLocationBtn');
const locationCard = document.getElementById('locationCard');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const recommendationCard = document.getElementById('recommendationCard');
const dealsContainer = document.getElementById('dealsContainer');
const currencyToggle = document.getElementById('currencyToggle');
const priceRange = document.getElementById('priceRange');
const priceRangeValue = document.getElementById('priceRangeValue');
const suggestedGrid = document.getElementById('suggestedGrid');

// Display elements
const ipDisplay = document.getElementById('ipDisplay');
const cityDisplay = document.getElementById('cityDisplay');
const regionDisplay = document.getElementById('regionDisplay');
const countryDisplay = document.getElementById('countryDisplay');
const coordsDisplay = document.getElementById('coordsDisplay');
const ispDisplay = document.getElementById('ispDisplay');
const showIndiaBtn = document.getElementById('showIndiaBtn');
const liveLocBtn = document.getElementById('liveLocBtn');
const indiaContent = document.getElementById('indiaContent');
const indiaHotels = document.getElementById('indiaHotels');
const indiaTours = document.getElementById('indiaTours');
const indiaAdventures = document.getElementById('indiaAdventures');
const liveCoords = document.getElementById('liveCoords');
const homeMapEl = document.getElementById('homeMap');

// Event listener for button
getLocationBtn.addEventListener('click', fetchLocation);

// Hero button also triggers location fetch
const heroGetLocationBtn = document.getElementById('heroGetLocationBtn');
if (heroGetLocationBtn) {
    heroGetLocationBtn.addEventListener('click', fetchLocation);
}

// Currency & price settings
const USD_TO_INR = 83; // approximate conversion rate
let currentCurrency = localStorage.getItem('currency') || 'USD';
let lastCountrySeen = '';

function parsePrice(str) {
    if (!str) return 0;
    const m = String(str).match(/\d+[\d.,]*/);
    if (!m) return 0;
    return Number(m[0].replace(/,/g, '')) || 0;
}

function formatCurrencyUSD(n) {
    return `$${n}`;
}

function formatCurrency(n) {
    if (currentCurrency === 'INR') {
        const inr = Math.round(n * USD_TO_INR);
        return `₹${inr}`;
    }
    return `$${n}`;
}

// Suggested travels sample data (price in USD)
const suggestedItems = [
    { emoji: '🏔️', title: 'Rohtas Pahadi Getaway', price: 120, desc: 'Hill trek and heritage forts' },
    { emoji: '🛕', title: 'Bodh Gaya Pilgrimage', price: 80, desc: 'Spiritual tour & temples' },
    { emoji: '🏖️', title: 'Goa Beach Package', price: 350, desc: 'Sun, sand and parties' },
    { emoji: '🏞️', title: 'Manali Adventure', price: 220, desc: 'Himalayan trek and rafting' },
    { emoji: '🏨', title: 'Luxury Stay Package', price: 900, desc: 'Premium hotels and services' }
];

function renderSuggested(maxPriceUSD = Infinity) {
    if (!suggestedGrid) return;
    suggestedGrid.innerHTML = '';
    suggestedItems.filter(it => it.price <= maxPriceUSD).forEach(it => {
        const card = document.createElement('div');
        card.className = 'suggest-card';
        card.innerHTML = `
            <div class="suggest-image">${it.emoji}</div>
            <div class="suggest-title">${it.title}</div>
            <div class="suggest-desc">${it.desc}</div>
            <div class="suggest-price">${formatCurrency(it.price)}</div>
        `;
        suggestedGrid.appendChild(card);
    });
}

// Price range slider handler
if (priceRange && priceRangeValue) {
    priceRangeValue.textContent = `$${priceRange.value}`;
    priceRange.addEventListener('input', (e) => {
        const val = Number(e.target.value);
        priceRangeValue.textContent = currentCurrency === 'INR' ? `₹${Math.round(val * USD_TO_INR)}` : `$${val}`;
        // re-render suggestions and deals using USD max
        renderSuggested(val);
        if (lastCountrySeen) populateDeals(lastCountrySeen);
    });
}

// Currency toggle
if (currencyToggle) {
    function updateCurrencyButton() { currencyToggle.textContent = currentCurrency === 'INR' ? 'Show $' : 'Show ₹'; }
    updateCurrencyButton();
    currencyToggle.addEventListener('click', () => {
        currentCurrency = currentCurrency === 'INR' ? 'USD' : 'INR';
        localStorage.setItem('currency', currentCurrency);
        updateCurrencyButton();
        // re-render content
        const last = sessionStorage.getItem('lastCountry') || lastCountrySeen;
        if (last) populateDeals(last);
        const max = Number(priceRange ? priceRange.value : 5000);
        renderSuggested(max);
    });
}

/**
 * Fetch location data from backend API
 */
async function fetchLocation() {
    try {
        // Show loading spinner
        loadingSpinner.classList.remove('hidden');
        locationCard.classList.add('hidden');
        errorMessage.classList.add('hidden');
        recommendationCard.classList.add('hidden');
        
        // Fetch data from backend
        const response = await fetch('/api/location/ip');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Hide spinner
        loadingSpinner.classList.add('hidden');
        
        // Display location data
        displayLocationData(data);
        
        // Show location card and recommendation
        locationCard.classList.remove('hidden');
        recommendationCard.classList.remove('hidden');
        
    } catch (error) {
        console.error('Error fetching location:', error);
        loadingSpinner.classList.add('hidden');
        
        // Display error message
        errorText.textContent = error.message;
        errorMessage.classList.remove('hidden');
    }
}

/**
 * Display location data in the UI
 * @param {Object} data - Location data from API
 */
function displayLocationData(data) {
    // Set display values, with fallback to '-' if not available
    // Sensitive fields are hidden from UI
    ipDisplay.textContent = 'Hidden';
    cityDisplay.textContent = data.city || '-';
    regionDisplay.textContent = data.region || '-';
    countryDisplay.textContent = data.country || '-';
    try { sessionStorage.setItem('lastCountry', data.country || ''); } catch (e) {}
    coordsDisplay.textContent = 'Hidden';
    ispDisplay.textContent = 'Hidden';
    
    // Update recommendation and deals based on country
    updateRecommendation(data.country);
    lastCountrySeen = data.country || '';
    populateDeals(data.country);
}

/**
 * Update travel recommendations based on country
 * @param {string} country - Country code or name
 */
function populateDeals(country) {
    const baseDeals = dealsByCountry[country] || dealsByCountry['default'];
    // Load admin offers from localStorage (if any) and merge for this country
    let adminOffers = [];
    try {
        adminOffers = JSON.parse(localStorage.getItem('adminOffers') || '[]');
    } catch (e) {
        adminOffers = [];
    }

    const offersForCountry = adminOffers.filter(o => !o.country || o.country === 'ALL' || o.country === country);
    const merged = [...baseDeals, ...offersForCountry];

    if (dealsContainer) {
        dealsContainer.innerHTML = '';

        // filter by slider max (USD)
        const maxUSD = priceRange ? Number(priceRange.value) : Infinity;

        merged.forEach(deal => {
            const origUSD = parsePrice(deal.original);
            const priceUSD = parsePrice(deal.price);
            if (priceUSD > maxUSD) return; // skip if above filter

            const dealCard = document.createElement('div');
            dealCard.className = 'deal-card';
            dealCard.innerHTML = `
                <div class="deal-badge">${deal.discount || ''}</div>
                <div class="deal-image">${deal.emoji || '✈️'}</div>
                <h3>${deal.title || deal.name || 'Offer'}</h3>
                <p>${deal.desc || ''}</p>
                <div class="deal-price">
                    <span class="original">${origUSD ? formatCurrency(origUSD) : (deal.original||'')}</span>
                    <span class="discounted">${priceUSD ? formatCurrency(priceUSD) : (deal.price||'')}</span>
                </div>
                <button class="btn btn-secondary">Claim Offer</button>
            `;
            dealsContainer.appendChild(dealCard);
        });
    }
}

/**
 * Populate India highlights (hotels, tours, adventure spots)
 */
function populateIndiaHighlights() {
    const hotels = [
        'Taj Palace, New Delhi',
        'The Oberoi, Mumbai',
        'Leela Palace, Bengaluru',
        'Fort Jaisalmer Hotel, Rajasthan'
    ];

    const tours = [
        'Bodh Gaya (Mahabodhi Temple / Gaya)',
        'Rohtas (Rohtas Fort and Pahadi regions)',
        'Golden Temple, Amritsar',
        'Taj Mahal, Agra'
    ];

    const adventures = [
        'Himalayan treks (Manali, Leh)',
        'Rishikesh rafting & yoga',
        'Western Ghats hikes (Coorg, Munnar)',
        'Andaman island diving'
    ];

    if (indiaHotels) {
        indiaHotels.innerHTML = '';
        hotels.forEach(h => {
            const li = document.createElement('li'); li.textContent = h; indiaHotels.appendChild(li);
        });
    }

    if (indiaTours) {
        indiaTours.innerHTML = '';
        tours.forEach(t => {
            const li = document.createElement('li'); li.textContent = t; indiaTours.appendChild(li);
        });
    }

    if (indiaAdventures) {
        indiaAdventures.innerHTML = '';
        adventures.forEach(a => {
            const li = document.createElement('li'); li.textContent = a; indiaAdventures.appendChild(li);
        });
    }

    if (indiaContent) indiaContent.classList.remove('hidden');
}

/**
 * Use browser geolocation API to show live location (if permission granted)
 */
function showLiveLocation() {
    if (!navigator.geolocation) {
        liveCoords.textContent = 'Geolocation not supported by your browser.';
        liveCoords.parentElement.classList.remove('hidden');
        return;
    }

    liveCoords.textContent = 'Locating…';
    liveCoords.parentElement.classList.remove('hidden');

    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lon = position.coords.longitude.toFixed(6);
        liveCoords.textContent = `Latitude: ${lat}, Longitude: ${lon}`;
    }, (err) => {
        liveCoords.textContent = 'Unable to retrieve your location. Permission denied or unavailable.';
    }, { enableHighAccuracy: true, timeout: 10000 });
}

function updateRecommendation(country) {
    const recommendationText = document.getElementById('recommendationText');
    
    const recommendations = {
        'US': '🇺🇸 Check out amazing destinations like New York, Las Vegas, and Miami! Book your flights now and get 30% off on hotels.',
        'IN': '🇮🇳 Explore the beauty of India! Visit the Taj Mahal, Kerala backwaters, and Goa beaches. Special packages available!',
        'GB': '🇬🇧 Discover the United Kingdom! From London\'s historic sites to Scottish highlands. Limited time offers available.',
        'CA': '🇨🇦 Experience Canada! Visit Niagara Falls, Rocky Mountains, and beautiful national parks. Early bird discounts!',
        'AU': '🇦🇺 Explore Australia! Great Barrier Reef, Sydney Opera House, and outback adventures. Exclusive deals for travelers.',
        'JP': '🇯🇵 Visit Japan! Experience Tokyo, Kyoto temples, and Mount Fuji. Get travel packages with free tours.',
        'FR': '🇫🇷 Discover France! Paris, the French Riviera, and historic landmarks. Book now for amazing savings.',
        'DE': '🇩🇪 Explore Germany! Berlin, Bavaria, and the Rhine Valley. Special group discounts available.',
        'IT': '🇮🇹 Visit Italy! Rome, Venice, Florence, and the Amalfi Coast. Early booking specials!',
        'ES': '🇪🇸 Enjoy Spain! Barcelona, Madrid, and beautiful Mediterranean beaches. Summer promotions ongoing!',
    };
    
    const recommendation = recommendations[country] || 
        `✈️ Explore ${country}! Get special travel deals and discounts for your region. Book your adventure today!`;
    
    recommendationText.textContent = recommendation;
}

// Auto-fetch location on page load (optional)
document.addEventListener('DOMContentLoaded', function() {
    console.log('Travel Booking System loaded successfully! 🌍');
    // Hook India buttons
    if (showIndiaBtn) showIndiaBtn.addEventListener('click', populateIndiaHighlights);
    if (liveLocBtn) liveLocBtn.addEventListener('click', showLiveLocation);
    // Optionally auto-populate India when user is in India
    try {
        const lastCountry = sessionStorage.getItem('lastCountry');
        if (lastCountry === 'IN') {
            populateIndiaHighlights();
        }
    } catch (e) {}

    // Initialize map (Leaflet) if present
    try {
        if (homeMapEl && window.L) {
            const defaultCenter = [22.0, 79.0]; // center India
            const map = L.map('homeMap').setView(defaultCenter, 5);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            // If browser geolocation available, center on user's location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const lat = pos.coords.latitude;
                    const lon = pos.coords.longitude;
                    map.setView([lat, lon], 11);
                    L.marker([lat, lon]).addTo(map).bindPopup('You are here').openPopup();
                }, () => {
                    // ignore permission denial
                });
            }
        }
    } catch (e) { console.warn('Map init failed', e); }

    // Render suggested items initially
    const initMax = priceRange ? Number(priceRange.value) : Infinity;
    renderSuggested(initMax);
});
