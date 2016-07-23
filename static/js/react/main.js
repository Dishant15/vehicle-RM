import ReactDom from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Provider } from "react-redux";

import Layout from './Layout';
import Index from './pages/Index';
import VehicleForm from './components/VehicleForm';
import CouponForm from './components/CouponForm';
import ChangePassForm from './components/ChangePassForm';

import store from './store';

const app = document.getElementById('app');

ReactDom.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path='/' component={Layout}>
				<IndexRoute component={Index}></IndexRoute>
				<Route path='change-pass' component={ChangePassForm}/>
				<Route path='add-coupon' component={CouponForm}/>
				<Route path='add-vehicle' component={VehicleForm}/>
			</Route>
		</Router>
	</Provider>,
app);