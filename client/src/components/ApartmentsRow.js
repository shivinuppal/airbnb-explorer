import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";

export default class ApartmentsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	/* ---- Q1b (Dashboard) ---- */
	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a movie row. */
	render() {
		return (
			<div className="apartments">
				<div className="listing">
					<Link to={{ pathname: `listing/${this.props.listing}` }}>
					{this.props.listing}</Link>
				</div>
				<div className="guests">{this.props.guests}</div>
                <div className="price">{this.props.price}</div>
                <div className="max_nights">{this.props.max_nights}</div>
                <div className="min_nights">{this.props.min_nights}</div>
			</div>
		);
	}
}
