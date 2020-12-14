import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Host from './Host';
import {
	Link
  } from "react-router-dom";
export default class HostRow extends React.Component {
	constructor(props) {
		super(props);
	}
//<a href={`http://localhost:8081/getHost/${this.props.id}`}>{"HostID: " + this.props.id}</a>

	render() {
		return (
			<div className="hostResults">
                <div className="id">{"ID: " + this.props.id}</div>
				<Link to="/host">{"HostID: " + this.props.id}</Link>
				<button id="submit-host" className="submit-btn" onClick></button>
				<div className="host_about">{"About: " + this.props.host_about}</div>
				<div className="host_response_time">{"Response Time: " + this.props.host_response_time}</div>
				<div className="host_response_rate">{"Response Rate: " + this.props.host_response_rate}</div>
				<div className="host_acceptance_rate">{"Acceptance Rate: " + this.props.host_acceptance_rate}</div>
                <div className="host_is_superhost">{"Superhost: " + this.props.host_is_superhost}</div>
                <div className="host_neighborhood">{"Neighborhood: " + this.props.host_neighborhood}</div>
                <div className="host_total_listings_count">{"Total Listings: " + this.props.host_total_listings_count}</div>
                <div className="host_identity_verified">{"Identity Verified: " + this.props.host_identity_verified}</div>
			</div>
		);
	}
}
