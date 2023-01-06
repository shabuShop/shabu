const path = require('path');

const express = require('express');

const loginController = require('../controllers/login')

const router = express.Router();

router.get('/', loginController.getLogin);
router.get('/logout', loginController.logout);


router.post('/', loginController.postLogin_valid);

module.exports = router;
