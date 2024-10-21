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
        .then(response => response.json())
        .then(data => {
            const cityList = document.getElementById('cities-list');
            const ul = document.createElement('ul');
            const urlParams = new URLSearchParams(window.location.search);
            const selectedCityId = urlParams.get('city');

            let selectedCityLocation = null;

            data.forEach(city => {
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

                listItem.addEventListener('click', function () {
                    const lat = parseFloat(this.getAttribute('data-lat'));
                    const lng = parseFloat(this.getAttribute('data-lng'));
                    const cityLocation = { lat, lng };

                    infoWindow.close();

                    panMapTo(cityLocation);
                    animateMarkerTo(cityLocation, () => {
                        displayCityDetails(this.textContent, cityLocation);
                    });

                    highlightSelectedCity(this);
                    updateURLWithCityId(city.id);
                });
                ul.appendChild(listItem);
            });

            cityList.appendChild(ul);

            if (selectedCityLocation) {
                panMapTo(selectedCityLocation);
                animateMarkerTo(selectedCityLocation);
            }
        })
        .catch(error => console.error('Error loading city data:', error));
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

function animateMarkerTo(newPosition, callback) {
    const currentPosition = marker.getPosition();
    const steps = 30;
    const latStep = (newPosition.lat - currentPosition.lat()) / steps;
    const lngStep = (newPosition.lng - currentPosition.lng()) / steps;

    let currentStep = 0;

    function moveMarker() {
        currentStep++;
        const nextPosition = {
            lat: currentPosition.lat() + latStep * currentStep,
            lng: currentPosition.lng() + lngStep * currentStep,
        };

        marker.setPosition(nextPosition);

        if (currentStep < steps) {
            requestAnimationFrame(moveMarker);
        } else {
            marker.setPosition(newPosition);
            if (callback) callback();
        }
    }

    requestAnimationFrame(moveMarker);
}

function panMapTo(newPosition) {
    const currentPosition = map.getCenter();
    const steps = 30;
    const latStep = (newPosition.lat - currentPosition.lat()) / steps;
    const lngStep = (newPosition.lng - currentPosition.lng()) / steps;

    let currentStep = 0;

    function moveMap() {
        currentStep++;
        const nextPosition = {
            lat: currentPosition.lat() + latStep * currentStep,
            lng: currentPosition.lng() + lngStep * currentStep,
        };

        map.setCenter(nextPosition);

        if (currentStep < steps) {
            requestAnimationFrame(moveMap);
        } else {
            map.setCenter(newPosition);
        }
    }

    requestAnimationFrame(moveMap);
}
