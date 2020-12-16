import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";

export default class ApartmentsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="apartments">
				<div className="listing">
					<Link to={{ pathname: `listing/${this.props.listing}` }}>
						{this.props.name}</Link>
				</div>
				<div className="guests">{this.props.guests}</div>
				<div className="price">{this.props.price}</div>
				<div className="min_nights">{this.props.min_nights}</div>
			</div>
		);
	}
}
