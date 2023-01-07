exports.getSale = (req, res,next) => {
    if(req.session.role){
        res.render('module/sale', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role
        });
    }else{
        res.redirect("/");
    }
};