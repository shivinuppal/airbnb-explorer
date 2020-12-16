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
			genres: []
		};

		this.submitZipcode = this.submitZipcode.bind(this);
<<<<<<< Updated upstream
		this.handleChange = this.handleChange.bind(this);
=======
		this.handleGuestsChange = this.handleGuestsChange.bind(this);
		this.handleBedsChange = this.handleBedsChange.bind(this);
		this.handleRadiusChange = this.handleRadiusChange.bind(this);
		this.handleDayChange = this.handleDayChange.bind(this);
		this.handleLatChange = this.handleLatChange.bind(this);
		this.handleLongChange = this.handleLongChange.bind(this);
		this.handleMonthChange = this.handleMonthChange.bind(this);

	}

	// componentDidMount() {
	// 	fetch("http://localhost:8081/zipcodes", {
	// 		method: 'GET' // The type of HTTP request.
	// 	})
	// 		.then(res => res.json()) // Convert the response data to a JSON.
	// 		.then(zipcodeList => {
	// 			//console.log("a");
	//
	//
	// 			// Map each attribute of a person in this.state.people to an HTML element
	// 			let zipcodeDivs = zipcodeList.map((zipcode, i) =>
	// 				[<option value={zipcode[0]}>{zipcode[0]}</option>]
	//
	// 			);
	// 			// Set the state of the person list to the value returned by the HTTP response from the server.
	// 			this.setState({
	// 				zipcodeList: zipcodeDivs,
	// 			})
	//
	// 		})
	// 		.catch(err => console.log(err))
	//
	// }

	// handleChange(e) {
	// 	this.setState({
	// 		selectedZipcode: e.target.value
	// 	});
	// }

	handleGuestsChange(f) {
		this.setState({
			guests: f.target.value
		});
	}

	handleDayChange(f) {
		this.setState({
			day: f.target.value
		});
>>>>>>> Stashed changes
	}

	/* ---- Q3a (Best Genres) ---- */
	componentDidMount() {
		fetch("http://localhost:8081/zipcodes", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(zipcodeList => {
        console.log("a");


        // Map each attribute of a person in this.state.people to an HTML element
        let zipcodeDivs = zipcodeList.map((zipcode, i) => 
		[<option value={zipcode.zipcode}>{zipcode.zipcode}</option>]

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

<<<<<<< Updated upstream
	/* ---- Q3b (Best Genres) ---- */
	submitZipcode() {
		fetch("http://localhost:8081/getZipcodes/"+this.state.selectedZipcode, {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(zipcodeList => {
        console.log("a");


        // Map each attribute of a person in this.state.people to an HTML element
        let zipcodeDivs = zipcodeList.map((zipcode, i) => 
          <ZipcodeRow id={"row-" + zipcode.listing_id + zipcode.zipcode} listing_id={zipcode.listing_id} zipcode={zipcode.zipcode}
          />

        );
        console.log(zipcodeDivs);
        // Set the state of the person list to the value returned by the HTTP response from the server.
        this.setState({
          genres: zipcodeDivs,
        })
      
      })
      .catch(err => console.log(err))
    
=======
	handleLatChange(lat) {
		//console.log(lat);
		this.setState({
			latitude: lat
		});
	}
	handleLongChange(long) {
		//console.log(long);
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
		fetch("http://localhost:8081/getZipcodes?zipcode=" + this.state.selectedZipcode + "&guests=" + this.state.guests + "&beds=" + this.state.beds + "&radius=" + this.state.radius + "&month=" + this.state.month + "&day=" + this.state.day +
			"&latitude=" + this.state.latitude + "&longitude=" + this.state.longitude, {
			method: 'GET' // The type of HTTP request.
		})
			.then(res => res.json()) // Convert the response data to a JSON.
			.then(zipcodeList => {
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
					zipcodeInfo = <div className="header" id="no-info">No matches found. Please expand search parameters.</div>
				}



				//console.log(zipcodeDivs);
				// Set the state of the person list to the value returned by the HTTP response from the server.
				this.setState({
					listings: zipcodeDivs, 
					noInfo: zipcodeInfo
				})

			})
			.catch(err => console.log(err))

>>>>>>> Stashed changes
	}

	render() {

		return (
			<div className="Zipcode">
				<PageNavbar active="zipcode" />

				<div className="container bestgenres-container">
			      <div className="jumbotron">
			        <div className="h5">Zipcode</div>

			        <div className="years-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedZipcode} onChange={this.handleChange} className="dropdown" id="zipcodesDropdown">
			            	<option select value> -- select an option -- </option>
			            	{this.state.zipcodeList}
			            </select>
			            <button className="submit-btn" id="zipcodesSubmitBtn" onClick={this.submitZipcode}>Submit</button>
			          </div>
			        </div>
			      </div>
			      <div className="jumbotron">
			        <div className="movies-container">
			          <div className="movie">
			            <div className="header"><strong>Listing ID</strong></div>
			            <div className="header"><strong>Street</strong></div>
			          </div>
			          <div className="movies-container" id="results">
			            {this.state.genres}
			          </div>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}