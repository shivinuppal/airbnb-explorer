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
			<div className="card center">
  				<img className="pic" src={this.props.pic}></img>
  				<div className="container">
				<p><Link to={{pathname: `/listing/${this.props.listing_id}`}}>{this.props.summary}</Link></p>
    			Price: ${this.props.price}
  				</div>
			  </div>
		);
	}
}
