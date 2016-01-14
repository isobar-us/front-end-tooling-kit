import request from 'superagent';
import constants from '../../constants';
import {getStore} from '../../store';

export function loadCategories(cbFn) {
  let store = getStore();
  store.dispatch({type:constants.LOAD_CATEGORIES});
  request.get(constants.API_URL_DEV+'categories').end( (err, resp) => {
    store.dispatch({type:constants.LOAD_CATEGORIES_SUCCESS, items:resp.body});
    if (typeof cbFn === 'function') cbFn();
  });
}