var express = require('express');
var router = express.Router();

/* redirect homepage to products */
router.get('/', function(req, res, next) {
	res.redirect('/products');
});

module.exports = router; 