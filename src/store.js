import { createStore, compose } from 'redux';

import rootReducer from './reducers/index';

const defaultState = {
	crops: [0, 100],
};

const store = createStore(rootReducer, defaultState, compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
	));

if(module.hot) {
	module.hot.accept('./reducers/',() => {
		const nextRootReducer = require('./reducers/index').default;
		store.replaceReducer(nextRootReducer);
	});
}

export default store;
