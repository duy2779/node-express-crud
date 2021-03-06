const express = require('express');
const router = express.Router();

var controller = require('../controller/user.controller');
var validate = require('../validates/user.validate');

router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/create', controller.create);
router.post('/create',validate.postCreate ,controller.postCreate);
router.get('/:id', controller.detail);
router.post('/edit/:id', controller.edit);
router.get('/delete/:id', controller.delete);

module.exports = router;