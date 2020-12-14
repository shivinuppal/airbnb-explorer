import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Zipcode from './Zipcode';

export default class ZipcodeRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="searchResults">
				<div className="listing_id">{this.props.listing_id}</div>
				<Link to={{pathname: `listing/${this.props.listing_id}`}}>{"ListingID: " + this.props.listing_id}</Link>
				<div className="name">{this.props.name}</div>
				<div className="guests">{this.props.guests}</div>
				<div className="distance">{this.props.distance}</div>
				<div className="price">{this.props.price}</div>
				<div className="bedrooms">{this.props.bedrooms}</div>
			</div>
		);
	}
}
