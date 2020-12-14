import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class HostRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="policyResults">
                <div className="price">{"Price: $" + this.props.price}</div>
                <div className="weekly_price">{"Weekly Price: $" + this.props.weekly_price}</div>
                <div className="monthly_price">{"Monthly Price: $" + this.props.monthly_price}</div>
                <div className="cancellation_policy">{"Cancellation Policy: $" + this.props.cancellation_policy}</div>
				<div className="security_deposit">{"Security Deposit: " + this.props.security_deposit}</div>
                <div className="cleaning_fee">{"Cleaning Fee: " + this.props.cleaning_fee}</div>
                <div className="min_nights">{"Minimum Nights: " + this.props.min_nights}</div>
                <div className="max_nights">{"Maximum Nights: " + this.props.max_nights}</div>
			</div>
		);
	}
}
