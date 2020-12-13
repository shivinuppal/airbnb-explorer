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
				<div className="summary">{"Summary: " + this.props.summary}</div>
				<div className="space">{"Space: " + this.props.space}</div>
				<div className="description">{"Description: " + this.props.description}</div>
                <div className="neighbourhood_cleansed">{"Neighborhood: " + this.props.neighbourhood_cleansed}</div>
				<div className="neighborhood_overview">{"Acceptance Rate: " + this.props.neighborhood_overview}</div>
                <div className="zipcode">{"Zipcode: " + this.props.zipcode}</div>
                <div className="transit">{"Nearby Transit: " + this.props.transit}</div>
			</div>
		);
	}
}
