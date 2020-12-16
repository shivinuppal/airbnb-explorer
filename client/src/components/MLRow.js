import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Zipcode.css';

function refreshPage() {
	setTimeout(function () {
		window.location.reload();
	}, 100);
}

export default class MLRow extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div className="card center">
				<img className="pic" src={this.props.pic}></img>
				<Link to={{ pathname: `/listing/${this.props.listing_id}` }} onClick={refreshPage} >{this.props.name}</Link>
				<div className="summary">Summary: {this.props.summary}</div>
			</div>
		);
	}
}
