var db = require('../db')
var md5 = require('md5')

module.exports.login = function (req, res) {
    res.render('auth/login.pug');
}

module.exports.postLogin = function (req, res) {
    var email = req.body.email;
    var user = db.get('users').find({ email: email }).value();

    if (!user) {
        res.render('auth/login', {
            errors: ['User does not exist.'],
            values: req.body
        })
        return;
    }
    var hashPassword = md5(req.body.password)
    if (user.password !== hashPassword) {
        res.render('auth/login', {
            errors: ['Password wrong.'],
            values: req.body
        })
        return;
    }
    res.cookie('userId', user.id, {
        signed: true
    });
    res.redirect("/users");
}