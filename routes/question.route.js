const express = require('express');
const Question = require('../controllers/question');
const questionRoute = express.Router();

questionRoute.get('/', Question.test);

module.exports = questionRoute;