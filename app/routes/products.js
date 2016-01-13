import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';
import {RoutingContext, match} from 'react-router';
import {Map} from 'immutable';
import createLocation from 'history/lib/createLocation';
import {makeStore} from '../scripts/store';
import {hasSubscribers, publish, reset} from '../scripts/isomorphic';
import {routes} from '../scripts/routes';

const router = express.Router();

router.get('/:categoryId?', function(req, res, next) {

	function renderError(status, message) {
    res.status(status);
    res.render('error', {
      message: message,
      error: {}
    });
  }

  function renderSuccess(markup, initialState) {
    res.render('home', {
      markup: markup,
      initialState: encodeURI(JSON.stringify(initialState)),
      title: 'Express App'
    });
  }

  function getMarkupAsString(renderProps, store) {
    let initialElement = (
      <RoutingContext {...renderProps} />
    );
    let markup = ReactDOMServer.renderToString(
      <Provider store={store}>
        {initialElement}
      </Provider>
    );
    return markup;
  }

  // first mount components based on route to identify which require async loading
  let location = createLocation(req.originalUrl);
  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (error) {
      renderError(500, error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      reset();
      // generate markup based on route. if any components have async data they will start to load.
      // if there were subscribers, set up a publish callback to regenerate markup once loads are complete
      // else if none subscribed, render final markup
      // create a data store with current url info
      let store = makeStore( Map({url:Map({params:req.params, query:req.query, path:req.originalUrl})}) );
      let markup = getMarkupAsString(renderProps, store);
      if (hasSubscribers()) {
        publish(req.originalUrl, req.params, req.query, function(){
          renderSuccess(getMarkupAsString(renderProps, store), store.getState().toJS());
        });
      } else {
        renderSuccess(markup, store.getState().toJS());
      }
    } else {
      renderError(404, 'Not Found');
    }
  });

});

module.exports = router;