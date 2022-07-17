const express = require('express');
const controllerCategory = require('../controllers/ControllerCategory');
const { middlewareValidateToken } = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', middlewareValidateToken, controllerCategory.createCategory);
router.get('/', middlewareValidateToken, controllerCategory.listCategories);

module.exports = router;