require('dotenv').config()

const express = require('express');
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const productRoute = require('./routes/product.route');

const authMiddleware = require('./middlewares/auth.middleware');

const port = 3000;

const app = express();
var cookieParser = require('cookie-parser')

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'));

app.use(cookieParser(process.env.SESSION_SECRET))

app.get('/', function (req, res) {
    res.render('index', {
        name: 'aaa'
    });
});

app.use('/users',authMiddleware.requireAuth ,userRoute);
app.use('/auth', authRoute);
app.use('/product', productRoute);

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});