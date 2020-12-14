import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ListingRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movieResults">
				<div className="listing_id">{this.props.listing_id}</div>
				<div className="price">{this.props.neighbor}</div>
                <div className="summary">{this.props.id}</div>
            </div>
		);
	}
}
