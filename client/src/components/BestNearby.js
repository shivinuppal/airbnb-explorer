import React from 'react';
import PageNavbar from './PageNavbar';
import ListingRow from './ListingRow';
import '../style/Zipcode.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Host extends React.Component {
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
		fetch("http://localhost:8081/getNearby/0", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(zipcodeList => {
        //console.log("a");


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
		fetch("http://localhost:8081/getNearby/"+this.state.selectedZipcode, {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(zipcodeList => {
        //console.log("a");


        // Map each attribute of a person in this.state.people to an HTML element
        let zipcodeDivs = zipcodeList.map((zipcode, i) => 
          <ListingRow id={"row-" + zipcode.listing_id + zipcode.zipcode} listing_id={zipcode.listing_id} zipcode={zipcode.zipcode}
          neighbor={zipcode.neighbor + "--------."}
          />

        );
        //console.log(zipcodeDivs);
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
			        <div className="h5">Get Best Nearby Listings</div>

			        <div className="years-container">
                    <div className="input-container">
			    			<input type='text' placeholder="Enter Listing Id" value={this.state.selectedZipcode} onChange={this.handleChange} id="listingId" className="movie-input"/>
			    			<button id="submitListingId" className="submit-btn" onClick={this.submitZipcode}>Submit</button>
			    		
			    		  
			          </div>
			        </div>
			      </div>
			      <div className="jumbotron">
			        <div className="movies-container">
			          <div className="movie">
                      <div className="header"><strong>Listing_ID</strong></div>
                        <div className="header"><strong>Value for Money (Price/Rating)</strong></div>
			            <div className="header"><strong>Price</strong></div>
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