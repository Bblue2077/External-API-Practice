"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
// CORS options
const corsOptions = {
    origin: '*',
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
// Middleware to enable CORS
app.use((0, cors_1.default)(corsOptions));
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Root route
app.get('/:title', async (req, res) => {
    try {
        // Making a GET request using axios
        const response = await axios_1.default.get(`https://openlibrary.org/search.json?title=${req.params.title}`);
        // Sending the response data back to the client
        res.json(response.data);
    }
    catch (error) {
        // Error handling if the API call fails
        res.status(500).json({ message: 'Error fetching data' });
    }
});
// Configure the server to listen on port 3000
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
