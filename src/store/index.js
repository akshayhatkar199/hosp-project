// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import reducers from './reducers';
import userReducer from './reducers/userReducer';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
    reducer: reducers,
    userData: userReducer
});

const { dispatch } = store;

export { store, dispatch };
