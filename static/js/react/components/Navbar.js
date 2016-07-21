import React from 'react';
import { Link } from "react-router";

export default class Navbar extends React.Component {

	render(){
		return(
			<div class="text-center">
				<div class="header">
					<Link to="/"><span class="glyphicon glyphicon-home"></span></Link>
				</div>
			</div>
		);
	}
}