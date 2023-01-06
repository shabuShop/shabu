




exports.getEmployee = (req, res,next) => {
    if(req.session.role == "e"){
        res.render('main_page', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:"Employee"
        });
    }else{
        res.redirect("/");
    }
};


