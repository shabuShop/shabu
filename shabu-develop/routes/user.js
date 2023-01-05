const path = require('path');

const express = require('express');

const productsController = require('../controllers/products')

const router = express.Router();

router.get('/1', productsController.getProducts);

module.exports = router;
