const express = require('express');
const controllerLogin = require('../controllers/ControllerLogin');
const middlewares = require('../middlewares/verifyUser');

const router = express.Router();

router.post('/', middlewares.validateLogin, controllerLogin.login);

module.exports = router;