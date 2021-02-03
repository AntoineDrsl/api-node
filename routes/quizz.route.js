const express = require('express');
const Quizz = require('../controllers/quizz');
const quizzRoute = express.Router();

quizzRoute.get('/', Quizz.getAllQuizz);
quizzRoute.get('/:id', Quizz.getQuizzById);

quizzRoute.post('/', Quizz.createQuizz);
quizzRoute.put('/:id', Quizz.UpdateQuizzById);
quizzRoute.delete('/:id', Quizz.RemoveQuizzById);

module.exports = quizzRoute;