const express = require('express');
const Response = require('../controllers/response');
const responseRoute = express.Router();

responseRoute.post('/', Response.createResponse);

module.exports = responseRoute;