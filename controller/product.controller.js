var db = require('../db');

module.exports.index = function (req, res) {
    var products = db.get("products").value();
    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    var maxPage = Math.ceil(products.length/perPage);

    res.render('products/index', {
        products: products.slice(start, end),
        page:page,
        prevPage:page-1,
        nextPage:page+1,
        maxPage:maxPage
    });
}