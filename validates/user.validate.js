module.exports.postCreate = function (req, res, next) {
    data = req.body;
    var errors = [];
    if (!data.name) {
        errors.push('Name is required');
    }
    if (!data.phone) {
        errors.push('Phone is required');
    }
    if (errors.length) {
        res.render('user/create', {
            errors: errors,
            values: data
        });
        return;
    }
    res.locals.success = true;
    next();
}