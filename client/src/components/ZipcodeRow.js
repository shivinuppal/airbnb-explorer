import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ZipcodeRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movieResults">
				
				<div className="listing_id">{this.props.listing_id}</div>
				<div className="neighbor">{this.props.neighbor}</div>
                <div className="zipcode">{this.props.zipcode}</div>
            </div>
		);
	}
}
