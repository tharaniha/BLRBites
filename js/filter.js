/**
 * BLR Food Guide - Filter JavaScript
 * Handles food places listing and filtering functionality
 */

// Store all food places and filtered places
let allPlaces = [];
let filteredPlaces = [];

// Initialize the food places page
async function initPlacesPage() {
    // Fetch food places data
    allPlaces = await fetchFoodPlaces();
    filteredPlaces = [...allPlaces];
    
    // Populate filter options
    populateFilterOptions();
    
    // Display all places initially
    displayPlaces(allPlaces);
    
    // Add event listeners for filters
    setupFilterListeners();
}

// Populate filter dropdown options
function populateFilterOptions() {
    // Get unique values for each filter
    const areas = [...new Set(allPlaces.map(place => place.area))];
    const foodTypes = [...new Set(allPlaces.map(place => place.foodType))];
    const placeTypes = [...new Set(allPlaces.map(place => place.placeType))];
    
    // Populate area filter
    const areaFilter = document.getElementById('area-filter');
    areas.forEach(area => {
        const option = document.createElement('option');
        option.value = area;
        option.textContent = area;
        areaFilter.appendChild(option);
    });
    
    // Populate food type filter
    const foodTypeFilter = document.getElementById('food-type-filter');
    foodTypes.forEach(foodType => {
        const option = document.createElement('option');
        option.value = foodType;
        option.textContent = foodType;
        foodTypeFilter.appendChild(option);
    });
    
    // Populate place type filter
    const placeTypeFilter = document.getElementById('place-type-filter');
    placeTypes.forEach(placeType => {
        const option = document.createElement('option');
        option.value = placeType;
        option.textContent = placeType;
        placeTypeFilter.appendChild(option);
    });
}

// Set up event listeners for all filters
function setupFilterListeners() {
    // Search input
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    searchInput.addEventListener('input', applyFilters);
    searchBtn.addEventListener('click', applyFilters);
    
    // Dropdown filters
    document.getElementById('area-filter').addEventListener('change', applyFilters);
    document.getElementById('food-type-filter').addEventListener('change', applyFilters);
    document.getElementById('place-type-filter').addEventListener('change', applyFilters);
    document.getElementById('price-filter').addEventListener('change', applyFilters);
    
    // Radio button filters
    const radioButtons = document.querySelectorAll('input[name="food-preference"]');
    radioButtons.forEach(button => {
        button.addEventListener('change', applyFilters);
    });
    
    // Reset filters button
    document.getElementById('reset-filters').addEventListener('click', resetFilters);
}

// Apply all filters to the food places
function applyFilters() {
    // Get filter values
    const searchText = document.getElementById('search-input').value.toLowerCase();
    const area = document.getElementById('area-filter').value;
    const foodType = document.getElementById('food-type-filter').value;
    const placeType = document.getElementById('place-type-filter').value;
    const priceRange = document.getElementById('price-filter').value;
    const foodPreference = document.querySelector('input[name="food-preference"]:checked').value;
    
    // Filter places based on criteria
    filteredPlaces = allPlaces.filter(place => {
        // Search text filter (name or description)
        const matchesSearch = searchText === '' || 
            place.name.toLowerCase().includes(searchText) || 
            place.description.toLowerCase().includes(searchText);
        
        // Area filter
        const matchesArea = area === '' || place.area === area;
        
        // Food type filter
        const matchesFoodType = foodType === '' || place.foodType === foodType;
        
        // Place type filter
        const matchesPlaceType = placeType === '' || place.placeType === placeType;
        
        // Price range filter
        const matchesPriceRange = priceRange === '' || place.priceRange === priceRange;
        
        // Food preference filter
        const matchesFoodPreference = foodPreference === '' || 
            (foodPreference === 'veg' && place.isVeg) || 
            (foodPreference === 'non-veg' && !place.isVeg);
        
        // Return true only if all filters match
        return matchesSearch && matchesArea && matchesFoodType && 
               matchesPlaceType && matchesPriceRange && matchesFoodPreference;
    });
    
    // Display filtered places
    displayPlaces(filteredPlaces);
}

// Reset all filters to their default values
function resetFilters() {
    // Reset search input
    document.getElementById('search-input').value = '';
    
    // Reset dropdown filters
    document.getElementById('area-filter').value = '';
    document.getElementById('food-type-filter').value = '';
    document.getElementById('place-type-filter').value = '';
    document.getElementById('price-filter').value = '';
    
    // Reset radio buttons
    document.getElementById('all-food').checked = true;
    
    // Show all places
    filteredPlaces = [...allPlaces];
    displayPlaces(filteredPlaces);
}

// Display places in the grid
function displayPlaces(places) {
    const placesContainer = document.getElementById('places-list');
    
    // Clear current places
    placesContainer.innerHTML = '';
    
    // Display places or no results message
    if (places.length === 0) {
        placesContainer.innerHTML = `
            <div class="no-results">
                <p>No food places found matching your criteria.</p>
                <button onclick="resetFilters()" class="btn-secondary">Reset Filters</button>
            </div>
        `;
    } else {
        // Create and append place cards
        places.forEach(place => {
            placesContainer.innerHTML += createPlaceCard(place);
        });
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initPlacesPage);
