import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";

export default class AnnualRevenuesRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="revenue">
				<div className="listing">
				<Link to={{ pathname: `/listing/${this.props.listing}` }}>
					{this.props.name}</Link>
				</div>
				<div className="annualrev">${this.props.annualrev}</div>
			</div>
		);
	}
}
