const express = require('express');
const middlewares = require('./database/middlewares/verifyUser');
const { middlewareValidateToken } = require('./database/middlewares/validateToken');
const validatePost = require('./database/middlewares/validatePost');

const controllerLogin = require('./database/controllers/ControllerLogin');
const controllerUser = require('./database/controllers/ControlerUser');
const controllerCategory = require('./database/controllers/ControllerCategory');
const controllerPost = require('./database/controllers/ControllerPost');

const app = express();

app.use(express.json());

app.post('/login', middlewares.validateLogin, controllerLogin.login);

app.get('/user', middlewareValidateToken, controllerUser.listUsers);
app.get('/user/:id', middlewareValidateToken, controllerUser.findById);
app.post('/user', middlewares.validateUser, controllerUser.createUser);

app.post('/categories', middlewareValidateToken, controllerCategory.createCategory);
app.get('/categories', middlewareValidateToken, controllerCategory.listCategories);

app.get('/post/:id', middlewareValidateToken, controllerPost.findById);
app.put('/post/:id',
  middlewareValidateToken,
  validatePost.validateUpdatePost,
  controllerPost.updatedPost);

app.get('/post',
  middlewareValidateToken,
  controllerPost.listAll);

app.post('/post',
  middlewareValidateToken,
  validatePost.validatePost,
  controllerPost.createPost);

app.delete('/post/:id', middlewareValidateToken, controllerPost.deletePost);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
