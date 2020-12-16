import React from 'react';
import '../style/Analytics.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

export default class AnalyticsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="zip">
				<div className="zipcode">
					<Link to={{ pathname: `/zipcodes/${this.props.zipcode}` }}>
						{this.props.zipcode}</Link>
				</div>
				<div className="avgprice">{this.props.avgprice}</div>
			</div>
		);
	}
}
