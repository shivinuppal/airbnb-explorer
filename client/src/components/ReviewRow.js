import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ReviewRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="reviewResults">
                <div className="number_of_reviews">{"Number Of Reviews: " + this.props.number_of_reviews}</div>
				<div className="reviews_per_month">{"Reviews Per Month: " + this.props.reviews_per_month}</div>
			</div>
		);
	}
}
