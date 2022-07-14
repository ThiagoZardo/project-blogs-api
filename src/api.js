const express = require('express');
const middlewares = require('./database/middlewares/verifyUser');
const controllerLogin = require('./database/controllers/ControllerLogin');
const controllerUser = require('./database/controllers/ControlerUser');
const validateToken = require('./database/middlewares/validateToken');
const controllerCategory = require('./database/controllers/ControllerCategory');

const app = express();

app.use(express.json());

app.post('/login', middlewares.validateLogin, controllerLogin.login);

app.get('/user', validateToken.validateToken, controllerUser.listUsers);
app.get('/user/:id', validateToken.validateToken, controllerUser.findById);
app.post('/user', middlewares.validateUser, controllerUser.createUser);

app.post('/categories', validateToken.validateToken, controllerCategory.createCategory);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
