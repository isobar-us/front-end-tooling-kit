import express from 'express';
const router = express.Router();

/* GET API listings. */
router.get('/:collection/:itemId?', function(req, res, next) {

	const key = req.params.collection;

	if ( (key === 'products') || (key === 'categories') ) {

		let db = req.db;
		let collection = db.get(key);
    let findObj = {};
    let opts = { sort:{name:1} };

		if (key === 'products') {

      let categoryId = req.params.itemId;
			if (typeof categoryId !== 'undefined') {
				findObj = {'categories':parseInt(categoryId, 10)};
			}

      let sort = req.query.sort;
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

export {router as default};