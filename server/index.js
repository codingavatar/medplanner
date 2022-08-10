const express = require('express');
const path = require('path');
const controllers = require('./controllers.js');
require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

const router = express.Router();

app.use('/', router);

router.get('/appts', controllers.getAppts);

router.get('/appts/:apptId', controllers.getConditions);

router.post('/appts', controllers.postAppt);

router.put('/appts/:apptId', controllers.updateQuestions);

router.put('/conditions/:conditionId', controllers.updateCondition);

const port = process.env.SERVER_PORT || 3000;
app.listen(port);
console.log(`Server listening at http://localhost:${port}`);
