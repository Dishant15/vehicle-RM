import React from 'react';
import { Link } from "react-router";
import { connect } from "react-redux";

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
		this.props.dispatch(logout())
	}

	renderSettingsButton() {
		return(<span> | <Link to="change-pass"><span class="glyphicon glyphicon-cog"></span></Link></span>)
	}

	renderLogoutButton() {
		if(this.props.logged){
			return(<span> | <a href="#" onClick={this.logout.bind(this)}><span class="glyphicon glyphicon-off"></span></a></span>)
		}
	}

	render(){
		const marginAll = {
			margin: "30px"
		};
		return(
			<div class="text-center">
				<div class="header" style={marginAll}>
					<Link to="/"><span class="glyphicon glyphicon-home"></span></Link>
					{this.renderSettingsButton.bind(this)()}
					{this.renderLogoutButton.bind(this)()}
				</div>
			</div>
		);
	}
}