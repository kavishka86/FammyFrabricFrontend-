import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { AlertsSlice } from './AlertsSlice';
import { UserSlice } from './UserSlice';
import { EmpSlice } from './EmpSlice';


const rootReducer = combineReducers({
    alerts: AlertsSlice.reducer,
    user: UserSlice.reducer,
    employee: EmpSlice.reducer,
   
});

const Store = configureStore({
    reducer: rootReducer,
});

export default Store;
