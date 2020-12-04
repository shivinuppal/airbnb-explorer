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
		this.handleChange = this.handleChange.bind(this);
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
			            <div className="header"><strong>Zipcode</strong></div>
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