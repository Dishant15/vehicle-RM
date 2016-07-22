import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { passReducer, vehicleReducer, priceReducer, couponReducer } from "./reducers";

const reducers = combineReducers({
	pass : passReducer,
	vehicles : vehicleReducer,
	prices : priceReducer,
	coupon : couponReducer
});

const middleware = applyMiddleware(thunk);

const store = createStore(reducers, middleware);

export default store;