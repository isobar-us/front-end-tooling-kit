import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';
import {RoutingContext, match} from 'react-router';
import {Map} from 'immutable';
import createLocation from 'history/lib/createLocation';
import {makeStore} from '../scripts/store';
import {loadStoreData, publish} from '../scripts/isomorphic';
import {routes} from '../scripts/routes';

const router = express.Router();

router.get('/:categoryId?', function(req, res, next) {

	// create a data store with current url info
	const store = makeStore( Map({url:Map({params:req.params, query:req.query, path:req.originalUrl})}) );

  // first mount components based on route to identify which require async loading
  let location = createLocation(req.originalUrl);
  match({routes, location}, (error, redirectLocation, renderProps) => {
    let initialElement = (
      <RoutingContext {...renderProps} />
    );
    let markup = ReactDOMServer.renderToString(
      <Provider store={store}>
        {initialElement}
      </Provider>
    );
    // in theory if we have no matching route, or we have no async subscribers
    // we could render html here...
    //if (error) {
    //  res.status(500).send(error.message)
    //} else if (redirectLocation) {
    //  res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    //} else if (renderProps) {
    //  res.status(200).send(renderToString(<RouterContext {...renderProps} />))
    //} else {
    //  res.status(404).send('Not found')
    //}
  });

  // publish to components that require async loading
  // when all our loaded, or if none subscribed, render final markup
	publish(req.originalUrl, req.params, req.query, function(){
    let initialState = store.getState().toJS();
    match({routes, location}, (error, redirectLocation, renderProps) => {
      let initialElement = (
        <RoutingContext {...renderProps} />
      );
      let markup = ReactDOMServer.renderToString(
        <Provider store={store}>
          {initialElement}
        </Provider>
      );
      res.render('home', {
        markup: markup,
        initialState: encodeURI(JSON.stringify(initialState)),
        title: 'Express App'
      });
    });
  });

});

module.exports = router;