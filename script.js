const repositoriesList = document.getElementById('repositories-list');
const paginationContainer = document.getElementById('pagination');
const loader = document.getElementById('loader');
const searchInput = document.getElementById('search');
const repositoriesPerPageSelect = document.getElementById('repositories-per-page');
const errorMessageContainer = document.getElementById('error-message');

let currentPage = 1;
let repositoriesPerPage = 10; // Default repositories per page
let totalRepositories = 0;
let currentRepositories = [];

function fetchRepositories() {
    const username = document.getElementById('username').value;

    // Validate the username input
    if (!isValidUsername(username)) {
        displayErrorMessage('Please enter a valid GitHub username.');
        return;
    }

    // Clear previous error message if any
    errorMessageContainer.innerHTML = '';

    const apiUrl = `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${repositoriesPerPage}`;

    loader.style.display = 'block'; // Show loader during API call

    fetch(apiUrl)
        .then(response => {
            // Check for error status in the response
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            loader.style.display = 'none'; // Hide loader after API call
            totalRepositories = data.length;
            currentRepositories = data;
            displayRepositories();
            displayPagination();
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            loader.style.display = 'none'; // Hide loader in case of error
            displayErrorMessage('Error fetching repositories. Please try again.');
        });
}

function isValidUsername(username) {
    // Add your validation logic here
    return username.trim() !== '';
}

function displayRepositories() {
    repositoriesList.innerHTML = ''; // Clear previous results

    if (currentRepositories.length === 0) {
        repositoriesList.innerHTML = '<p>No repositories found.</p>';
        return;
    }

    currentRepositories.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available'}</p>
            <p>Language: ${repo.language || 'Not specified'}</p>
            <hr>
        `;
        repositoriesList.appendChild(repoElement);
    });
}

function displayPagination() {
    paginationContainer.innerHTML = ''; // Clear previous pagination

    const totalPages = Math.ceil(totalRepositories / repositoriesPerPage);

    if (totalPages > 1) {
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.addEventListener('click', () => {
                currentPage = i;
                fetchRepositories();
            });
            paginationContainer.appendChild(button);
        }
    }
}

function changeRepositoriesPerPage() {
    repositoriesPerPage = parseInt(repositoriesPerPageSelect.value);
    fetchRepositories();
}

function filterRepositories() {
    const searchTerm = searchInput.value.toLowerCase();
    currentRepositories = currentRepositories.filter(repo =>
        repo.name.toLowerCase().includes(searchTerm) ||
        (repo.description && repo.description.toLowerCase().includes(searchTerm))
    );
    currentPage = 1;
    displayRepositories();
    displayPagination();
}

function displayErrorMessage(message) {
    errorMessageContainer.innerHTML = `<p>${message}</p>`;
}

// Attach event listeners
repositoriesPerPageSelect.addEventListener('change', changeRepositoriesPerPage);

// Fetch repositories on page load or user input
fetchRepositories();
