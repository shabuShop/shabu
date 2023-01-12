const path = require('path');

const express = require('express');

const conUser = require('../controllers/admin')


const conManage_employee = require('../controllers/manage/manage_employee')
const conManage_buffet = require('../controllers/manage/manage_buffet')

const conManage_food = require('../controllers/manage/manage_food')
const conManage_material = require('../controllers/manage/manage_material')
const conManage_expense = require('../controllers/manage/manage_expense')


const conSet_materials = require('../controllers/sep_module/set_materials')
const conOpen_sale = require('../controllers/sep_module/open_sale')
const conSale = require('../controllers/sep_module/sale')
const conStock = require('../controllers/sep_module/stock')
const conExpenses = require('../controllers/sep_module/expenses')
const conReport = require('../controllers/sep_module/report')


const router = express.Router();

router.get('/', conUser.getAdmin);



// ====================== Route Manage Data ======================
router.get('/manage_employee', conManage_employee.getEmployee);
router.post('/manage_employee/:action', conManage_employee.setEmployee);


router.get('/manage_buffet', conManage_buffet.getBuffet);
router.post('/manage_buffet/:action', conManage_buffet.setBuffet);
router.post('/buffet_detail', conManage_buffet.getBuffet_detail);


router.get('/manage_food', conManage_food.getFood);
router.post('/manage_food/:action', conManage_food.setFood);


router.get('/manage_material', conManage_material.getMaterial);
router.get('/manage_expense', conManage_expense.getExpense);

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
