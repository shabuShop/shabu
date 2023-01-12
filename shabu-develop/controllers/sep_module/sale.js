exports.getSale = (req, res,next) => {
    if(req.session.role){
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            file:'sep_module/sale'
        });
    }else{
        res.redirect("/");
    }
};