import React from 'react';
import { Link } from "react-router";

import Navbar from "./components/Navbar";

export default class Layout extends React.Component {

	render(){
		return(
			<div class="container">
				<Navbar/>
				{this.props.children}
				<hr/>
				<div class="text-center text-warning">
					<small>Created by Dishant Chavda</small>
				</div>
				<br/>
			</div>
		);
	}
}