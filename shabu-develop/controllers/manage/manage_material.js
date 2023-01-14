
const data_manage = require('../../models/manage/manage_material')



exports.getMaterial =async (req, res) => {
    if(req.session.role == "admin"){
        let material = await (data_manage.getMaterial().then((data)=>{return data}));
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            material:material,
            file:'manage/manage_material'
        });
    }else{
        res.redirect("/");
    }
};

exports.setMaterial =async (req, res) => {

    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            data_manage.setMaterial(req.body).then(()=>{
                res.redirect("/admin/manage_material");
            });
        }else if(req.params.action === "delete"){
            data_manage.deleteMaterial(req.body).then(()=>{
                res.redirect("/admin/manage_material");
            });
        }else if(req.params.action === "update"){
            data_manage.updateMaterial(req.body).then(()=>{
                res.redirect("/admin/manage_material");
            });
        }
    }else{
        res.redirect("/");
    }
};
