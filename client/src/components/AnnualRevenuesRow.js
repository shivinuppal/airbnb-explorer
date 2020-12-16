import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";

export default class AnnualRevenuesRow extends React.Component {
	constructor(props) {
		super(props);
	}

	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a movie row. */
	render() {
		return (
			<div className="zip">
				<Link to={{ pathname: `listing/${this.props.listing_id}` }}>
					{this.props.listing}</Link>
				<div className="annualrev">{this.props.annualrev}</div>
                <div className="area">{this.props.area}</div>
			</div>
		);
	}
}
