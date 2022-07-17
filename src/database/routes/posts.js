const express = require('express');
const validatePost = require('../middlewares/validatePost');
const { middlewareValidateToken } = require('../middlewares/validateToken');
const controllerPost = require('../controllers/ControllerPost');

const router = express.Router();

router.get('/search', middlewareValidateToken, controllerPost.searchPost);
router.get('/:id', middlewareValidateToken, controllerPost.findById);
router.put('/:id',
  middlewareValidateToken,
  validatePost.validateUpdatePost,
  controllerPost.updatedPost);

router.get('/',
  middlewareValidateToken,
  controllerPost.listAll);

router.post('/',
  middlewareValidateToken,
  validatePost.validatePost,
  controllerPost.createPost);

router.delete('/:id', middlewareValidateToken, controllerPost.deletePost);

module.exports = router;