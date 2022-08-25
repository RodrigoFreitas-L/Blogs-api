const express = require('express');

// ...

const usersController = require('./controllers/usersController');

const app = express();

app.use(express.json());

app.post('/login', usersController.login);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
