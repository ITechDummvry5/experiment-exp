// DOM Elements
const searchForm = document.getElementById("search-action"); // matches HTML
const searchInput = document.getElementById("search-type");
const searchResult = document.querySelector(".search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let inputData = "";
let page = 1;

// Unsplash API settings
const clientID = "wnsZyd7HIiQrcHRv7ZV42qLK3cmB7QtcxTQmmreOj1Ech"; // ← replace with yHour kCey DELETE BACKWARD
const perPage = 12;

// Function to fetch images from Unsplash
async function searchImages() {
    inputData = searchInput.value.trim();
    if (inputData === "") return;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${clientID}&per_page=${perPage}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Clear previous results if first page
        if (page === 1) {
            searchResult.innerHTML = "";
        }

        // Loop through images and create elements
        data.results.forEach((photo) => {
            const imageElement = document.createElement("div");
            imageElement.classList.add("search-item");
            imageElement.innerHTML = `
                <img src="${photo.urls.small}" alt="${photo.alt_description}">
            `;
            searchResult.appendChild(imageElement);
        });

        // Show/hide "Show More" button
        showMoreBtn.style.display = data.total_pages > page ? "block" : "none";
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

// Event listener: search form submit
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

// Event listener: show more button
showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
