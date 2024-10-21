let map;
let marker;
let infoWindow;

function initMap() {
    const initialLocation = { lat: 28.6563, lng: 77.2321 };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: initialLocation,
    });

    const customIcon = 'pin.png';

    marker = new google.maps.Marker({
        position: initialLocation,
        map: map,
        title: 'Delhi',
        icon: {
            url: customIcon,
            scaledSize: new google.maps.Size(40, 40),
        },
    });

    infoWindow = new google.maps.InfoWindow();

    loadCityData();
    attachMarkerListeners();
}

function attachMarkerListeners() {
    marker.addListener('mouseover', () => {
        infoWindow.open(map, marker);
    });

    marker.addListener('mouseout', () => {
        infoWindow.close();
    });

    map.addListener('click', () => {
        infoWindow.close();
    });
}

function loadCityData() {
    fetch('cities.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                console.warn('City data is not an array or is empty');
                return;
            }

            const cityList = document.getElementById('cities-list');
            const ul = document.createElement('ul');
            const urlParams = new URLSearchParams(window.location.search);
            const selectedCityId = urlParams.get('city');

            let selectedCityLocation = null;

            data.forEach(city => {
                if (typeof city.lat !== 'number' || typeof city.lng !== 'number') {
                    console.warn(`City data missing valid lat/lng for: ${city.name}`);
                    return; 
                }

                const listItem = document.createElement('li');
                listItem.textContent = city.name;
                listItem.setAttribute('data-id', city.id);
                listItem.setAttribute('data-lat', city.lat);
                listItem.setAttribute('data-lng', city.lng);

                if (city.id === selectedCityId) {
                    selectedCityLocation = { lat: city.lat, lng: city.lng };
                    highlightSelectedCity(listItem);
                    displayCityDetails(city.name, selectedCityLocation);
                }

                listItem.addEventListener('click', () => handleCityClick(city, listItem));
                ul.appendChild(listItem);
            });

            cityList.appendChild(ul);

            if (selectedCityLocation) {
                moveMapAndMarker(selectedCityLocation);
            }
        })
        .catch(error => console.error('Error loading city data:', error));
}

function handleCityClick(city, listItem) {
    const lat = parseFloat(listItem.getAttribute('data-lat'));
    const lng = parseFloat(listItem.getAttribute('data-lng'));
    const cityLocation = { lat, lng };

    infoWindow.close();
    debounceMoveMapAndMarker(cityLocation, () => {
        displayCityDetails(listItem.textContent, cityLocation);
    });

    highlightSelectedCity(listItem);
    updateURLWithCityId(city.id);
}

let debounceTimeout;
function debounceMoveMapAndMarker(newPosition, callback) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        moveMapAndMarker(newPosition, callback);
    }, 120); // Adjust the timeout as needed
}

function highlightSelectedCity(selectedItem) {
    const allCities = document.querySelectorAll('#cities-list li');

    allCities.forEach(city => {
        city.style.backgroundColor = '';
        city.style.fontWeight = '';
    });

    selectedItem.style.backgroundColor = '#fafc4c';
    selectedItem.style.fontWeight = 'bold';
}

function updateURLWithCityId(cityId) {
    const url = new URL(window.location);
    url.searchParams.set('city', cityId);
    window.history.pushState({}, '', url);
}

function moveMapAndMarker(newPosition, callback) {
    // Use requestAnimationFrame for smoother movement
    window.requestAnimationFrame(() => {
        map.panTo(newPosition);
        marker.setPosition(newPosition);
        if (callback) callback();
    });
}
