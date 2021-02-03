const express = require('express');
const Question = require('../controllers/question');
const questionRoute = express.Router();

questionRoute.get('/', Question.getAllQuizz);
questionRoute.get('/:id', Question.getQuizzById);

questionRoute.post('/', Question.createQuizz);
questionRoute.put('/:id', Question.UpdateQuizzById);
questionRoute.delete('/:id', Question.RemoveQuizzById);

module.exports = questionRoute;