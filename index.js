function searchBook() {
    const title = document.getElementById('book-title').value.trim();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (title === '') {
        resultsContainer.innerHTML = '<p>Please enter a book title to search.</p>';
        return;
    }

    fetch(`http://localHost:3001/${encodeURIComponent(title)}`)
        .then(response => response.json())
        .then(data => {
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
                resultsContainer.innerHTML = '<p>Oops it looks like the text you are looking for is unavailable. If you would like to submit a text please redirect to our contact page and we would be happy to assist</p>';
            }
        })
        .catch(error => {
            resultsContainer.innerHTML = '<p>An error occurred while searching for books.</p>';
            console.error('Error fetching book data:', error);
        });
}