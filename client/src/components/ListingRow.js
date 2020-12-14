import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ListingRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<tr>
					<td className="listing_id">{this.props.listing_id}</td>
					<td className="price">{this.props.price}</td>
					<td className="summary">{this.props.summary}</td>
			
            </tr>
		);
	}
}
