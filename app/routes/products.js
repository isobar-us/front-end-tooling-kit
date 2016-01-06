import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';
import reducer from '../scripts/reducer';
import Products from '../scripts/products';
import constants from '../scripts/constants';
import {makeStore} from '../scripts/store';
import {loadStoreData} from '../scripts/isomorphic';
import {loadCategories,loadProducts} from '../scripts/creators';

const router = express.Router();

router.get('/:categoryId?', function(req, res, next) {
	let categoryId = req.params.categoryId;
	if (typeof categoryId === 'undefined') categoryId = '';
	let sort = req.query.sort;
	if ( (sort !== 'priceasc') && (sort !== 'pricedesc') ) sort = '';

	// create a data store, retrieve data, render markup
	const creators = [{fn:loadCategories}, {fn:loadProducts, data:[categoryId, sort]}];
	const store = makeStore();
	loadStoreData(creators, function(){
		let initialState = store.getState().toJS();
		let markup = ReactDOMServer.renderToString(
			<Provider store={store}>
				<Products />
			</Provider>
		);
		res.render('home', {
			markup: markup,
			initialState: encodeURI(JSON.stringify(initialState)),
			title: 'Express App'
		});
	});
});

module.exports = router;