import React from 'react';
import PageNavbar from './PageNavbar';
import ZipcodeRow from './ZipcodeRow';
import SearchBoxMap from './Map'

import '../style/Discover.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Discover extends React.Component {
	constructor(props) {
		super(props);
		this.handleLatChange = this.handleLatChange;
		this.state = {
			latitude: 47.620265,
			longitude: -122.348396,
			listings: [],
		};

		this.submitDiscover = this.submitDiscover.bind(this);
		this.handleLatChange = this.handleLatChange.bind(this);
		this.handleLongChange = this.handleLongChange.bind(this);
	}

	handleLatChange(lat) {
		console.log(lat);
		this.setState({
			latitude: lat
		});
	}
	handleLongChange(long) {
		console.log(long);
		this.setState({
			longitude: long
		});
	}



	submitDiscover() {
		fetch("http://localhost:8081/getDiscover?latitude=" + this.state.latitude + "&longitude=" + this.state.longitude, {
			method: 'GET' // The type of HTTP request.
		})
			.then(res => res.json()) // Convert the response data to a JSON.
			.then(zipcodeList => {
				console.log("a");


				// Map each attribute of a person in this.state.people to an HTML element
				let zipcodeDivs = zipcodeList.map((zipcode, i) =>
					<ZipcodeRow id={i} listing_id={zipcode[0]} guests={zipcode[1]} distance={("" + zipcode[2]).substring(0, 4) + " miles"}
					bedrooms={zipcode[3]} name={zipcode[4]} price={"$" + zipcode[7]} pic={zipcode[8]}
					/>

				);
				console.log(zipcodeDivs);
				// Set the state of the person list to the value returned by the HTTP response from the server.
				this.setState({
					listings: zipcodeDivs
				})

			})
			.catch(err => console.log(err))

	}

	render() {

		return (
			<div className="Discover">
				<PageNavbar active="discover" />

				<div className="container bestgenres-container">
					<div className="jumbotron">
						<div className="h2">Discover the best of Seattle!</div>
						<div className="h4">Get the most bang for your buck with these Airbnbs these near you</div>
						<br/><br/><br/>
						<SearchBoxMap
							google={this.props.google}
							center={{ lat: this.state.latitude, lng: this.state.longitude }}
							height='300px'
							zoom={15}
							handleLatChange={this.handleLatChange}
							handleLongChange={this.handleLongChange}
						/>
						<br/><br/>

							
							<button className="submit-btn" id="zipcodesSubmitBtn" onClick={this.submitDiscover}>Submit</button>
						</div>

					</div>
					{this.state.listings}
						<div className="movies-container">
							<div className="movie">
							</div>
							<div className="movies-container">

							</div>
						</div>
					</div>
		);
	}
}
