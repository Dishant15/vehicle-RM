import React from "react";

export default class ShowCoupons extends React.Component {

	render(){

		let data_records = this.props.data.map((data_obj)=>{
			return(
				<tr key={data_obj._id}>
					<td>{data_obj.vno}</td>
					<td>{data_obj.user}</td>
					<td>{data_obj.km_reading}</td>
					<td>{data_obj.amount}</td>
					<td>{data_obj.vtype}</td>
					<td>{data_obj.timestamp}</td>
				</tr>
			);
		})

		return(
			<table class="table">
			   <caption class="text-center">Coupons data</caption>
			   
			   <thead>
			      <tr>
			         <th>Vehicle No.</th>
			         <th>Vehicle User</th>
			         <th>KM Readings</th>
			         <th>Amount</th>
			         <th>Vehicle Type</th>
			         <th>Time Stamp</th>
			      </tr>
			   </thead>
			   
			   <tbody>
			      {data_records}
			   </tbody>
				
			</table>
		);
	}
}