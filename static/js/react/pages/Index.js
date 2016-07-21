import React from 'react';

export default class Index extends React.Component {
	constructor(){
		super();
		this.state = {
			password:null
		};
	}

	passwordAdded(){
		this.setState({
			password:"set"
		});
	}

	render(){
		let handlePass;
		if(this.state.password){
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