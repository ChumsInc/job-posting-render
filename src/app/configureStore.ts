import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux";
import alertsReducer from "../ducks/alerts";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import jobsReducer from "../ducks/jobs";

const rootReducer = combineReducers({
    alerts: alertsReducer,
    jobs: jobsReducer
})


const store = configureStore({
    reducer: rootReducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default store;
