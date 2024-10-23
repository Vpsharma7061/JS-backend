document.addEventListener('DOMContentLoaded', function () {
    const buttonContainer = document.getElementById('button-container');
    const citiesList = document.getElementById('cities-list');
    const toggleButton = document.getElementById('toggle-button');
    const toggleArrow = document.getElementById('toggle-arrow');
    const arrowToggle = document.getElementById('arrow-toggle');

    
    function updateUI(isExpanded) {
        buttonContainer.classList.toggle('expanded', isExpanded);
        arrowToggle.innerHTML = isExpanded ? '&larr;' : '&rarr;';
        toggleButton.style.display = isExpanded ? 'inline-block' : 'none';
        citiesList.style.display = isExpanded ? 'block' : 'none';
        toggleArrow.innerHTML = isExpanded ? '▲' : '▼'; 
    }

    function toggleExpand() {
        const isExpanded = !buttonContainer.classList.contains('expanded');
        localStorage.setItem('isExpanded', isExpanded);
        updateUI(isExpanded);
    }

    window.addEventListener('load', () => updateUI(localStorage.getItem('isExpanded') === 'true'));

    arrowToggle.addEventListener('click', toggleExpand);
    document.getElementById('location-button').addEventListener('click', toggleExpand);

    toggleButton.addEventListener('click', () => {
        const isCitiesListVisible = citiesList.style.display === 'block';
        citiesList.style.display = isCitiesListVisible ? 'none' : 'block';
        toggleArrow.innerHTML = isCitiesListVisible ? '▼' : '▲'; 
    });

    toggleButton.style.display = 'none'; 
    citiesList.style.display = 'none'; 
});
