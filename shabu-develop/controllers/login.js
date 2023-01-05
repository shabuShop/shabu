
const login = require('../models/login')


exports.getLogin = (req, res) => {
    res.render('login', {});
};

exports.postLogin_valid = (req, res) => {
    let login_state=login.valid(req.body.username,req.body.pass);
    res.render('pageTest',{data:login_state})
};
