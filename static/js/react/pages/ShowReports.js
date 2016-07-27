import React from "react";
import { connect } from "react-redux";
import Select from 'react-select';
import _ from "lodash";

import ShowCoupons from "../components/ShowCoupons";
import { getAllCoupon } from "../actions";

@connect((store) => {
	return {
		vehicles:store.vehicles,
		coupon: store.coupon,
		coupon_list: store.coupon.coupons
	};
})
export default class ShowReports extends React.Component {

	constructor(){
		super();
		this.initState = {
			vehicle_indexes:[],
			vehicle_sel_disabled: false
		};
		this.state = this.initState;
	}

	componentWillMount(){
		this.props.dispatch(getAllCoupon());
	}

	componentDidUpdate() {
		// front end fix
		let elem_list = document.getElementsByClassName("Select-value-icon");
		_.each(elem_list, (elem)=>{
			elem.innerHTML = "x";
		});
	}

	vehicleChange(selected){
		if(selected){
			// logic
			let newIndexed = selected.split(',');
			newIndexed = _.map(newIndexed, Number);
			this.setState({
				vehicle_indexes:newIndexed
			});

		} else {
			this.setState({
				vehicle_indexes:[]
			});
		}
			
	}

	renderVehicleSelector(){
		let vehicle_list = [];

		this.props.vehicles.forEach(function(ele, index, array) {
			vehicle_list.push({
				value: index,
				label: ele.vno + " | " + ele.user
			});
		});

		return(
			<div class = "form-group">
				<Select
				    name="vehicle-select"
				    placeholder="Select to search by vehicles..."
				    value={this.state.vehicle_indexes}
				    options={vehicle_list}
				    onChange={this.vehicleChange.bind(this)}
				    disabled={this.state.vehicle_sel_disabled}
				    multi 
				    simpleValue
				/>
			</div>
		)
	}

	renderReport(){
		let { coupon_list } = this.props;

		if(this.state.vehicle_indexes.length){
			// if vehicles selected filter with them
			let selected_obj = [];
			_.each(this.state.vehicle_indexes, (ind)=>{
				selected_obj.push(this.props.vehicles[ind].vno);
			});
			coupon_list = _.filter(coupon_list, (coupon)=>{    
							    return selected_obj.indexOf(coupon.vno) != -1
							});
		}
		
		return (
			<div>
				<h2>Filters will be here</h2>
				<hr/>
				<ShowCoupons data={coupon_list} />
			</div>
		);
	}

	render(){
		
		return(
			<div class="container">
				<div class = "form-group">
					<label>Select Vehicle</label>
				</div>
				{this.renderVehicleSelector()}
				<hr/>
				{this.renderReport()}
			</div>
		)
	}
}