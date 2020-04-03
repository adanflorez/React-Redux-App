import { combineReducers } from 'redux';
import storeReducer from './store/reducers'
import authReducer from './auth/reducers';

export default combineReducers({
    user: authReducer,
    store: storeReducer
});