const path = require('path');

const express = require('express');

const conUser = require('../controllers/admin')


const conManage_employee = require('../controllers/manage/manage_employee')
const conManage_buffet = require('../controllers/manage/manage_buffet')

const conManage_food = require('../controllers/manage/manage_food')
const conManage_material = require('../controllers/manage/manage_material')
const conManage_expense = require('../controllers/manage/manage_expense')

const conManage_foodCategory = require('../controllers/manage/manage_foodCategory')
const conManage_table = require('../controllers/manage/manage_table')
const conManage_countingUnit = require('../controllers/manage/manage_countingUnit')



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
router.get('/buffet_detail', conManage_buffet.getBuffet_detail);
router.post('/buffet_detail/:action', conManage_buffet.setBuffet_detail);


router.get('/manage_food', conManage_food.getFood);
router.post('/manage_food/:action', conManage_food.setFood);


router.get('/manage_material', conManage_material.getMaterial);
router.post('/manage_material/:action', conManage_material.setMaterial);

router.get('/material_detail', conManage_material.getMaterial_detail);
router.post('/material_detail/:action', conManage_material.setSet_materials_detail);


router.get('/manage_expense', conManage_expense.getExpense);
router.post('/manage_expense/:action', conManage_expense.setExpense);


router.get('/manage_foodCategory', conManage_foodCategory.getFoodCategory);
router.post('/manage_foodCategory/:action', conManage_foodCategory.setFoodCategory);

router.get('/manage_table', conManage_table.getTable);
router.post('/manage_table/:action', conManage_table.setTable);

router.get('/manage_countingUnit', conManage_countingUnit.getCountingUnit);
router.post('/manage_countingUnit/:action', conManage_countingUnit.setCountingUnit);




// ====================== Route รับวัตถุดิบเข้า======================
router.get('/set_materials', conSet_materials.getSet_materials);
router.get('/set_materials_detail', conSet_materials.getSet_materials_detail);
router.post('/set_materials_detail/:action', conSet_materials.setSet_materials_detail);




// ====================== Route เปิดการขาย ======================
router.get('/open_sale', conOpen_sale.getOpen_sale);
router.post('/open_sale/:action', conOpen_sale.setOpen_sale);

// ====================== Route การขาย ======================
router.get('/sale', conSale.getSale);
router.get('/sale_table', conSale.getSale_table);
router.post('/sale_table/:action', conSale.setSale_table);



// ====================== Route การ Stock ======================
router.get('/stock', conStock.getStock);
router.post('/stock_detail/:action', conStock.setStock_detail);
router.get('/stock_detail', conStock.getStock_detail);
router.get('/stock_summary', conStock.getStock_summary);

// ====================== Route รายจ่าย ======================
router.get('/expenses', conExpenses.getExpenses);

// ====================== Route ออกรายงาน ======================
router.get('/report', conReport.getReport);






module.exports = router;
