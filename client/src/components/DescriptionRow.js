import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class DescriptionRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="descriptionResults">
                <div className="name"><strong>Name: </strong>{this.props.name}</div>
				<div className="description"><strong>Description: </strong>{this.props.description}</div>
                <div className="neighbourhood_cleansed"><strong>Neighborhood: </strong>{this.props.neighbourhood_cleansed}</div>
				<div className="neighborhood_overview"><strong>Neighborhood Area: </strong>{this.props.neighborhood_overview}</div>
                <div className="zipcode"><strong>Zipcode: </strong>{this.props.zipcode}</div>
                <div className="transit"><strong>Nearby Transit: </strong>{this.props.transit}</div>
			</div>
		);
	}
}
