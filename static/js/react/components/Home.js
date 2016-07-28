import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

@connect((store) => {
	return {
		pass_level: store.pass.level,
	};
})
export default class Home extends React.Component {

	renderBlock(link, lable) {
		return(
			<div class="list-group">
				<Link class="list-group-item" to={link}>{lable}</Link>
			</div>
		)
	}

	render() {
		return (
			<div class="container">
				<div class="jumbotron">
					<h2>What will you like to do?</h2>
				</div>
				<div>
					{this.renderBlock.bind(this)("add-coupon", "New Coupon")}
					{this.renderBlock.bind(this)("add-vehicle", "New Vehicle Entry")}
					{this.renderBlock.bind(this)("edit-vehicle", "Edit Vehicle Entry")}
					{this.props.pass_level == 1 ? this.renderBlock.bind(this)("show-reports", "Report") : null}
				</div>
			</div>
		)
	}
}