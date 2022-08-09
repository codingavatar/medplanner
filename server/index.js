const express = require('express');
const path = require('path');
const controllers = require('./controllers.js');
require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

const router = express.Router();

app.use('/appts', router.get('', controllers.getAppts));

app.use('/appts', router.get('/:apptId', controllers.getConditions));

app.use('/appts', router.post('', controllers.postAppt));

const port = process.env.SERVER_PORT || 3000;
app.listen(port);
console.log(`Server listening at http://localhost:${port}`);
