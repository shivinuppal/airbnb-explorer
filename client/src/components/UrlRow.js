import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class UrlRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="UrlResults">
                <img className="pic" src={this.props.picture_url}/>          
			</div>
		);
	}
}
