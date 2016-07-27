import React from "react";
import Select from 'react-select';
import { connect } from "react-redux";

import { addNewCoupon } from "../actions";

@connect((store) => {
	return {vehicles:store.vehicles};
})
export default class CouponForm extends React.Component {

	constructor(){
		super();
		this.initState = {
			error: false,
			vehicle: 0,
			km_reading: "",
			amount:""
		};
		this.state = this.initState;
	}

	vehicleChange(selected_obj){
		this.setState({vehicle:selected_obj.value, error:false});
	}

	handleKmChange(event){
		this.setState({km_reading: event.target.value, error:false});
	}

	handleAmountChange(event){
		this.setState({amount: event.target.value, error:false});
	}

	cancelForm(){
		this.setState(this.initState);
	}

	submitForm(){
		const curr_state = this.state;
		if(curr_state.km_reading != "" && curr_state.amount != ""){
			let vehicle = this.props.vehicles[curr_state.vehicle];
			let data = {
				...curr_state, 
				vno: vehicle.vno, 
				user: vehicle.user, 
				fuel_type: vehicle.fuel,
				vtype: vehicle.vtype,
				timestamp: new Date(),
				error: undefined,
				vehicle: undefined
			};
			this.props.dispatch(addNewCoupon(data));
			this.setState(this.initState);
		} else {
			this.setState({error:true});
		}
		
	}

	renderSelect(){
		let vehicle_list = [];

		this.props.vehicles.forEach(function(ele, index, array) {
			vehicle_list.push({
				value: index,
				label: ele.vno + " | " + ele.user + " | " + ele.vtype
			});
		});

		return(
			<div class = "form-group">
				<Select
				    name="vehicle-select"
				    value={this.state.vehicle}
				    options={vehicle_list}
				    onChange={this.vehicleChange.bind(this)}
				    clearable={false}
				/>
			</div>
		)
	}

	render(){
		let error_block;
		if(this.state.error){
			error_block = <h2 class="text-danger">Invalid Input!!</h2>
		}

		return(
			<div class="container">
				{error_block}
				<div class = "form-group">
					<label>Select Vehicle</label>
				</div>
				{this.renderSelect()}

				<div class = "form-group">
					<label>KM Reading</label>
			        <input type="text" class="form-control" onChange={this.handleKmChange.bind(this)} value={this.state.km_reading} placeholder="Enter current KM reading"/>
				</div>

				<div class = "form-group">
					<label>Coupon Amount</label>
			        <input type="text" class="form-control" onChange={this.handleAmountChange.bind(this)} value={this.state.amount} placeholder="Enter coupon amount"/>
				</div>

				<button class="btn btn-success" onClick={this.submitForm.bind(this)}>Create Coupon</button> 
				<button class="btn btn-danger" onClick={this.cancelForm.bind(this)}>Cancel</button>
			</div>
		)
	}
}