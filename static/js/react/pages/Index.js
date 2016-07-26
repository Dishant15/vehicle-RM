import React from 'react';
import { connect } from "react-redux";

import { login } from "../actions";
import Home from "../components/Home";
import LoginForm from "../components/LoginForm";

@connect((store) => {
	return {
		pass_valide: store.pass.valide,
	};
})
export default class Index extends React.Component {

	passwordMatched(level){
		this.props.dispatch(login(level));
	}

	render(){
		let content;
		if(this.props.pass_valide){
			content = <Home/>;
		} else {
			content = <LoginForm passwordMatched={this.passwordMatched.bind(this)}/>;
		}

		return(
			<div class="text-center">
				{content}
			</div>
		)
	}
}