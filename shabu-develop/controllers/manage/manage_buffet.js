
const data_manage = require('../../models/manage/manage_buffet')

exports.getBuffet =async (req, res) => {
    if(req.session.role == "admin"){
        let data_buffet = await (data_manage.getBuffet().then((data)=>{return data}));
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            data_buffet:data_buffet,
            file:'manage/manage_buffet'
        });
    }else{
        res.redirect("/");
    }
};
exports.setBuffet =(req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            data_manage.setBuffet(req.body).then(()=>{
                res.redirect("/admin/manage_buffet");
            });
        }else if(req.params.action === "delete"){
            data_manage.deleteBuffet(req.body).then(()=>{
                res.redirect("/admin/manage_buffet");
            });
        }else if(req.params.action === "update"){
            data_manage.updateBuffet(req.body).then(()=>{
                res.redirect("/admin/manage_buffet");
            });
        }
    }else{
        res.redirect("/");
    }
};


exports.getBuffet_detail=async (req, res) => {
    if(req.session.role == "admin"){
        let data_buffet_dt = await (data_manage.getBuffet_detail(req.body).then((data)=>{return data}));
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            data_buffet_dt:data_buffet_dt,
            file:'manage/manage_buffet_detail'
        });
    }else{
        res.redirect("/");
    }
};