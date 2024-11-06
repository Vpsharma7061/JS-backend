let allProducts = [];
let allCategories = [];

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        allProducts = products;
        displayProducts(products);
        populateCategories(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function displayProducts(products) {
    const container = document.getElementById('productContainer');
    container.innerHTML = '';

    if (products.length === 0) {
        container.innerHTML = '<p>No products found.</p>';
        return;
    }

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: $${product.price}</p>
            <img src="${product.image}" alt="${product.title}" width="100">
        `;
        container.appendChild(productDiv);
    });
}

function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const selectedCategory = document.getElementById('categoryFilter').value;

    const filteredProducts = allProducts.filter(product => {
        const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
        const matchesSearchTerm = product.category.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearchTerm;
    });

    displayProducts(filteredProducts);
    showSuggestions(searchTerm);
}

function showSuggestions(searchTerm) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';

    if (searchTerm === "") {
        suggestionsContainer.style.display = 'none';
        return;
    }

    const matchedCategories = allCategories.filter(category =>
        category.toLowerCase().includes(searchTerm)
    );

    matchedCategories.forEach(category => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.textContent = category;

        suggestionItem.addEventListener('click', () => {
            document.getElementById('searchInput').value = category;
            document.getElementById('categoryFilter').value = category;
            filterProducts();
            suggestionsContainer.style.display = 'none';
        });

        suggestionsContainer.appendChild(suggestionItem);
    });

    suggestionsContainer.style.display = matchedCategories.length ? 'block' : 'none';
}

function populateCategories(products) {
    const categories = [...new Set(products.map(product => product.category))];
    allCategories = categories;

    const categoryFilter = document.getElementById('categoryFilter');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

document.getElementById('searchInput').addEventListener('input', filterProducts);
document.getElementById('categoryFilter').addEventListener('change', filterProducts);

fetchProducts();
