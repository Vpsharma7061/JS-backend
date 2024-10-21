document.addEventListener('DOMContentLoaded', function () {
    const buttonContainer = document.getElementById('button-container');
    const citiesList = document.getElementById('cities-list');
    const toggleButton = document.getElementById('toggle-button');
    const toggleArrow = document.getElementById('toggle-arrow');
    const arrowToggle = document.getElementById('arrow-toggle');

    // Function to update the UI based on the expanded state
    function updateUI(isExpanded) {
        buttonContainer.classList.toggle('expanded', isExpanded);
        arrowToggle.innerHTML = isExpanded ? '&larr;' : '&rarr;';
        toggleButton.style.display = isExpanded ? 'inline-block' : 'none';
        citiesList.style.display = isExpanded ? 'block' : 'none';
        toggleArrow.innerHTML = isExpanded ? '▲' : '▼'; // Update arrow based on expansion
    }

    // Function to toggle the expanded state and update the UI
    function toggleExpand() {
        const isExpanded = !buttonContainer.classList.contains('expanded');
        localStorage.setItem('isExpanded', isExpanded);
        updateUI(isExpanded);
    }

    // Initialize the UI state based on localStorage when the page loads
    window.addEventListener('load', () => updateUI(localStorage.getItem('isExpanded') === 'true'));

    // Attach event listeners for UI interactions
    arrowToggle.addEventListener('click', toggleExpand);
    document.getElementById('location-button').addEventListener('click', toggleExpand);

    // Toggle visibility of the cities list independently
    toggleButton.addEventListener('click', () => {
        const isCitiesListVisible = citiesList.style.display === 'block';
        citiesList.style.display = isCitiesListVisible ? 'none' : 'block';
        toggleArrow.innerHTML = isCitiesListVisible ? '▼' : '▲'; // Update arrow based on visibility
    });

    // Ensure elements are hidden initially
    toggleButton.style.display = 'none'; // Ensure toggle button is hidden initially
    citiesList.style.display = 'none'; // Ensure cities list is hidden initially
});
