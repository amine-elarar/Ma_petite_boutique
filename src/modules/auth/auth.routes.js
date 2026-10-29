const express = require('express');
const {register ,login} =  require('./auth.controller');

const authMiddleware = require('./auth.middleware');

const route  = express.Router();

route.post('/register', register);
route.post('/login', login);


route.get('/profile', authMiddleware, (request, response) => {
    response.status(200).json({ 
        message: "Acces autorise. Token valide.", 
        user: request.user 
    });
});

module.exports = route;
