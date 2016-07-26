import React from "react";

export default class ShowVehicleEntries extends React.Component {
	handleSelect(entry){
		this.props.selected(entry);
	}

	render(){
		let vehicle_entries = this.props.data.map((entry)=>{
			return <li onClick={this.handleSelect.bind(this, entry)} key={entry.vno}>{entry.vno} - {entry.user}</li>
		});
		return(
			<div class="container">
				<h1> Select Vehicle Entry </h1>
				<hr/>
				<ul>
					{vehicle_entries}
				</ul>
			</div>
		)
	}
}