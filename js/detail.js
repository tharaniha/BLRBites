/**
 * BLR Food Guide - Detail Page JavaScript
 * Handles food place detail page functionality
 */

// Initialize the detail page
async function initDetailPage() {
    // Get place ID from URL
    const placeId = getUrlParam('id');
    
    if (!placeId) {
        // Redirect to places page if no ID is provided
        window.location.href = 'places.html';
        return;
    }
    
    // Fetch all places
    const places = await fetchFoodPlaces();
    
    // Find the selected place
    const place = places.find(p => p.id === parseInt(placeId) || p.id === placeId);
    
    if (!place) {
        // Display error if place not found
        document.getElementById('place-details').innerHTML = `
            <div class="error-message">
                <h2>Food Place Not Found</h2>
                <p>The food place you're looking for doesn't exist or has been removed.</p>
                <a href="places.html" class="btn-primary">Back to Food Places</a>
            </div>
        `;
        return;
    }
    
    // Display place details
    displayPlaceDetails(place);
    
    // Load Google Maps
    loadMap(place);
}

// Display the place details
function displayPlaceDetails(place) {
    const detailsContainer = document.getElementById('place-details');
    
    // Build features list HTML
    let featuresHtml = '';
    if (place.features && place.features.length > 0) {
        featuresHtml = `
            <div class="detail-features">
                <h3>Features & Amenities</h3>
                <ul class="features-list">
                    ${place.features.map(feature => `
                        <li><i class="fas fa-check-circle"></i> ${feature}</li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
    
    // Update page title
    document.title = `${place.name} | Bangalore Food Guide`;
    
    // Set detail HTML
    detailsContainer.innerHTML = `
        <div class="detail-header">
            <div class="detail-image">
                <img src="${place.image || 'img/placeholder.jpg'}" alt="${place.name}">
            </div>
            <div class="detail-meta">
                <h2>${place.name}</h2>
                <div class="detail-tags">
                    <span>${place.area}</span>
                    <span>${place.placeType}</span>
                    <span>${place.foodType}</span>
                    <span class="${place.isVeg ? 'veg' : 'non-veg'}">${place.isVeg ? 'Vegetarian' : 'Non-Vegetarian Options'}</span>
                </div>
            </div>
        </div>
        <div class="detail-content">
            <div class="detail-info">
                <div class="info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                        <h4>Location</h4>
                        <p>${place.address}</p>
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-phone"></i>
                    <div>
                        <h4>Contact</h4>
                        <p>${place.phone || 'Not available'}</p>
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-clock"></i>
                    <div>
                        <h4>Timings</h4>
                        <p>${place.timings || 'Not available'}</p>
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-rupee-sign"></i>
                    <div>
                        <h4>Price Range</h4>
                        <p>${formatPriceRange(place.priceRange)} ${getPriceRangeText(place.priceRange)}</p>
                    </div>
                </div>
            </div>
            
            <div class="detail-description">
                <p>${place.description}</p>
                ${place.longDescription ? `<p>${place.longDescription}</p>` : ''}
            </div>
            
            ${featuresHtml}
        </div>
    `;
}

// Get text description for price range
function getPriceRangeText(priceRange) {
    switch(priceRange) {
        case '$':
            return 'Budget Friendly';
        case '$$':
            return 'Moderately Priced';
        case '$$$':
            return 'Fine Dining';
        default:
            return '';
    }
}

// Load Google Maps with the place's location
function loadMap(place) {
    const mapContainer = document.getElementById('map');
    
    // If no coordinates are available, display a message
    if (!place.coordinates) {
        mapContainer.innerHTML = `
            <div class="map-placeholder">
                <p>Location: ${place.address}</p>
                <a href="https://maps.google.com/maps?q=${encodeURIComponent(place.name + ' ' + place.address)}" 
                   target="_blank" class="btn-primary">
                   <i class="fas fa-map-marked-alt"></i> View on Google Maps
                </a>
            </div>
        `;
        return;
    }
    
    // Load Google Maps API and display the map
    // For simplicity, we're using a placeholder here
    // In a real implementation, you would include the Google Maps API
    mapContainer.innerHTML = `
        <div class="map-placeholder">
            <p>Location: ${place.address}</p>
            <a href="https://maps.google.com/maps?q=${place.coordinates.lat},${place.coordinates.lng}" 
               target="_blank" class="btn-primary">
               <i class="fas fa-map-marked-alt"></i> View on Google Maps
            </a>
        </div>
    `;
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initDetailPage);
