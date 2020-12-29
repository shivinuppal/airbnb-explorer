import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";

export default class HostsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	/* ---- Q1b (Dashboard) ---- */
	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a movie row. */
	render() {
		return (
			<div className="hosts">
				<div className="host">
				<Link to={{pathname: `/host/${this.props.host}`}}>{this.props.name}</Link>
				</div>
				<div className="listings">{this.props.listings}</div>
                <div className="price">{this.props.price}</div>
			</div>
		);
	}
}
