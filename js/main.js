/**
 * BLR Food Guide - Main JavaScript
 * Handles global functionality for the website
 */

// Check if the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('BLR Food Guide - Website Loaded');
});

// Function to fetch food places data from JSON file
async function fetchFoodPlaces() {
    try {
        const response = await fetch('./data/places.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching food places:', error);
        return [];
    }
}

// Function to get URL parameters
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Format price range for display
function formatPriceRange(priceRange) {
    switch(priceRange) {
        case '$':
            return '<span class="price budget">$</span>';
        case '$$':
            return '<span class="price moderate">$$</span>';
        case '$$$':
            return '<span class="price expensive">$$$</span>';
        default:
            return '<span class="price">$</span>';
    }
}

// Function to create place card HTML
function createPlaceCard(place) {
    return `
        <div class="place-card">
            <div class="place-image">
                <img src="${place.image || 'img/placeholder.jpg'}" alt="${place.name}">
            </div>
            <div class="place-info">
                <h3>${place.name}</h3>
                <div class="place-meta">
                    <span>${place.area}</span>
                    <span>${place.placeType}</span>
                    <span>${place.foodType}</span>
                    <span class="${place.isVeg ? 'veg' : 'non-veg'}">${place.isVeg ? 'Veg' : 'Non-Veg'}</span>
                </div>
                <p class="place-description">${place.description}</p>
                <div class="place-footer">
                    ${formatPriceRange(place.priceRange)}
                    <a href="place-detail.html?id=${place.id}" class="view-details">View Details</a>
                </div>
            </div>
        </div>
    `;
}
