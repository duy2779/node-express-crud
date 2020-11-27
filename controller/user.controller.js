var db = require('../db')

const shortid = require('shortid')

module.exports.index = function (req, res) {
    res.render('user/index', {
        users: db.get('users').value()
    });
}

module.exports.search = function (req, res) {
    let q = req.query.q;
    let matchedUsers = db.get('users').value().filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })

    res.render('user/index', {
        users: matchedUsers
    });
}

module.exports.create = function (req, res) {
    res.render('user/create');
}

module.exports.postCreate = function (req, res) {
    var data = req.body;
    data.id = shortid.generate()
    db.get('users').push(data).write();
    console.log(res.locals.success);
    res.redirect("/users");
}

module.exports.detail = function (req, res) {
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();
    res.render('user/user', {
        user: user
    });
}

module.exports.edit = function (req, res) {
    var id = req.params.id;
    db.get('users').find({id:id}).assign({name:req.body.name}).write();
    res.redirect('/users');
}

module.exports.delete = function(req, res){
    var id = req.params.id;
    db.get('users').remove({id:id}).write();
    res.redirect('/users');
}