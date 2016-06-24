import { combineReducers } from 'redux';

import posts from './posts';
import crops from './crops';

const rootReducer = combineReducers({posts, crops});

export default rootReducer;
