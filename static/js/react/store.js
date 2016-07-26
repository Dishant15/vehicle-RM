import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { passReducer, vehicleReducer, priceReducer, couponReducer } from "./reducers";
import { getHashPass, getVehicles } from "./actions";


const reducers = combineReducers({
	pass : passReducer,
	vehicles : vehicleReducer,
	prices : priceReducer,
	coupon : couponReducer
});

const store = createStore( reducers, applyMiddleware(thunk));

store.subscribe(()=>{
	console.log("Store Updated :", store.getState().vehicles);
});

store.dispatch(getHashPass());
store.dispatch(getVehicles());

export default store;