exports.getLogin = (req, res, next) => {
    res.render('login', {
        pageTitle: 'login',
        path: '/'
    });
};
