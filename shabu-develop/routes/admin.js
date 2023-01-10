const path = require('path');

const express = require('express');

const conUser = require('../controllers/admin')


const conManage = require('../controllers/manage/manage')
const conSet_materials = require('../controllers/manage/set_materials')
const conOpen_sale = require('../controllers/manage/open_sale')
const conSale = require('../controllers/manage/sale')
const conStock = require('../controllers/manage/stock')
const conExpenses = require('../controllers/manage/expenses')
const conReport = require('../controllers/manage/report')

const router = express.Router();

router.get('/', conUser.getAdmin);



// ====================== Route Manage Data ======================
router.get('/manage_employee', conManage.getEmployee);
router.post('/manage_employee/:action', conManage.setEmployee);


router.get('/manage_food', conManage.getFood);
router.get('/manage_material', conManage.getMaterial);
router.get('/manage_expense', conManage.getExpense);

// ====================== Route รับวัตถุดิบเข้า======================
router.get('/set_materials', conSet_materials.getSet_materials);

// ====================== Route เปิดการขาย ======================
router.get('/open_sale', conOpen_sale.getOpen_sale);

// ====================== Route การขาย ======================
router.get('/sale', conSale.getSale);

// ====================== Route การ Stock ======================
router.get('/stock', conStock.getStock);

// ====================== Route รายจ่าย ======================
router.get('/expenses', conExpenses.getExpenses);

// ====================== Route ออกรายงาน ======================
router.get('/report', conReport.getReport);






module.exports = router;
