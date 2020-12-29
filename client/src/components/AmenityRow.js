import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class HostRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="amenityResults">
                <div className="property_type"><strong>Property Type: </strong>{this.props.property_type}</div>
				<div className="room_type"><strong>Room Type: </strong>{this.props.room_type}</div>
				<div className="accommodates"><strong>Accommodates: </strong>{this.props.accommodates}</div>
				<div className="bathrooms"><strong>Bathrooms</strong>{this.props.bathrooms}</div>
				<div className="bedrooms"><strong>Bedrooms: </strong>{this.props.bedrooms}</div>
                <div className="beds"><strong>Beds: </strong>{this.props.beds}</div>
                <div className="bed_type"><strong>Bed Type: </strong>{this.props.bed_type}</div>
                <div className="amenities"><strong>Amenities: </strong>{this.props.amenities}</div>
                <div className="square_feet"><strong>Square Feet: </strong>{this.props.square_feet}</div>
                <div className="guests_included"><strong>Guests Included: </strong>{this.props.guests_included}</div>
			</div>
		);
	}
}
