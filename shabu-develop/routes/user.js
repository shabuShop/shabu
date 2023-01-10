const path = require('path');

const express = require('express');

const user = require('../controllers/user')

const conSet_materials = require('../controllers/manage/set_materials')
const conSale = require('../controllers/manage/sale')

const router = express.Router();

router.get('/', user.getEmployee);


// ====================== Route รับวัตถุดิบเข้า======================
router.get('/set_materials', conSet_materials.getSet_materials);

// ====================== Route การขาย ======================
router.get('/sale', conSale.getSale);


module.exports = router;
