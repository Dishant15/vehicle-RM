import React from 'react';
import { Link } from "react-router";
import { connect } from "react-redux";
import { hashHistory } from "react-router";

import { logout } from "../actions";

@connect((store) => {
	return {
		logged: store.pass.valide,
		pass_level: store.pass.level
	};
})
export default class Navbar extends React.Component {
	logout(e){
		e.preventDefault();
		this.props.dispatch(logout());
		hashHistory.push("/");
	}

	renderLogoutButton() {
		if(this.props.logged){
			return(
				<a href="#" onClick={this.logout.bind(this)}>
					<div class="box">
						<span class="glyphicon glyphicon-off"></span>
						<div>Logout</div>
					</div>
				</a>
			)
		}
	}

	render(){
	
		return(
			<div class="menubar">
				<Link to="/">
					<div class="box">
						<span class="glyphicon glyphicon-home"></span>
						<div>Home</div>
					</div>
				</Link>

				{this.renderLogoutButton.bind(this)()}

				<Link to="change-pass">
					<div class="box">
						<span class="glyphicon glyphicon-cog"></span>
						<div>Password</div>
					</div>
				</Link>
			</div>
		);
	}
}