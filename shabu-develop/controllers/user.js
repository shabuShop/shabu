




exports.getEmployee = (req, res,next) => {
    if(req.session.role == "user"){
        res.render('main_page', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role
        });
    }else{
        res.redirect("/");
    }
};


