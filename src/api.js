const express = require('express');
const middlewares = require('./database/middlewares/verifyUser');
const controllerLogin = require('./database/controllers/ControllerLogin');
const controllerUser = require('./database/controllers/ControlerUser');
const validateToken = require('./database/middlewares/validateToken');

const app = express();

app.use(express.json());

app.get('/user', validateToken.validateToken, controllerUser.listUsers);
app.post('/login', middlewares.validateLogin, controllerLogin.login);
app.post('/user', middlewares.validateUser, controllerUser.createUser);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
