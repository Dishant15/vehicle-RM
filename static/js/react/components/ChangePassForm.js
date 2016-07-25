import React from "react";

import { checkSuperUserPass } from "../utils";

export default class ChangePassForm extends React.Component {
	constructor(){
		super();
		this.state = {
			pass_valid: false
		}
	}

	validatePassword() {
		this.setState( {pass_valid: true} )
	}

	render(){

		let passForm;
		if(this.state.pass_valid){
			passForm = <ChangeAllPasswordForm/>
		} else {
			passForm = <CheckSuperUserPass validatePassword={this.validatePassword.bind(this)}/>;
		}

		return(
			<div class="container text-center">
				<h1>Change Passwords</h1>
				<hr/>
				{passForm}
			</div>
		);
	}
}

class CheckSuperUserPass extends React.Component {
	/*
	Check password input from user and conform if he is superuser
	Show change password forms only if super user detected
	*/
	constructor(){
		super();
		this.state = {
			password : "",
			error: false
		}
	}

	handlePassChange(e) {
		e.preventDefault();
		this.setState({
			password: e.target.value
		})
	}

	checkPassword() {
		if(checkSuperUserPass(this.state.password)){
			// password correct render change password form
			this.props.validatePassword();
		} else {
			this.setState({
				error:true,
				password:""
			})
		}
	}

	render() {
		let error_block;
		if(this.state.error){
			error_block = <h3 class="text-danger">Incorrect Password!</h3>;
		}

		return(
			<div>
				<div class = "form-group">
					{error_block}
			        <label for = "name">Current SuperUser Password</label>
			        <input type="password" class="form-control" onChange={this.handlePassChange.bind(this)} value={this.state.password} placeholder="Enter current superuser password"/>
				</div>
				<button class="btn btn-success" onClick={this.checkPassword.bind(this)}>Conform</button>
			</div>
		)
	}
}

class ChangeAllPasswordForm extends React.Component {
	constructor(){
		super();
		this.initState = {
			superuser_password1 : "",
			superuser_password2 : "",
			staffuser_password1 : "",
			staffuser_password2 : "",
			message : "",
			superuser_error: false,
			staffuser_error: false,
		};

		this.state = this.initState;
	}

	handlePassChange(i, e){
		const removeErrors = {superuser_error:false, staffuser_error: false};
		switch(i){
			case 1: {
				this.setState({...removeErrors, superuser_password1:e.target.value});
				break;
			}
			case 2: {
				this.setState({...removeErrors, superuser_password2:e.target.value});
				break;
			}
			case 3: {
				this.setState({...removeErrors, staffuser_password1:e.target.value});
				break;
			}
			case 4: {
				this.setState({...removeErrors, staffuser_password2:e.target.value});
				break;
			}
			default: {
				console.log("Something went wrong in handlePassChange!", i);
				break;
			}
		}

	}

	submit_password(i) {
		if(i == 1){
			// dealing with superuser password change
			if(this.state.superuser_password1 == this.state.superuser_password2){
				console.log("we can now change superuser password");
				this.setState(this.initState);
			} else {
				this.setState({
					...this.initState,
					superuser_error:true,
					message:"Password mismatch error!"
				});
			}
		} else {
			if(this.state.staffuser_password1 == this.state.staffuser_password2){
				console.log("we can now change staffuser password");
				this.setState(this.initState);
			} else {
				this.setState({
					...this.initState,
					staffuser_error:true,
					message:"Password mismatch error!"
				});
			}
		}
	}

	render() {
		let staffuser_error_block;
		if(this.state.staffuser_error){
			staffuser_error_block = <div class="text-danger">{this.state.message}</div>
		}
		let superuser_error_block;
		if(this.state.superuser_error){
			superuser_error_block = <div class="text-danger">{this.state.message}</div>
		}

		return(
			<div>
				<h2>Change SuperUser Password</h2>
				<div class = "form-group">
					{superuser_error_block}
			        <label for = "name">New SuperUser Password</label>
			        <input type="password" class="form-control" onChange={this.handlePassChange.bind(this,1)} value={this.state.superuser_password1} placeholder="Enter new superuser password"/>
			        <input type="password" class="form-control" onChange={this.handlePassChange.bind(this,2)} value={this.state.superuser_password2} placeholder="conform password"/>
				</div>
				<button class="btn btn-success" onClick={this.submit_password.bind(this, 1)}>Change Password</button>
				<hr/>
				<h2>Change StaffUser Password</h2>
				<div class = "form-group">
					{staffuser_error_block}
			        <label for = "name">New StaffUser Password</label>
			        <input type="password" class="form-control" onChange={this.handlePassChange.bind(this,3)} value={this.state.staffuser_password1} placeholder="Enter new staffuser password"/>
			        <input type="password" class="form-control" onChange={this.handlePassChange.bind(this,4)} value={this.state.staffuser_password2} placeholder="conform password"/>
				</div>
				<button class="btn btn-success" onClick={this.submit_password.bind(this, 2)}>Change Password</button>
			</div>
		)
	}
}