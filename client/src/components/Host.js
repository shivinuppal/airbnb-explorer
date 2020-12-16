import React from 'react';
import PageNavbar from './PageNavbar';
import ZipcodeRow from './ZipcodeRow';
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
		fetch("http://localhost:8081/getHost", {
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
		fetch("http://localhost:8081/getHost/"+this.state.selectedZipcode, {
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
	componentDidMount() {
		//console.log(this.state.hostId);
		fetch("http://localhost:8081/getHost/" + this.state.hostId, {
	  method: 'GET' // The type of HTTP request.
	})
	  .then(res => res.json()) // Convert the response data to a JSON.
	  .then(hostList => {
		//console.log(hostList);
		// Map each attribute of a person in this.state.people to an HTML element
		let listingDivs = hostList.map((host, i) => 
		  <ListingRow key={i} listing_id={host[0]} price={host[1]} summary={host[2]} pic={host[3]}
		  />
		);
		let hostPicDiv = hostList[0][14];
		let hostDiv =
					<HostRow id={hostList[0][4]} host_about={hostList[0][5]}
						host_response_time={hostList[0][6]} host_response_rate={hostList[0][7]}
						host_acceptance_rate={hostList[0][8]} host_is_superhost={hostList[0][9]}
						host_neighborhood={hostList[0][10]} host_total_listings_count={hostList[0][11]}
						host_identity_verified={hostList[0][12]} name={hostList[0][13]}
					/> 
		//console.log(listingDivs);
		// Set the state of the person list to the value returned by the HTTP response from the server.
		this.setState({
			hostInfo: hostDiv, 
			hostPic: hostPicDiv, 
			listings: listingDivs
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