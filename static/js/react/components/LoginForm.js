import React from 'react';
import { checkPassLevel } from "../utils";

export default class LoginForm extends React.Component {
	constructor(){
		super();
		this.state = {
			password: "",
			error: null
		};
	}

	checkPass(){
		const password = this.state.password;
		const level = checkPassLevel(password);
		if(level){
			this.props.passwordMatched(level);
		} else {
			this.setState({
				password: "",
				error:true
			})
		}
	}

	handleChange(e) {
		this.setState({
			password: e.target.value,
			error: null
		});
	}

	renderError() {
		if(this.state.error) return( <p class='text-warning'>Incorrect Password !</p> );
	}

	render() {
		let colorBlack = {
			margin: "30px"
		};

		return (
			<div class="container">
				{this.renderError.bind(this)()}
				<div class="black-box">
	                <div class="input-container">
	                    <input type="password" placeholder="Enter Login Password" onChange={this.handleChange.bind(this)} value={this.state.password} style={colorBlack}/>
	                </div>
	            </div>

	            <div class="btn-wrapper">
					<button class="btn btn-success" onClick={this.checkPass.bind(this)}> <span class="glyphicon glyphicon-user" aria-hidden="true"></span> Login </button>
				</div>
			</div>
		)
	}
}