
const data_manage = require('../../models/manage/manage_employee')


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
            error: parseInt( req.query.error ) || 0 ,
            file:'manage/manage_employee'
        });
        
    }else{
        res.redirect("/");
    }
};

exports.setEmployee =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){

            let isVali = await data_manage.getValidation_NAME_USERNAME(req.body).then((data)=>{return data})
            if(isVali === true){
                data_manage.setData_Employee(req.body).then(()=>{
                    res.redirect("/admin/manage_employee");
                });
            }else{
                res.redirect("/admin/manage_employee?error=1");
            }
            
        }else if(req.params.action === "delete"){
            data_manage.deleteData_Employee(req.body).then(()=>{
                res.redirect("/admin/manage_employee");
            });
        }else if(req.params.action === "update"){
            let isVali = await data_manage.getValidation_NAME_update(req.body).then((data)=>{return data})
            if(isVali === true){
                data_manage.updateData_Employee(req.body).then(()=>{
                    console.log("update done");
                    res.redirect("/admin/manage_employee");
                });
            }else{
                res.redirect("/admin/manage_employee?error=2");
            }
            
        }
    }else{
        res.redirect("/");
    }
};






