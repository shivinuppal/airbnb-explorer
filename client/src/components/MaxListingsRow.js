import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";

export default class MaxListingsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	/* ---- Q1b (Dashboard) ---- */
	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a movie row. */
	render() {
		return (
			<div className="maxListings">
				<Link to={{ pathname: `listing/${this.props.listing_id}` }}>
					{this.props.listing}</Link>
				<div className="price">{this.props.price}</div>
                <div className="bathrooms">{this.props.bathrooms}</div>
                <div className="bedrooms">{this.props.bedrooms}</div>
                <div className="beds">{this.props.beds}</div>
			</div>
		);
	}
}
