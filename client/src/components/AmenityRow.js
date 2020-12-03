import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class HostRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="amenityResults">
                <div className="property_type">{"Property Type: " + this.props.property_type}</div>
				<div className="room_type">{"Room Type: " + this.props.room_type}</div>
				<div className="accommodates">{"Accommodates: " + this.props.accommodates}</div>
				<div className="bathrooms">{"Bathrooms: " + this.props.bathrooms}</div>
				<div className="bedrooms">{"Bedrooms: " + this.props.bedrooms}</div>
                <div className="beds">{"Beds: " + this.props.beds}</div>
                <div className="bed_type">{"Bed Type: " + this.props.bed_type}</div>
                <div className="amenities">{"Amenities: " + this.props.amenities}</div>
                <div className="square_feet">{"Square Feet: " + this.props.square_feet}</div>
                <div className="guests_included">{"Guests Included: " + this.props.guests_included}</div>
			</div>
		);
	}
}
