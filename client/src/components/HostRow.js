import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
export default class HostRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="hostResults">
				<Link to={{pathname: `/host/${this.props.id}`}}><strong>Host: </strong>{this.props.id}</Link>
				<div className="host_about"><strong>About: </strong> {this.props.host_about}</div>
				<div className="host_response_time"><strong>Response Time: </strong>{this.props.host_response_time}</div>
				<div className="host_response_rate"><strong>Response Rate: </strong>{this.props.host_response_rate}</div>
				<div className="host_acceptance_rate"><strong>Acceptance Rate: </strong>{this.props.host_acceptance_rate}</div>
                <div className="host_is_superhost"><strong>Superhost Status: </strong>{this.props.host_is_superhost}</div>
                <div className="host_neighborhood"><strong>Neighborhood: </strong>{this.props.host_neighborhood}</div>
                <div className="host_total_listings_count"><strong>Total Listings: </strong>{this.props.host_total_listings_count}</div>
                <div className="host_identity_verified"><strong>Identity Verified: </strong>{this.props.host_identity_verified}</div>
			</div>
		);
	}
}
