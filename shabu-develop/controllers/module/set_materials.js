exports.getSet_materials = (req, res,next) => {
    if(req.session.role){
        res.render('module/set_materials', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role
        });
    }else{
        res.redirect("/");
    }
};