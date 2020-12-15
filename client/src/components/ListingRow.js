import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/IndividualListing.css';

export default class ListingRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="card">
  				<img className="pic" src={this.props.pic}></img>
  				<div className="container">
				<p><Link to={{pathname: `/listing/${this.props.listing_id}`}}>{"ListingID: " + this.props.listing_id}</Link></p>
				<p>{this.props.summary}</p>
    			<p>Price: ${this.props.price}</p>
  				</div>
			  </div>
		);
	}
}
