
const express = require('express');
const axios = require('axios');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const PORT = 3000;
// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
// Middleware for handling JSON
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome User!');
});

// Update Operation: PUT route to modify an existing item based on its identifier
app.put('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex(i => i.id === itemId);
    if (itemIndex === -1) {
        return res.status(404).send('Item not found');
    }

    // Update the item
    items[itemIndex] = {
        ...items[itemIndex],
        ...req.body
    };
    res.json(items[itemIndex]);
});

// Delete Operation: DELETE route that removes an item based on its identifier
app.delete('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex(i => i.id === itemId);
    if (itemIndex === -1) {
        return res.status(404).send('Item not found');
    }

    // Remove the item from the array
    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem[0]);
});

// Error handling for invalid JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ error: 'Invalid JSON' });
    }
    next();
});
// Route to safely fetch users with error handling
app.get('/safeusers', async (req, res) => {
    try {
        // Attempt to fetch data from an external API
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        // Check if the response status is not 200
        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        }
        // Send the API data back to the client
        res.json(response.data);
    } catch (error) {
        // Send an error response to the client
        res.status(500).json({ message: error.message || 'Unknown error' });
    }
});
