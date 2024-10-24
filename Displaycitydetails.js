function displayCityDetails(cityName, cityLocation) {
    fetch('citiesdetails.json')
        .then(response => response.json())
        .then(data => {
            const selectedCity = data.find(city => city.name === cityName);
            if (!selectedCity) return;

            const { images, title, description, landmarks } = selectedCity;
            const landmarksHTML = landmarks.map(landmark => `<li>${landmark}</li>`).join('');
            const sliderHTML = `
                <div id="imageSlider" style="position: relative; width: 100%; height: 200px; overflow: hidden;">
                    <img src="${images[0]}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 5px; opacity: 1; transition: opacity 1s ease;" id="sliderImage">
                </div>`;
            const infoWindowContent = `
                <div style="background-color: #a8afbe; padding: 5px; border-radius: 5px; width: 250px; font-size: 14px;">
                    <h3 style="font-size: 16px; margin: 5px 0;">${title}</h3>
                    ${sliderHTML}
                    <p style="margin: 5px 0;">${description}</p>
                    <h4 style="font-size: 14px; margin: 5px 0;">Famous Landmarks:</h4>
                    <ul style="padding-left: 10px; margin: 0;">${landmarksHTML}</ul>
                </div>`;
                
            infoWindow.setContent(infoWindowContent);
            infoWindow.open(map, marker);

        
            setTimeout(() => startImageSlider(images), 500);
        })
        .catch(console.error);
}


function startImageSlider(images) {
    let currentImageIndex = 0;
    const sliderImage = document.getElementById('sliderImage');
    if (!sliderImage) return;  

    function updateImage() {
        sliderImage.style.opacity = '0';
        setTimeout(() => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            sliderImage.src = images[currentImageIndex];
            sliderImage.style.opacity = '1';
        }, 500); 
    }

    setInterval(updateImage, 3000); 
}


function initializeOnLoad() {
    const selectedCityId = new URLSearchParams(window.location.search).get('city');
    if (selectedCityId) {
        fetch('cities.json')
            .then(response => response.json())
            .then(data => {
                const city = data.find(city => city.id === selectedCityId);
                if (city) {
                    highlightSelectedCity(city.name);
                    displayCityDetails(city.name, { lat: city.lat, lng: city.lng });
                }
            })
            .catch(console.error);
    }
}

initMap();
initializeOnLoad();
