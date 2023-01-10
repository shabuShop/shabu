
const data_manage = require('../../models/module/manage')


exports.getEmployee = (req, res) => {
    // get db of employee
    if(req.session.role == "admin"){
        data_manage.getData_Employee().then((data)=>{
            res.render('template', {
                session_user_id:req.session.user_id,
                session_user:req.session.user,
                session_role:req.session.role,
                data_employee:data,
                file:'manage/manage_employee'
            });
    
        });
        
    }else{
        res.redirect("/");
    }
};
exports.getFood = (req, res) => {
    if(req.session.role == "admin"){
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            file:'manage/manage_food'
        });
    }else{
        res.redirect("/");
    }
};
exports.getMaterial = (req, res) => {
    if(req.session.role == "admin"){
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            file:'manage/manage_material'
        });
    }else{
        res.redirect("/");
    }
};
exports.getExpense = (req, res) => {
    if(req.session.role == "admin"){
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            file:'manage/manage_expense'
        });
    }else{
        res.redirect("/");
    }
};

