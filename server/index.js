const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

const router = express.Router();

// app.use('/appts', router.get(''));

const port = 3000;
console.log(`Server listening at http://localhost:${port}`);
