const express = require('express');
const Question = require('../controllers/question');
const questionRoute = express.Router();

questionRoute.get('/:id', Question.getQuestionById);

questionRoute.post('/', Question.createQuestion);
questionRoute.put('/:id', Question.updateQuestion);
questionRoute.delete('/:id', Question.RemoveQuestionById);

module.exports = questionRoute;