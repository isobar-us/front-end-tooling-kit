var express = require('express');
var router = express.Router();

/* GET API listings. */
router.get('/:collection/:itemId?', function(req, res, next) {

	var key = req.params.collection;

	if ( (key === 'products') || (key === 'categories') ) {

		var db = req.db;
		var collection = db.get(key);
		var findObj = {};
		var opts = { sort:{name:1} };

		if (key === 'products') {

			var categoryId = req.params.itemId;
			if (typeof categoryId !== 'undefined') {
				findObj = {'categories':parseInt(categoryId, 10)};
			}

			var sort = req.query.sort;
			if ( (typeof sort !== 'undefined') && (sort.indexOf('price') === 0) )  {
				if (sort === 'pricedesc') {
					opts = { sort:{price:-1} };
				} else {
					opts = { sort:{price:1} };
				}
			}

		}

		collection.find(findObj,opts,function(e,docs){
			res.json(docs);
		});

	}

});

module.exports = router;