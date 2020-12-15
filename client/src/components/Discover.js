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
							center={{ lat: 47.6204, lng: -122.3367 }}
							height='300px'
							zoom={15}
							handleLatChange={this.handleLatChange}
							handleLongChange={this.handleLongChange}
						/>
						<br/><br/>
							<div className="h4"> Radius </div>
							<div className="h4"> Guests </div>
							<div className="h4"> Day </div>
							<div className="h4"> Month </div>
							<div className="h4"> Year </div>
							<div className="h4"> Bedrooms </div>
							<br/><br/><br/>
							<div className="dropdown-container">
								<select value={this.state.radius} onChange={this.handleRadiusChange} className="dropdown" id="radiusDropdown">
								<option value> Max Distance </option>
									<option value={1}> 1 mile </option>
									<option value={2}> 2 miles </option>
									<option value={3}> 3 miles </option>
									<option value={4}> 4 miles </option>
									<option value={5}> 5 miles </option>
									<option value={6}> 6 miles </option>
									<option value={7}> 7 miles </option>
									<option value={8}> 8 miles </option>
									<option value={9}> 9 miles </option>
									<option value={10}> 10 miles </option>
								</select>
							</div>
							<div className="dropdown-container">
								<select value={this.state.guests} onChange={this.handleGuestsChange} className="dropdown" id="guestsDropdown">
								<option value> Number of Guests </option>
									<option value={1}> 1 </option>
									<option value={2}> 2 </option>
									<option value={3}> 3 </option>
									<option value={4}> 4 </option>
									<option value={5}> 5 </option>
									<option value={6}> 6 </option>
									<option value={7}> 7 </option>
									<option value={8}> 8 </option>
									<option value={9}> 9 </option>
									<option value={10}> 10 </option>
									<option value={11}> 11 </option>
									<option value={12}> 12 </option>
									<option value={13}> 13 </option>
									<option value={14}> 14 </option>
									<option value={15}> 15 </option>
								</select>
							</div>
							<div className="dropdown-container">
								<select value={this.state.day} onChange={this.handleDayChange} className="dropdown" id="dayDropdown">
								<option value> Day </option>
									<option value={"01"}> 1 </option>
									<option value={"02"}> 2 </option>
									<option value={"03"}> 3 </option>
									<option value={"04"}> 4 </option>
									<option value={"05"}> 5 </option>
									<option value={"06"}> 6 </option>
									<option value={"07"}> 7 </option>
									<option value={"08"}> 8 </option>
									<option value={"09"}> 9 </option>
									<option value={"10"}> 10 </option>
									<option value={"11"}> 11 </option>
									<option value={"12"}> 12 </option>
									<option value={"13"}> 13 </option>
									<option value={"14"}> 14 </option>
									<option value={"15"}> 15 </option>
									<option value={"16"}> 16 </option>
									<option value={"17"}> 17 </option>
									<option value={"18"}> 18 </option>
									<option value={"19"}> 19 </option>
									<option value={"20"}> 20 </option>
									<option value={"21"}> 21 </option>
									<option value={"22"}> 22 </option>
									<option value={"23"}> 23 </option>
									<option value={"24"}> 24 </option>
									<option value={"25"}> 25 </option>
									<option value={"26"}> 26 </option>
									<option value={"27"}> 27 </option>
									<option value={"28"}> 28 </option>
									<option value={"29"}> 29 </option>
									<option value={"30"}> 30 </option>
									<option value={"31"}> 31 </option>
								</select>
							</div>
							<div className="dropdown-container">
								<select value={this.state.month} onChange={this.handleMonthChange} className="dropdown" id="monthDropdown">
								<option value> Month </option>
									<option value={"01"}> January </option>
									<option value={"02"}> February </option>
									<option value={"03"}> March </option>
									<option value={"04"}> April </option>
									<option value={"05"}> May </option>
									<option value={"06"}> June </option>
									<option value={"07"}> July </option>
									<option value={"08"}> August </option>
									<option value={"09"}> September </option>
									<option value={"10"}> October </option>
									<option value={"11"}> November </option>
									<option value={"12"}> December </option>
								</select>
							</div>
							<div className="dropdown-container">
								<select value={2016} className="dropdown" id="yearDropdown">
								<option value> Max Distance </option>
									<option value={2016}> 2016 </option>
								</select>
							</div>
							<div className="dropdown-container">
								<select value={this.state.beds} onChange={this.handleBedsChange} className="dropdown" id="bedsDropdown">
								<option value> Number of Beds </option>
									<option value={1}> 1 </option>
									<option value={2}> 2 </option>
									<option value={3}> 3 </option>
									<option value={4}> 4 </option>
									<option value={5}> 5 </option>
									<option value={6}> 6 </option>
									<option value={7}> 7 </option>
									<option value={8}> 8 </option>
									<option value={9}> 9 </option>
									<option value={10}> 10 </option>
									<option value={11}> 11 </option>
									<option value={12}> 12 </option>
									<option value={13}> 13 </option>
									<option value={14}> 14 </option>
									<option value={15}> 15 </option>
								</select>
							</div>
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
