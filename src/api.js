const express = require('express');
const users = require('./database/routes/users');
const login = require('./database/routes/login');
const categories = require('./database/routes/categories');
const posts = require('./database/routes/posts');

const app = express();

app.use(express.json());

app.use('/user', users);
app.use('/login', login);
app.use('/categories', categories);
app.use('/post', posts);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
