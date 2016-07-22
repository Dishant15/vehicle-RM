import React from 'react';
import { connect } from "react-redux";

import { passwordValidated } from "../actions";

@connect((store) => {
	return {
		pass: store.pass,
		something: "not what you think"
	};
})
export default class Index extends React.Component {

	passwordAdded(){
		this.props.dispatch(passwordValidated(3));
	}

	render(){
		let handlePass;
		if(this.props.pass.valide){
			handlePass = (<h1>Password entered</h1>);
		}

		return(
			<div class="text-center">
				<div class="jumbotron">
					<h2>Welcome to Vehicle resource management software!!</h2>
					<p>Please enter password below to get started</p>
					{handlePass}
				</div>
				<button onClick={this.passwordAdded.bind(this)} class="btn btn-warning">Update pass</button>
			</div>
		)
	}
}