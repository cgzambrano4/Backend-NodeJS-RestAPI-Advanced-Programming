const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController');

router.post('/register/', loginController.register);
router.post('/login/', loginController.login);

module.exports = router;