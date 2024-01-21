# GitHub Repositories Listing Page

## Description
This project is a web application designed to display the public GitHub repositories belonging to a specific user. It incorporates pagination, a loader during API calls, and an optional search bar for repository filtering.

## Assumptions
- The user has a reliable internet connection to fetch GitHub repositories.
- GitHub API responses are assumed to follow the documented structure.
- Pagination is implemented server-side using the GitHub API's `page` and `per_page` parameters.
- The default number of repositories displayed is 10, and the user can choose a maximum of 100 repositories per page.
- The loader is displayed during API calls to indicate that the data is being fetched.

## How to Run
1. Open `index.html` in your preferred web browser.
2. Enter a GitHub username in the provided input field.
3. Click the "Fetch Repositories" button to display repositories.
4. Use the pagination buttons to navigate through different pages.
5. Optionally, use the search bar to filter repositories based on name or description.

## Edge Cases
- In case of API call errors, an error message is logged to the console, and the loader is hidden.
- If no repositories are found for the provided username, a message is displayed indicating that no repositories were found.
- Pagination buttons are dynamically generated based on the total number of repositories and the selected number of repositories per page.

## Technologies Used
- HTML
- CSS
- JavaScript
- Bootstrap (for styling)
- jQuery (for DOM manipulation)

## Notes
- The assignment is implemented using HTML, CSS, and JavaScript, with the use of Bootstrap and jQuery as allowed by the guidelines.
- The project is set up to be hosted using a simple HTTP server or can be opened directly in a web browser.
