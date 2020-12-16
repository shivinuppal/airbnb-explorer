import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class HostRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="policyResults">
                <div className="price"><strong>Price: </strong>{"$" + this.props.price}</div>
                <div className="cancellation_policy"><strong>Cancellation Policy: </strong>{this.props.cancellation_policy}</div>
				<div className="security_deposit"><strong>Security Deposit: </strong>{this.props.security_deposit}</div>
                <div className="cleaning_fee"><strong>Cleaning Fee: </strong>{this.props.cleaning_fee}</div>
                <div className="min_nights"><strong>Minimum Nights: </strong>{this.props.min_nights}</div>
                <div className="max_nights"><strong>Maximum Nights: </strong>{this.props.max_nights}</div>
			</div>
		);
	}
}
