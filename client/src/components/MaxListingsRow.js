import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";

export default class MaxListingsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="maxListings">
				<div className="listing">
					<Link to={{ pathname: `/listing/${this.props.listing}` }}>
						{this.props.name}</Link>
				</div>
				<div className="price">{this.props.price}</div>
				<div className="bathrooms">{this.props.bathrooms}</div>
				<div className="bedrooms">{this.props.bedrooms}</div>
				<div className="beds">{this.props.beds}</div>
			</div>
		);
	}
}
