const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// CORS options
const corsOptions = {
   origin: '*', 
   credentials: true, // access-control-allow-credentials:true
   optionSuccessStatus: 200,
};

// Middleware to enable CORS
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Root route
app.get('/:title', async (req, res) => {
    try {
        // Making a GET request using axios
        const response = await axios.get(`https://openlibrary.org/search.json?title=${req.params.title}`);
        // Sending the response data back to the client
        res.json(response.data);
    } catch (error) {
        // Error handling if the API call fails
        res.status(500).json({ message: 'Error fetching data' });
    }
});
// Configure the server to listen on port 3000
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
