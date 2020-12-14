import React from 'react';
import PageNavbar from './PageNavbar';
import ZipcodeRow from './ZipcodeRow';
import '../style/Zipcode.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Zipcode extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedZipcode: "0",
			zipcodeList: [<option value={2}>"l"</option>],
			guests: 1,
			beds: 1,
			radius : 1,
			listings: []
		};

		this.submitZipcode = this.submitZipcode.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleGuestsChange = this.handleGuestsChange.bind(this);
		this.handleBedsChange = this.handleBedsChange.bind(this);
		this.handleRadiusChange = this.handleRadiusChange.bind(this);
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

	handleBedsChange(e) {
		this.setState({
			beds: e.target.value
		});
	}

	handleRadiusChange(e) {
		this.setState({
			radius: e.target.value
		});
	}

	submitZipcode() {
		fetch("http://localhost:8081/getZipcodes?zipcode="+this.state.selectedZipcode+"&guests="+this.state.guests+"&beds="+this.state.beds+"&radius="+this.state.radius, {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(zipcodeList => {
        console.log("a");


        // Map each attribute of a person in this.state.people to an HTML element
        let zipcodeDivs = zipcodeList.map((zipcode, i) =>
          <ZipcodeRow id={"row-" + zipcode[0]} listing_id={zipcode[0]} guests={zipcode[1]} distance={("" + zipcode[2]).substring(0,4) + " miles"} bedrooms={zipcode[3]} name={zipcode[4]}
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
			<div className="Zipcode">
				<PageNavbar active="zipcode" />

				<div className="container bestgenres-container">
			      <div className="jumbotron">
			        <div className="h2">Zipcode</div>

			        <div className="zips-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedZipcode} onChange={this.handleChange} className="dropdown" id="zipcodesDropdown">
			            	<option select value> -- select an option -- </option>
			            	{this.state.zipcodeList}
			            </select>
			            <button className="submit-btn" id="zipcodesSubmitBtn" onClick={this.submitZipcode}>Submit</button>
			          </div>
			        </div>


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

			      </div>
			      <div className="jumbotron">
			        <div className="movies-container">
			          <div className="movie">
			            <div className="header"><strong>Listing ID</strong></div>
						<div className="header"><strong>Name</strong></div>
			            <div className="header"><strong>Guests</strong></div>
						<div className="header"><strong>Distance from Space Needle</strong></div>
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
