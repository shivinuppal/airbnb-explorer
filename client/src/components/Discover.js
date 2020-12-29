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
		this.setState({
			latitude: lat
		});
	}
	handleLongChange(long) {
		this.setState({
			longitude: long
		});
	}



	submitDiscover() {
		fetch("http://localhost:8081/getDiscover?latitude=" + this.state.latitude + "&longitude=" + this.state.longitude, {
			method: 'GET' 
		})
			.then(res => res.json())
			.then(zipcodeList => {

				let zipcodeDivs = [];
				let zipcodeInfo = "";
				if (zipcodeList.length != 0) {
					zipcodeDivs = zipcodeList.map((zipcode, i) =>
						<ZipcodeRow id={i} listing_id={zipcode[0]} guests={zipcode[1]} distance={"Distance: " + zipcode[2].toFixed(2) + " miles"}
							bedrooms={zipcode[3]} name={zipcode[4]} price={"$" + zipcode[7]} pic={zipcode[8]}
						/>

					);
				} else {
					zipcodeInfo = <div className="header" id="no-info">No matches found. Make sure you are searching in Seattle.</div>
				}

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
						<br /><br /><br />
						<SearchBoxMap
							google={this.props.google}
							center={{ lat: this.state.latitude, lng: this.state.longitude }}
							height='300px'
							zoom={15}
							handleLatChange={this.handleLatChange}
							handleLongChange={this.handleLongChange}
						/>
						<br /><br />

						<button className="submit-btn" id="zipcodesSubmitBtn" onClick={this.submitDiscover}>Submit</button>
						<br />
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
