function toggleExpand() {
    const buttonContainer = document.getElementById('button-container');
    const citiesList = document.getElementById('cities-list');
    const toggleButton = document.getElementById('toggle-button');
    const toggleArrow = document.getElementById('toggle-arrow');
    const arrowToggle = document.getElementById('arrow-toggle');

    buttonContainer.classList.toggle('expanded');
    const isExpanded = buttonContainer.classList.contains('expanded');

    localStorage.setItem('isExpanded', isExpanded);

    if (isExpanded) {
        arrowToggle.innerHTML = '&larr;';
        toggleButton.style.display = 'inline-block';
        citiesList.style.display = 'block';
        toggleArrow.innerHTML = '▲';
    } else {
        arrowToggle.innerHTML = '&rarr;';
        toggleButton.style.display = 'none';
        citiesList.style.display = 'none';
        toggleArrow.innerHTML = '▼';
    }
}


window.addEventListener('load', function () {
    const isExpanded = localStorage.getItem('isExpanded') === 'true';
    const buttonContainer = document.getElementById('button-container');
    const citiesList = document.getElementById('cities-list');
    const toggleButton = document.getElementById('toggle-button');
    const toggleArrow = document.getElementById('toggle-arrow');
    const arrowToggle = document.getElementById('arrow-toggle');

    if (isExpanded) {
        buttonContainer.classList.add('expanded');
        arrowToggle.innerHTML = '&larr;';
        toggleButton.style.display = 'inline-block';
        citiesList.style.display = 'block';
        toggleArrow.innerHTML = '▲';
    } else {
        buttonContainer.classList.remove('expanded');
        arrowToggle.innerHTML = '&rarr;';
        toggleButton.style.display = 'none';
        citiesList.style.display = 'none';
        toggleArrow.innerHTML = '▼';
    }
});

document.getElementById('arrow-toggle').addEventListener('click', toggleExpand);
document.getElementById('location-button').addEventListener('click', toggleExpand);

document.getElementById('toggle-button').addEventListener('click', function () {
    const citiesList = document.getElementById('cities-list');
    const toggleArrow = document.getElementById('toggle-arrow');

    if (citiesList.style.display === 'block') {
        citiesList.style.display = 'none';
        toggleArrow.innerHTML = '▼';
    } else {
        citiesList.style.display = 'block';
        toggleArrow.innerHTML = '▲';
    }
});


document.getElementById('toggle-button').style.display = 'none';
document.getElementById('cities-list').style.display = 'none';
