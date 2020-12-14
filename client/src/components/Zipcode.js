import React from 'react';
import PageNavbar from './PageNavbar';
import ZipcodeRow from './ListingRow';
import '../style/Zipcode.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Zipcode extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedZipcode: "0",
			zipcodeList: [<option value={2}>"l"</option>],
			guests: 1,
			beds: 1
		};

		this.submitZipcode = this.submitZipcode.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleGuestsChange = this.handleGuestsChange.bind(this);
		this.handleBedsChange = this.handleBedsChange.bind(this);
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

	handleGuestsChange(e) {
		this.setState({
			guests: e.target.value
<<<<<<< HEAD
=======
		});
	}

	handleBedsChange(e) {
		this.setState({
			beds: e.target.value
>>>>>>> 9b2214f13005e05d468daa204122232437d09c71
		});
	}

	submitZipcode() {
		fetch("http://localhost:8081/getZipcodes/?zipcode="+this.state.selectedZipcode + "&guests=" + "this.state.guests" + "&beds="+this.state.beds, {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(zipcodeList => {
        console.log("a");


        // Map each attribute of a person in this.state.people to an HTML element
        let zipcodeDivs = zipcodeList.map((zipcode, i) =>
          <ZipcodeRow id={"row-" + zipcode.listing_id + zipcode.zipcode} listing_id={zipcode.listing_id} zipcode={zipcode.zipcode}
          neighbor={zipcode.neighbor + "--------."}
		  />

        );
        console.log(zipcodeDivs);
        // Set the state of the person list to the value returned by the HTTP response from the server.
        this.setState({
          genres: zipcodeDivs,
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

					<div className="guests-container">
						<div className = "dropdown-container">
							<select value={this.state.guests} onChange={this.handleGuestsChange} className="dropdown" id="guestsDropdown">
							 	<option select value> -- Guests -- </option>
								<option select value> 1 </option>
								<option select value> 2 </option>
								<option select value> 3 </option>
								<option select value> 4 </option>
								<option select value> 5 </option>
								<option select value> 6 </option>
								<option select value> 7 </option>
								<option select value> 8 </option>
								<option select value> 9 </option>
								<option select value> 10 </option>
								<option select value> 11 </option>
								<option select value> 12 </option>
								<option select value> 13 </option>
								<option select value> 14 </option>
								<option select value> 15 </option>
							</select>
						</div>
					</div>

					<div className="beds-container">
						<div className = "dropdown-container">
							<select value={this.state.beds} onChange={this.handleBedsChange} className="dropdown" id="bedsDropdown">
							 	<option select value> -- Beds -- </option>
								<option select value> 1 </option>
								<option select value> 2 </option>
								<option select value> 3 </option>
								<option select value> 4 </option>
								<option select value> 5 </option>
								<option select value> 6 </option>
								<option select value> 7 </option>
								<option select value> 8 </option>
								<option select value> 9 </option>
								<option select value> 10 </option>
								<option select value> 11 </option>
								<option select value> 12 </option>
								<option select value> 13 </option>
								<option select value> 14 </option>
								<option select value> 15 </option>
							</select>
						</div>
					</div>

			      </div>
			      <div className="jumbotron">
			        <div className="movies-container">
			          <div className="movie">
			            <div className="header"><strong>Listing ID</strong></div>
			            <div className="header"><strong>Neighborhood</strong></div>
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
