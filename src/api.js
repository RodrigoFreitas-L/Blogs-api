const express = require('express');
const validateJWT = require('./auth/validateJWT');
// ...

const usersController = require('./controllers/usersController');
const validateUser = require('./middlewares/validateUser');

const app = express();

app.use(express.json());

app.post('/login', usersController.login);

app.post('/user', validateUser.validateFields, validateUser.alreadyExists, usersController.create);

app.get('/user', validateJWT, usersController.findAll);

app.get('/user/:id', validateJWT, usersController.findById);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
