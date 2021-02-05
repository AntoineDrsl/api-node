const express = require('express');
const Response = require('../controllers/response');
const responseRoute = express.Router();

responseRoute.get('/:id', Response.getResponseById);
responseRoute.post('/', Response.createResponse);
responseRoute.put('/:id', Response.updateResponse);
responseRoute.delete('/:id', Response.removeResponseById);

module.exports = responseRoute;