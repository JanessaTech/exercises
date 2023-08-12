var express = require('express')
var app = express()
app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.static('public'));

app.get('/first_template', function(req, res) {
    res.render('first_view')
})

app.listen(3000)
// visit: http://localhost:3000/first_template