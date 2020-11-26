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
    var errors = [];
    if(!data.name){
        errors.push('Name is required');
    }
    if(!data.phone){
        errors.push('Phone is required');
    }
    if(errors.length){
        res.render('user/create',{
            errors:errors,
            values:data
        });
        return;
    }
    data.id = shortid.generate()
    db.get('users').push(data).write();
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