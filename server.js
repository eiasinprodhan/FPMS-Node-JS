const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.all('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api', require('./routes/buyer.route'));
app.use('/api', require('./routes/skill.route'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});