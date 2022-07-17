const express = require('express');
const { middlewareValidateToken } = require('../middlewares/validateToken');
const middlewares = require('../middlewares/verifyUser');
const controllerUser = require('../controllers/ControlerUser');

const router = express.Router();

router.get('/', middlewareValidateToken, controllerUser.listUsers);
router.get('/:id', middlewareValidateToken, controllerUser.findById);
router.post('/', middlewares.validateUser, controllerUser.createUser);

router.delete('/me', middlewareValidateToken, controllerUser.deleteAccount);

module.exports = router;