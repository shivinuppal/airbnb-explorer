import React from 'react';
import '../style/Analytics.css';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class AnalyticsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	/* ---- Q1b (Dashboard) ---- */
	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a movie row. */
	render() {
		return (
			<div className="zip">
				<div className="zipcode">{this.props.zipcode}</div>
				<div className="avgprice">{this.props.avgprice}</div>
			</div>
		);
	}
}
