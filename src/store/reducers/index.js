// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import userData from './userReducer';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ userData, menu });

export default reducers;
