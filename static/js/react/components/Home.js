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
			<div>
				<Link class="btn btn-default" to={link}>{lable}</Link>
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
					{this.renderBlock.bind(this)("add-vehicle", "Edit Entries")}
					{this.renderBlock.bind(this)("add-prices", "Set Prices")}
					{this.props.pass_level == 1 ? this.renderBlock.bind(this)("search", "Report") : null}
				</div>
			</div>
		)
	}
}