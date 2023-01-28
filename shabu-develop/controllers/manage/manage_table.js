
const data_manage = require('../../models/manage/manage_table')



exports.getTable = async (req, res) => {

    let table = await data_manage.getTable().then((data)=>{return data})

    if(req.session.role == "admin"){
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            table:table,
            error: parseInt( req.query.error ) || 0 ,
            file:'manage/manage_table'
        });
        
    }else{
        res.redirect("/");
    }
};

exports.setTable =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){

            let isVali = await data_manage.getValidation_NAME(req.body).then((data)=>{return data})
            if(isVali === true){
                await data_manage.setTable(req.body).then(()=>{});
                let maxID = await data_manage.getTable_maxID().then((data)=>{return data});
                await data_manage.setTable_Status({id:maxID}).then((data)=>{});
                res.redirect("/admin/manage_table");


            }else{
                res.redirect("/admin/manage_table?error=1");
            }
            
        }else if(req.params.action === "delete"){

            data_manage.deleteTable(req.body).then(()=>{
                res.redirect("/admin/manage_table");
            });

        }else if(req.params.action === "update"){

            let isVali = await data_manage.getValidation_NAME_update(req.body).then((data)=>{return data})
            if(isVali === true){
                data_manage.updateTable(req.body).then(()=>{
                    res.redirect("/admin/manage_table");
                });
            }else{
                res.redirect("/admin/manage_table?error=1");
            }
            
        }
    }else{
        res.redirect("/");
    }
};
