function displayCityDetails(cityName, cityLocation) {
    fetch('citiesdetails.json')
        .then(response => response.json())
        .then(data => {
            const selectedCity = data.find(city => city.name === cityName);

            if (selectedCity) {
                const landmarksHTML = selectedCity.landmarks.map(landmark => `<li>${landmark}</li>`).join('');

                const infoWindowContent = `
                    <div style="background-color: #a8afbe; padding: 5px; border-radius: 5px; width: 250px; font-size: 14px;">
                        <h3 style="font-size: 16px; margin: 5px 0;">${selectedCity.title}</h3>
                        <img src="${selectedCity.image}" alt="${selectedCity.title}" style="width: 100%; height: auto; border-radius: 5px; margin-bottom: 5px;">
                        <p style="margin: 5px 0;">${selectedCity.description}</p>
                        <h4 style="font-size: 14px; margin: 5px 0;">Famous Landmarks:</h4>
                        <ul style="padding-left: 10px; margin: 0;">${landmarksHTML}</ul>
                    </div>
                `;

                infoWindow.setContent(infoWindowContent);
                infoWindow.open(map, marker);
            }
        })
        .catch(error => console.error('Error fetching city details:', error));
}
