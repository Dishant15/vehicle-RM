import React from "react";
import { connect } from "react-redux";

import VehicleForm from '../components/VehicleForm';
import ShowVehicleEntries from '../components/ShowVehicleEntries';

@connect((store) => {
	return {
		vehicles: store.vehicles,
	};
})
export default class EditVehicle extends React.Component{
	constructor(){
		super();
		this.state = {
			edit_entry_selected: false,
			data : {}
		}
	}

	vehicleSelect(selected_entry){
		this.setState({data:selected_entry, edit_entry_selected:true});
	}

	backFromEdit(){
		this.setState({edit_entry_selected:false, data:{}});
	}

	render(){
		let vehicleForm;
		if(this.state.edit_entry_selected){
			vehicleForm =<VehicleForm initVal={this.state.data} goBack={this.backFromEdit.bind(this)} />;
		} else {
			vehicleForm = <ShowVehicleEntries selected={this.vehicleSelect.bind(this)} data={this.props.vehicles}/>;
		}

		return(
			<div>
				{vehicleForm}
			</div>
		)
	}
}