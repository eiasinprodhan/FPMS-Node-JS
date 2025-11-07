// Dependencies
const express = require('express');
const dotenv = require('dotenv');

// Initialize Express app
const app = express();

// Load environment variables from .env.local file
dotenv.config();

// Middleware to parse JSON requests
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
