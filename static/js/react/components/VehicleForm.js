import React from "react";
import Select from 'react-select';
import { connect } from "react-redux";

import { newVehicleEntry, editVehicleEntry } from "../actions";

@connect((store) => {
	return {};
})
export default class VehicleForm extends React.Component {
	constructor(){
		super();
		this.initState = {
			error:false,
			vno: "",
			user: "",
			fuel: "petrol",
			vtype: "bike"
		}
	}

	componentWillMount(){
		if(this.props.initVal){
			this.setState({
				error:false,
				edit: true,
				_id: this.props.initVal._id,
				vno: this.props.initVal.vno,
				user: this.props.initVal.user,
				fuel: this.props.initVal.fuel,
				vtype: this.props.initVal.vtype
			});
		} else {
			this.setState(this.initState);
		}
		
	}

	handleVnoChange(e){
		this.setState({vno:e.target.value, error:false});
	}

	handleUserChange(e){
		this.setState({user:e.target.value, error:false});
	}

	radioChanged(e){
		this.setState({fuel:e.currentTarget.value, error:false});
	}

	vtypeChanged(e){
		this.setState({vtype:e.value, error:false});
	}

	submitForm(){
		const data = {...this.state, error:undefined, edit:undefined};
		if(data.vno != "" && data.user != ""){
			// submit data to server
			this.props.dispatch(newVehicleEntry(data));
			this.setState(this.initState);
		} else {
			// empty field error
			this.setState({error:true});
		}
	}

	editForm(){
		const data = {...this.state, error:undefined, edit:undefined};
		if(data.vno != "" && data.user != ""){
			// submit data to server
			this.props.dispatch(editVehicleEntry(data));
			this.props.goBack();
		} else {
			// empty field error
			this.setState({error:true});
		}
	}

	render() {
		const vtypes = [
			{ value: 'bike', label: 'Bike' },
			{ value: 'aviator', label: 'Aviator' },
			{ value: 'truck', label: 'Truck' },
			{ value: 'forklift', label: 'Forklift' },
			{ value: '4 wheeler', label: '4 Wheeler' }
		];

		let error_block;
		if(this.state.error){
			error_block=<h2 class="text-danger">Please enter details for all required fields!!</h2>
		}

		let submitBtn;
		let backBtn;
		if(this.state.edit){
			backBtn = <button class="btn btn-danger" onClick={this.props.goBack}>Go Back</button>
			submitBtn = <button class="btn btn-warning" onClick={this.editForm.bind(this)}>Edit Entry</button>
		} else {
			submitBtn = <button class="btn btn-success" onClick={this.submitForm.bind(this)}>Create Entry</button>
		}

		return(
			<div class="container">
				<h1> Vehicle Entry </h1>
				<hr/>
				{error_block}
				<div class = "form-group">
			        <input type="text" class="form-control" onChange={this.handleVnoChange.bind(this)} value={this.state.vno} placeholder="Enter Vehicle Number"/>
				</div>

				<div class = "form-group">
			        <input type="text" class="form-control" onChange={this.handleUserChange.bind(this)} value={this.state.user} placeholder="Vehicle Used by...."/>
				</div>

				<div class = "form-group">
					<label>Vehicle fuel type</label>
				</div>
				<div class = "form-group">
					<label class="radio-inline">
					  <input type="radio" onChange={this.radioChanged.bind(this)} checked={this.state.fuel === "petrol"} value="petrol"/> Petrol
					</label>
					<label class="radio-inline">
					  <input type="radio" onChange={this.radioChanged.bind(this)} checked={this.state.fuel === "diesel"} value="diesel"/> Diesel
					</label>
				</div>

				<div class = "form-group">
					<label>Vehicle type</label>
				</div>
				<div class = "form-group">
					<Select
					    name="vehicle-type-sel"
					    value={this.state.vtype}
					    options={vtypes}
					    onChange={this.vtypeChanged.bind(this)}
					    clearable={false}
					/>
				</div>
				{submitBtn}
				{backBtn}
			</div>
		)
	}
}