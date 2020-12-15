import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Zipcode.css';

export default class ZipcodeRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="card">
				<img className="pic" src={this.props.pic}></img>
				<Link to={{ pathname: `listing/${this.props.listing_id}` }}>{"ListingID: " + this.props.listing_id}</Link>
				<div className="name">Name: {this.props.name}</div>
				<div className="guests">Guests: {this.props.guests}</div>
				<div className="distance">Distance: {this.props.distance}</div>
				<div className="price">Price: {this.props.price}</div>
				<div className="bedrooms">Bedrooms: {this.props.bedrooms}</div>
			</div>
		);
	}
}
