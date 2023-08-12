var express = require('express')
var router = express.Router();

router.get('/', function(req, res) {
    res.send('GET route on things')
})
router.get('/:id', function(req, res) {
    res.send('id = ' + req.params.id)
})

router.post('/', function(req, res) {
    res.send('POST route on things')
})


module.exports = router