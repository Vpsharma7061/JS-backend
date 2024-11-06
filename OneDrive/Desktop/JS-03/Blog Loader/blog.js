const postsContainer = document.getElementById("posts-container");
const loader = document.getElementById("loader");

let page = 1;
const limit = 5;

async function fetchPosts() {
    try {
        loader.style.display = "block";
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
        const posts = await response.json();
        displayPosts(posts);
        loader.style.display = "none";
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

function displayPosts(posts) {
    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        page++;
        fetchPosts();
    }
});

fetchPosts();
