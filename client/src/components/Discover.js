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

				let zipcodeDivs = []; 
				let zipcodeInfo = "";
				if (zipcodeList.length != 0) {
					// Map each attribute of a person in this.state.people to an HTML element
					zipcodeDivs = zipcodeList.map((zipcode, i) =>
						<ZipcodeRow id={i} listing_id={zipcode[0]} guests={zipcode[1]} distance={("" + zipcode[2]).substring(0, 4) + " miles"}
							bedrooms={zipcode[3]} name={zipcode[4]} price={"$" + zipcode[7]} pic={zipcode[8]}
						/>

					);
				} else {
					zipcodeInfo = <div className="header" id="no-info">No matches found. Make sure you are searching in Seattle.</div>
				}
				// Set the state of the person list to the value returned by the HTTP response from the server.
				this.setState({
					listings: zipcodeDivs,
					noInfo: zipcodeInfo
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
							center={{ lat: 47.6204, lng: -122.3367 }}
							height='300px'
							zoom={15}
							handleLatChange={this.handleLatChange}
							handleLongChange={this.handleLongChange}
						/>
						<br/><br/>
							
							<button className="submit-btn" id="zipcodesSubmitBtn" onClick={this.submitDiscover}>Submit</button>
						<br/>
						{this.state.noInfo}
						</div>

					</div>
					
						<div className="discover-container center">
							{this.state.listings}
						</div>
					</div>
		);
	}
}
