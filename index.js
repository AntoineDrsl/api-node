// IMPORTS
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');

// Import des routes
const questionRoute = require('./routes/question.route');
const quizzRoute = require('./routes/quizz.route');

app.use(bodyParser.json());
app.use('/quizz', quizzRoute);
app.use('/question', questionRoute);

server.listen(7070, () => console.log('Server started at port : 7070', __dirname));
