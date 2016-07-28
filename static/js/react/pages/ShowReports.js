import React from "react";
import { connect } from "react-redux";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
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
			vtypes: [],
			date_filter: null,
			date_selected:false,
			start_date:null,
			end_date:null,
			date_range_selected: false
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

	vehicleTypeChange(selected){
		if(selected){
			this.setState({vtypes:selected.split(',')});
		} else {
			this.setState({vtypes:[]});
		}
	}

	handleDateChange(date){
		if(date){
			this.setState({
				date_filter:date,
				date_selected: true,
				date_range_selected: false,
				start_date: null,
				end_date: null
			});
		} else {
			this.setState({
				date_filter:date,
				date_selected: false
			})
		}
	}

	handleStartDateChange(date){
		if(date){
			this.setState({
				start_date:date,
				date_filter:null,
				date_selected:false
			});
		} else {
			this.setState({
				start_date:date,
				date_range_selected: false
			})
		}
	}

	handleEndDateChange(date){
		if(date){
			this.setState({
				end_date:date,
				date_range_selected: true,
				date_filter:null,
				date_selected:false
			});
		} else {
			this.setState({
				end_date:date,
				date_range_selected: false
			})
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
			<div>
				<div class = "form-group">
					<label>Filter By Vehicle</label>
				</div>
				<div class = "form-group">
					<Select
					    name="vehicle-select"
					    placeholder="Select to search by vehicles..."
					    value={this.state.vehicle_indexes}
					    options={vehicle_list}
					    onChange={this.vehicleChange.bind(this)}
					    multi 
					    simpleValue
					/>
				</div>
			</div>
		)
	}

	renderFilters(){
		const vtypes = [
			{ value: 'bike', label: 'Bike' },
			{ value: 'aviator', label: 'Aviator' },
			{ value: 'truck', label: 'Truck' },
			{ value: 'forklift', label: 'Forklift' },
			{ value: '4 wheeler', label: '4 Wheeler' }
		];

		return(
			<div>
				<div class = "form-group">
					<label>Filter By Vehicle Type</label>
				</div>
				<div class = "form-group">
					<Select
					    name="vehicle-type-select"
					    placeholder="Select to search by vehicle types"
					    value={this.state.vtypes}
					    options={vtypes}
					    onChange={this.vehicleTypeChange.bind(this)}
					    multi 
					    simpleValue
					/>
				</div>

				<div class = "form-group">
					<label>Filter Single Date</label>
				</div>
				<div class = "form-group">
					<DatePicker
				        selected={this.state.date_filter}
				        onChange={this.handleDateChange.bind(this)}
				        isClearable={true}
				        maxDate={moment()}
				        placeholderText='Pick a specific date'
				    />
				</div>

				<div class = "form-group">
					<label>Filter By Date Range</label>
				</div>
				<div class = "form-group">
					<DatePicker
				        selected={this.state.start_date}
				        onChange={this.handleStartDateChange.bind(this)}
				        isClearable={true}
				        maxDate={moment()}
				        placeholderText='Pick starting date'
				    />

				    <DatePicker
				        selected={this.state.end_date}
				        onChange={this.handleEndDateChange.bind(this)}
				        isClearable={true}
				        minDate={this.state.start_date}
				        maxDate={moment().add(1, 'days')}
				        placeholderText='Pick end date'
				    />
				</div>
			</div>
		);
	}

	renderReport(){
		let { coupon_list } = this.props;
		let total_amount = 0;

		if(this.state.vehicle_indexes.length){
			// if vehicles selected filter with them
			let selected_obj = [];
			_.each(this.state.vehicle_indexes, (ind)=>{
				selected_obj.push(this.props.vehicles[ind].vno);
			});
			coupon_list = _.filter(coupon_list, (coupon)=>{    
							    return selected_obj.indexOf(coupon.vno) != -1;
							});
		}

		if(this.state.vtypes.length){
			// if vehicle type selected filter with them
			const selected_vtypes = this.state.vtypes;
			coupon_list = _.filter(coupon_list, (coupon)=>{    
							    return selected_vtypes.indexOf(coupon.vtype) != -1;
							});
		}

		if(this.state.date_selected){
			const date = this.state.date_filter;
			coupon_list = _.filter(coupon_list, (coupon)=>{    
							    return date.isSame(coupon.timestamp, 'day');
							});
		}

		if(this.state.date_range_selected){
			const { start_date, end_date } = this.state;
			coupon_list = _.filter(coupon_list, (coupon)=>{   
								return moment(coupon.timestamp)
											.isBetween(start_date, end_date, null, '[]');
							});
		}

		_.each(coupon_list, (coupon)=>{
			total_amount = total_amount + Number(coupon.amount);
		});
		
		return (
			<div>
				{this.renderFilters()}
				<hr/>
				<ShowCoupons data={coupon_list} total_amount={total_amount}/>
			</div>
		);
	}

	render(){
		return(
			<div class="container">
				{this.renderVehicleSelector()}
				{this.renderReport()}
			</div>
		)
	}
}