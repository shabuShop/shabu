
const data_manage = require('../../models/module/manage')


exports.getEmployee = async (req, res) => {
    // get db of employee
    if(req.session.role == "admin"){
        let data_employee = await (data_manage.getData_Employee().then((data)=>{return data}));
        let data_position = await (data_manage.getPosition().then((data)=>{return data}));
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            data_employee:data_employee,
            data_position:data_position,
            file:'manage/manage_employee'
        });
        
    }else{
        res.redirect("/");
    }
};
exports.setEmployee = (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            data_manage.setData_Employee(req.body).then(()=>{
                res.redirect("/admin/manage_employee");
            });
        }else if(req.params.action === "delete"){
            data_manage.deleteData_Employee(req.body).then(()=>{
                res.redirect("/admin/manage_employee");
            });
        }else if(req.params.action === "update"){
            data_manage.updateData_Employee(req.body).then(()=>{
                console.log("update done");
                res.redirect("/admin/manage_employee");
            });
        }
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

