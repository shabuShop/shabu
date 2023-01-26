

const data_manage = require('../../models/manage/manage_expense')
const data_employ = require('../../models/manage/manage_employee')

const getDate = require('../../config/getDate');


exports.getExpense =async (req, res) => {
    if(req.session.role == "admin"){
        /**
         *  ID: 1,
            Exp_Date: '2023-01-16T17:00:00Z',
            Exp_Name: 'ค่าน้ำ',
            Exp_Money: 3000,
            Emp_ID: 38,
            Emp_Fname: 'ภูริกรณ์'
         */
        let expense = await (data_manage.getExpense().then((data)=>{return data}));
        // let employee = await (data_employ.getEmployee_admin().then((data)=>{return data}));
        // console.log(expense);
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            expense:expense,
            date_time:getDate.date,
            file:'manage/manage_expense'
        });
    }else{
        res.redirect("/");
    }
};



exports.setExpense =async (req, res) => {
    // console.log();
    console.log("DEBUGJ",req.body);

    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            data_manage.setExpense(req.body).then(()=>{
                res.redirect("/admin/manage_expense");
            });
        }else if(req.params.action === "delete"){
            data_manage.deleteExpense(req.body).then(()=>{
                res.redirect("/admin/manage_expense");
            });
        }else if(req.params.action === "update"){
            data_manage.updateExpense(req.body).then(()=>{
                res.redirect("/admin/manage_expense");
            });
        }
    }else{
        res.redirect("/");
    }
};
/**
 * 
 * [Object: null prototype] {
  date: '18/1/2023',
  name_exp: 'GG',
  money_exp: '50',
  type: '46'
}
 */