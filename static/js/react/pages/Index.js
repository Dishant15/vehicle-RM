import React from 'react';
import { connect } from "react-redux";
import bcrypt from "bcryptjs";

import { passwordValidated } from "../actions";
import Home from "../components/Home";

const HASH_SUPERUSER = "$2a$10$c5F2f/dYJWOFrUw27MKk1Olcd8j9b36u6AHvkcacH4FnJsT3l0RIO";
const HASH_STAFF = "$2a$10$cROLpIwfpQ.ANYoBG0F.UO3D5kbCjCbKNyDJR6iNIJLEd92CIrG7e";
// creating hash of the password
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("test2", salt);
// console.log(hash);

class PasswordForm extends React.Component {
	constructor(){
		super();
		this.state = {
			password: "",
			error: null
		};
	}

	checkPass(){
		const password = this.state.password;
		if(bcrypt.compareSync(password, HASH_SUPERUSER)){
			this.props.passwordMatched(1); // level1 super user detected
		}
		else if(bcrypt.compareSync(password, HASH_STAFF)){
			this.props.passwordMatched(2); // level2 staff user detected
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

	render() {
		let error;
		if(this.state.error){
			error = <p class='text-warning'>Incorrect Password !</p>;
		}

		return (
			<div class="container">
				{error}
				<input type="password" onChange={this.handleChange.bind(this)} value={this.state.password}/>

				<button class="btn btn-success" onClick={this.checkPass.bind(this)}> Login </button>
			</div>
		)
	}
}

@connect((store) => {
	return {
		pass_valide: store.pass.valide,
	};
})
export default class Index extends React.Component {

	passwordMatched(level){
		this.props.dispatch(passwordValidated(level));
	}

	render(){
		let content;
		if(this.props.pass_valide){
			content = <Home/>;
		} else {
			content = <PasswordForm passwordMatched={this.passwordMatched.bind(this)}/>;
		}

		return(
			<div class="text-center">
				{content}
			</div>
		)
	}
}