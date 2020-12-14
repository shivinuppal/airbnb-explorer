import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ListingRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<tr>
					<td>
						<Link to={{pathname: `listing/${this.props.listing_id}`}}>{"ListingID: " + this.props.listing_id}</Link>
					</td>
					<td className="price">{this.props.price}</td>
					<td className="summary">{this.props.summary}</td>
			
            </tr>
		);
	}
}
