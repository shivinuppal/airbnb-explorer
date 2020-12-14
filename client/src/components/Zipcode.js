import React from 'react';
import PageNavbar from './PageNavbar';
import ZipcodeRow from './ZipcodeRow';
import SearchBoxMap from './Map'

import '../style/Zipcode.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Zipcode extends React.Component {
	constructor(props) {
		super(props);
this.handleLatChange = this.handleLatChange;
		this.state = {
			selectedZipcode: "0",
			zipcodeList: [<option value={2}>"l"</option>],
			guests: 1,
			latitude: 44.1,
			longitude: -133.2,
			beds: 1,
			radius : 1,
			listings: [],
			day: "01",
			month: "01"
		};

		this.submitZipcode = this.submitZipcode.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleGuestsChange = this.handleGuestsChange.bind(this);
		this.handleBedsChange = this.handleBedsChange.bind(this);
		this.handleRadiusChange = this.handleRadiusChange.bind(this);
		this.handleDayChange = this.handleDayChange.bind(this);
		this.handleLatChange = this.handleLatChange.bind(this);
		this.handleLongChange = this.handleLongChange.bind(this);

		this.handleMonthChange = this.handleMonthChange.bind(this);

	}

	componentDidMount() {
		fetch("http://localhost:8081/zipcodes", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(zipcodeList => {
        console.log("a");


        // Map each attribute of a person in this.state.people to an HTML element
        let zipcodeDivs = zipcodeList.map((zipcode, i) =>
		[<option value={zipcode[0]}>{zipcode[0]}</option>]

        );
        // Set the state of the person list to the value returned by the HTTP response from the server.
        this.setState({
          zipcodeList: zipcodeDivs,
        })

      })
      .catch(err => console.log(err))

	}

	handleChange(e) {
		this.setState({
			selectedZipcode: e.target.value
		});
	}

	handleGuestsChange(f) {
		this.setState({
			guests: f.target.value
		});
	}

	handleDayChange(f) {
		this.setState({
			day: f.target.value
		});
	}

	handleMonthChange(f) {
		this.setState({
			month: f.target.value
		});
	}

	handleBedsChange(e) {
		this.setState({
			beds: e.target.value
		});
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

	handleRadiusChange(e) {
		this.setState({
			radius: e.target.value
		});
	}



	submitZipcode() {
		fetch("http://localhost:8081/getZipcodes?zipcode="+this.state.selectedZipcode+"&guests="+this.state.guests+"&beds="+this.state.beds+"&radius="+this.state.radius+"&month="+this.state.month+"&day="+this.state.day+
						"&latitude=" + this.state.latitude + "&longitude="+this.state.longitude, {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(zipcodeList => {
        console.log("a");


        // Map each attribute of a person in this.state.people to an HTML element
        let zipcodeDivs = zipcodeList.map((zipcode, i) =>
          <ZipcodeRow id={"row-" + zipcode[0]} listing_id={zipcode[0]} guests={zipcode[1]} distance={("" + zipcode[2]).substring(0,4) + " miles"} bedrooms={zipcode[3]} name={zipcode[4]} price={"$"+zipcode[7]}
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

	// <div className="zips-container">
	//   <div className="dropdown-container">
	// 	<select value={this.state.selectedZipcode} onChange={this.handleChange} className="dropdown" id="zipcodesDropdown">
	// 		<option select value> -- select an option -- </option>
	// 		{this.state.zipcodeList}
	// 	</select>
	//
	//   </div>
	// </div>

	render() {

		return (
			<div className="Zipcode">
				<PageNavbar active="zipcode" />

				<div className="container bestgenres-container">
			      <div className="jumbotron">
			        <div className="h2">Find an Airbnb near you!</div>
					<SearchBoxMap
       google={this.props.google}
       center={{lat: 47.6204, lng: -122.3367}}
       height='300px'
	   zoom={15}
	   handleLatChange={this.handleLatChange}
	   handleLongChange={this.handleLongChange}
      />
			        


					<div className="radius-container">
						<div className="h5"> Radius </div>
						<div className = "dropdown-container">
							<select value={this.state.radius} onChange={this.handleRadiusChange} className="dropdown" id="radiusDropdown">
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
					</div>

					<div className="guests-container">
					<div className="h5"> Guests </div>
						<div className = "dropdown-container">
							<select value={this.state.guests} onChange={this.handleGuestsChange} className="dropdown" id="guestsDropdown">
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
					</div>

					<div className="day-container">
					<div className="h5"> Day </div>
						<div className = "dropdown-container">
							<select value={this.state.day} onChange={this.handleDayChange} className="dropdown" id="dayDropdown">
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
					</div>

					<div className="month-container">
						<div className="h5"> Month </div>
						<div className = "dropdown-container">
							<select value={this.state.month} onChange={this.handleMonthChange} className="dropdown" id="monthDropdown">
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
					</div>

					<div className="year-container">
						<div className="h5"> Year </div>
						<div className = "dropdown-container">
							<select value={2016} className="dropdown" id="yearDropdown">
								<option value={2016}> 2016 </option>
							</select>
						</div>
					</div>

					<div className="beds-container">
						<div className="h5"> Bedrooms </div>
						<div className = "dropdown-container">
							<select value={this.state.beds} onChange={this.handleBedsChange} className="dropdown" id="bedsDropdown">
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
					</div>
				  <button className="submit-btn" id="zipcodesSubmitBtn" onClick={this.submitZipcode}>Submit</button>
			      </div>
			      <div className="jumbotron">
			        <div className="movies-container">
			          <div className="movie">
			            <div className="header"><strong>Listing ID</strong></div>
						<div className="header"><strong>Name</strong></div>
			            <div className="header"><strong>Guests</strong></div>
						<div className="header"><strong>Distance from Space Needle</strong></div>
						<div className="header"><strong>Price</strong></div>
						<div className="header"><strong>Bedrooms</strong></div>
			          </div>
			          <div className="movies-container" id="movieResults">
			            {this.state.listings}
			          </div>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}
