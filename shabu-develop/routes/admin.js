const path = require('path');

const express = require('express');

const user = require('../controllers/admin')

const router = express.Router();

router.get('/', user.getAdmin);

module.exports = router;
