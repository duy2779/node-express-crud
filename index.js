const express = require('express');
const userRoute = require('./routes/user.route')

const port = 3000;

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index', {
        name: 'aaa'
    });
});

app.use('/users', userRoute);

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});