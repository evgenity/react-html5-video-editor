import { createStore, compose, applyMiddleware} from 'redux';

import rootReducer from './reducers/index';

const defaultState = {
};

const middleware = {}

const store = createStore(rootReducer, defaultState, compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

if(module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
