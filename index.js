// IMPORTS
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Import des routes
const questionRoute = require('./routes/question.route');
const userRoute = require('./routes/user.route');
const quizzRoute = require('./routes/quizz.route');

app.use('/question', questionRoute);
app.use('/user', userRoute);
app.use('/quizz', quizzRoute);

server.listen(7070, () => console.log('Server started at port : 7070'));
