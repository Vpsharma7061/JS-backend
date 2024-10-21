function displayCityDetails(cityName, cityLocation) {
    fetch('citiesdetails.json')
        .then(response => response.json())
        .then(data => {
            const selectedCity = data.find(city => city.name === cityName);

            if (selectedCity) {
                const landmarksHTML = selectedCity.landmarks.map(landmark => `<li>${landmark}</li>`).join('');

                const infoWindowContent = `
                   <div style="background-color: #a8afbe; padding: 10px; border-radius: 5px;">
                        <h3>${selectedCity.title}</h3>
                        <img src="${selectedCity.image}" alt="${selectedCity.title}" style="width:180px;height:auto;">
                        <p>${selectedCity.description}</p>
                        <h4>Famous Landmarks:</h4>
                        <ul>${landmarksHTML}</ul>
                    </div>
                `;

                infoWindow.setContent(infoWindowContent);
                infoWindow.open(map, marker);
            }
        })
        .catch(error => console.error('Error fetching city details:', error));
}
