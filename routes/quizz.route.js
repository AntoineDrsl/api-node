const express = require('express');
const Quizz = require('../controllers/quizz');
const quizzRoute = express.Router();
const auth = require('../middlewares/auth');

quizzRoute.get('/', Quizz.getAllQuizzs);
quizzRoute.get('/:id', Quizz.getQuizzById);
quizzRoute.get('/:id/all', Quizz.getAllQuizzById);

quizzRoute.post('/', Quizz.createQuizz);
quizzRoute.post('/all', Quizz.createAllQuizz);
quizzRoute.put('/:id', Quizz.UpdateQuizzById);
quizzRoute.delete('/:id', auth, Quizz.RemoveQuizzById);

module.exports = quizzRoute;