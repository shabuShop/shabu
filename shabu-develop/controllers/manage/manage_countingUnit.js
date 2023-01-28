
const data_manage = require('../../models/manage/manage_countingUnit')



exports.getCountingUnit = async (req, res) => {
    let couting_unit = await data_manage.getCount_Unit().then((data)=>{return data})
    if(req.session.role == "admin"){
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            couting_unit:couting_unit,
            error: parseInt( req.query.error ) || 0 ,
            file:'manage/manage_countingUnit'
        });
        
    }else{
        res.redirect("/");
    }
};

exports.setCountingUnit =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){

            let isVali = await data_manage.getValidation_NAME(req.body).then((data)=>{return data})
            if(isVali === true){
                data_manage.setCount_Unit(req.body).then(()=>{
                    res.redirect("/admin/manage_countingUnit");
                });
            }else{
                res.redirect("/admin/manage_countingUnit?error=1");
            }
            
        }else if(req.params.action === "delete"){

            data_manage.deleteCount_Unit(req.body).then(()=>{
                res.redirect("/admin/manage_countingUnit");
            });

        }else if(req.params.action === "update"){

            let isVali = await data_manage.getValidation_NAME_update(req.body).then((data)=>{return data})
            if(isVali === true){
                data_manage.updateCount_Unit(req.body).then(()=>{
                    res.redirect("/admin/manage_countingUnit");
                });
            }else{
                res.redirect("/admin/manage_countingUnit?error=1");
            }
            
        }
    }else{
        res.redirect("/");
    }
};
