interface Book {
    title: string;
    author_name: string[];
    first_publish_year: number | null;
    // Add other properties as needed
}

function searchBook() {
    const titleInput = document.getElementById('book-title') as HTMLInputElement;
    if (!titleInput) {
        console.error('Error: Book title input element not found');
        return;
    }

    const title = titleInput.value.trim();
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) {
        console.error('Error: Search results container element not found');
        return;
    }

    resultsContainer.innerHTML = '';

    if (title === '') {
        resultsContainer.innerHTML = '<p>Please enter a book title to search.</p>';
        return;
    }

    fetch(`http://localhost:3001/${encodeURIComponent(title)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data: { docs: Book[] }) => {
            const books = data.docs;
            if (books.length > 0) {
                books.forEach(book => {
                    const bookElement = document.createElement('div');
                    bookElement.classList.add('book-result', 'mb-3', 'p-3', 'border', 'rounded');
                    bookElement.innerHTML = `
                        <h3>${book.title}</h3>
                        <p><strong>Author:</strong> ${book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
                        <p><strong>First published:</strong> ${book.first_publish_year || 'Unknown'}</p>
                    `;
                    resultsContainer.appendChild(bookElement);
                });
            } else {
                resultsContainer.innerHTML = '<p>No books found.</p>';
            }
        })
        .catch(error => {
            resultsContainer.innerHTML = `<p>An error occurred while searching for books: ${error.message}</p>`;
            console.error('Error fetching book data:', error);
        });
}

