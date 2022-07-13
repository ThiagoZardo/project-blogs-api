const express = require('express');
const middlewares = require('./database/middlewares/verifyUser');
const controller = require('./database/controllers/ControllerLogin');

const app = express();

app.use(express.json());

app.post('/login', middlewares.validateLogin, controller.login);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
