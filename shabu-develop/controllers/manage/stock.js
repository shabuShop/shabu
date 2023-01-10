exports.getStock = (req, res,next) => {
    if(req.session.role == "admin"){
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            file:'manage/stock'
        });
    }else{
        res.redirect("/");
    }
};