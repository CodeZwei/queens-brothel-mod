const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile('index.html'));

app.listen(port, () => console.log(`Server listening on port ${port}!`));