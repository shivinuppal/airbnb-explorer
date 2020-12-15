import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Zipcode.css';

export default class MLRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="card">
				<img className="pic" src={this.props.pic}></img>
				<Link to={{ pathname: `listing/${this.props.listing_id}` }}>{"ListingID: " + this.props.listing_id}</Link>
				<div className="name">Name: {this.props.name}</div>
				<div className="summary">Summary: {this.props.summary}</div>
				
			</div>
		);
	}
}
