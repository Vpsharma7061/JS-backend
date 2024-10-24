let map, marker, infoWindow, currentIndex = 0, citiesData = [];

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

    google.maps.event.addListenerOnce(map, 'idle', () => {
        loadCityData();
        attachMarkerListeners();
    });
}

function attachMarkerListeners() {
    marker.addListener('mouseover', () => infoWindow.open(map, marker));
    marker.addListener('mouseout', () => infoWindow.close());
    map.addListener('click', () => infoWindow.close());
}

function loadCityData() {
    fetch('cities.json')
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) return;
            citiesData = data;
            populateCityList();
            setInitialCity();
        })
        .catch(console.error);
}

function populateCityList() {
    const cityList = document.getElementById('cities-list');
    cityList.innerHTML = '';
    const ul = document.createElement('ul');
    
    citiesData.forEach(city => {
        const listItem = document.createElement('li');
        listItem.textContent = city.name;
        listItem.setAttribute('data-id', city.id);
        listItem.setAttribute('data-lat', city.lat);
        listItem.setAttribute('data-lng', city.lng);
        listItem.addEventListener('click', () => handleCityClick(city, listItem));
        ul.appendChild(listItem);
    });

    cityList.appendChild(ul);
}

function setInitialCity() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCityId = urlParams.get('city');
    currentIndex = citiesData.findIndex(city => city.id === selectedCityId);
    if (currentIndex === -1) currentIndex = 0;
    const selectedCityLocation = { lat: citiesData[currentIndex].lat, lng: citiesData[currentIndex].lng };
    moveMapAndMarker(selectedCityLocation);
    highlightSelectedCity(citiesData[currentIndex].id);
    displayCityDetails(citiesData[currentIndex].name, selectedCityLocation);
}

function handleCityClick(city, listItem) {
    const lat = parseFloat(listItem.getAttribute('data-lat'));
    const lng = parseFloat(listItem.getAttribute('data-lng'));
    const cityLocation = { lat, lng };
    debounceMoveMapAndMarker(cityLocation, () => displayCityDetails(city.name, cityLocation));
    highlightSelectedCity(city.id);
    updateURLWithCityId(city.id);
}

let debounceTimeout;
function debounceMoveMapAndMarker(newPosition, callback) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        moveMapAndMarker(newPosition, callback);
    }, 100);
}

function highlightSelectedCity(cityId) {
    document.querySelectorAll('#cities-list li').forEach(city => {
        if (city.getAttribute('data-id') === cityId) {
            city.style.backgroundColor = '#fafc4c';
            city.style.fontWeight = 'bold';
        } else {
            city.style.backgroundColor = '';
            city.style.fontWeight = '';
        }
    });
}

function updateURLWithCityId(cityId) {
    const url = new URL(window.location);
    url.searchParams.set('city', cityId);
    window.history.pushState({}, '', url);
}

function moveMapAndMarker(newPosition, callback) {
    map.panTo(newPosition);
    marker.setPosition(newPosition);
    if (callback) callback();
}

document.getElementById('next-icon').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % citiesData.length;
    updateCity(currentIndex);
});

document.getElementById('previous-icon').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + citiesData.length) % citiesData.length;
    updateCity(currentIndex);
});

function updateCity(index) {
    const city = citiesData[index];
    if (city) {
        const cityLocation = { lat: city.lat, lng: city.lng };
        moveMapAndMarker(cityLocation, () => displayCityDetails(city.name, cityLocation));
        highlightSelectedCity(city.id);
        updateURLWithCityId(city.id);
    }
}

initMap();
