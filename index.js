// IMPORTS
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');

// Import des routes
const questionRoute = require('./routes/question.route');
const quizzRoute = require('./routes/quizz.route');
const responseRoute = require('./routes/response.route');

app.use(bodyParser.json());
app.use('/quizz', quizzRoute);
app.use('/question', questionRoute);
app.use('/response', responseRoute);

server.listen(7070, () => console.log('Server started at port : 7070', __dirname));
