const express = require('express');
const User = require('../controllers/user');
const userRoute = express.Router();
const auth = require('../middlewares/auth');

userRoute.post('/register', User.register);
userRoute.post('/login', User.login);
userRoute.delete('/:id', auth, User.destroy);
userRoute.put('/:id', auth, User.update);

module.exports = userRoute;