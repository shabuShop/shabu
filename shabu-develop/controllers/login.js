
const login = require('../models/login')


exports.logout = (req, res) => {
    // Destroy all session
    req.session.destroy(function(err){});
    res.redirect('/');
};

exports.getLogin = (req, res) => {
    if(req.session.user_id){
        if(req.session.role == "a"){
            res.redirect("/admin");
        }else if(req.session.role == "e"){
            res.redirect("/user");
        }
    }else{
        res.render('login', {data:[]});
    }
};

exports.postLogin_valid = (req, res) => {
    let getLogin=login.valid(req.body.username,req.body.pass);
    if(getLogin.status == 1){
        req.session.user_id = getLogin.user_id;
        req.session.user = getLogin.user;
        req.session.role = getLogin.role;
        res.redirect('/');
    }else{
        res.render('login',{data:getLogin})
    }
    
};
