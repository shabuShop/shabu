const path = require('path');

const express = require('express');

const user = require('../controllers/user')

const router = express.Router();

router.get('/', user.getEmployee);

module.exports = router;
