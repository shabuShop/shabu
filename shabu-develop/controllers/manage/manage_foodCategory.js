
const data_manage = require('../../models/manage/manage_foodCategory')



exports.getFoodCategory = async (req, res) => {
    let category = await data_manage.getFood_category().then((data)=>{return data})
    if(req.session.role == "admin"){
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            category:category,
            error: parseInt( req.query.error ) || 0 ,
            file:'manage/manage_foodCategory'
        });
        
    }else{
        res.redirect("/");
    }
};

exports.setFoodCategory =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){

            let isVali = await data_manage.getValidation_NAME(req.body).then((data)=>{return data})
            if(isVali === true){
                data_manage.setFood_category(req.body).then(()=>{
                    res.redirect("/admin/manage_foodCategory");
                });
            }else{
                res.redirect("/admin/manage_foodCategory?error=1");
            }
            
        }else if(req.params.action === "delete"){

            data_manage.deleteFood_category(req.body).then(()=>{
                res.redirect("/admin/manage_foodCategory");
            });

        }else if(req.params.action === "update"){

            let isVali = await data_manage.getValidation_NAME_update(req.body).then((data)=>{return data})
            if(isVali === true){
                data_manage.updateFood_category(req.body).then(()=>{
                    res.redirect("/admin/manage_foodCategory");
                });
            }else{
                res.redirect("/admin/manage_foodCategory?error=1");
            }
            
        }
    }else{
        res.redirect("/");
    }
};
