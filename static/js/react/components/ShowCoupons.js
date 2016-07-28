import React from "react";

export default class ShowCoupons extends React.Component {

	render(){

		let data_records = this.props.data.map((data_obj)=>{
			let date = new Date(data_obj.timestamp);

			return(
				<tr key={data_obj._id}>
					<td>{data_obj.vno}</td>
					<td>{data_obj.user}</td>
					<td>{data_obj.km_reading}</td>
					<td>{data_obj.amount}</td>
					<td>{data_obj.vtype}</td>
					<td>{date.toDateString()}</td>
				</tr>
			);
		})

		return(
			<div class="print-block">
				<button class="btn btn-default" onClick={window.print}>Print This</button>
				<table class="table print-block">

				   
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

						<tr>
							<th><b>Total</b></th>
							<th><b>Amount</b></th>
							<th><b>=</b></th>
							<th><b>{this.props.total_amount}</b></th>
							<th></th>
							<th></th>
						</tr>
				    </tbody>
					
				</table>
			</div>
		);
	}
}