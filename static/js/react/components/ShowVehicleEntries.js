import React from "react";

export default class ShowVehicleEntries extends React.Component {
	handleSelect(entry){
		this.props.selected(entry);
	}

	render(){
		let vehicle_entries = this.props.data.map((entry)=>{
			return <button type="button" class="list-group-item" onClick={this.handleSelect.bind(this, entry)} key={entry.vno}>{entry.vno} | {entry.user} | {entry.vtype}</button>
		});
		return(
			<div class="container text-center">
				<h1> Select Vehicle Entry To Edit </h1>
				<hr/>
				<div class="list-group">
					{vehicle_entries}
				</div>
			</div>
		)
	}
}