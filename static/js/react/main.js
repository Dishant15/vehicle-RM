import ReactDom from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from './Layout';
import Index from './pages/Index';

import store from './store';

console.log(store);

const app = document.getElementById('app');

ReactDom.render(
	<Router history={hashHistory}>
		<Route path='/' component={Layout}>
			<IndexRoute component={Index}></IndexRoute>
		</Route>
	</Router>,
app);