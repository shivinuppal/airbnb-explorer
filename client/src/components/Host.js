import React from 'react';
import PageNavbar from './PageNavbar';
import ListingRow from './ListingRow';
import '../style/Zipcode.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Host extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hostId: "",
			allHosts: [<option value={2}>"l"</option>],
			listings: []
		};

		this.submitHostId = this.submitHostId.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	/* ---- Q3a (Best Genres) ---- */
	componentDidMount() {
		fetch("http://localhost:8081/getHost", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(hostList => {

        // Map each attribute of a person in this.state.people to an HTML element
        let hostDivs = hostList.map((host, i) => 
		[<option key={i} value={host.id}>{host.id}</option>]

        );
        // Set the state of the person list to the value returned by the HTTP response from the server.
        this.setState({
          allHosts: hostDivs,
        })
      
      })
      .catch(err => console.log(err))
    
	}

	handleChange(e) {
		this.setState({
			hostId: e.target.value
		});
	}

	submitHostId() {
		fetch("http://localhost:8081/getHost/"+this.state.hostId, {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(hostList => {
        console.log("a");


        // Map each attribute of a person in this.state.people to an HTML element
        let hostDivs = hostList.map((host, i) => 
          <ListingRow id={"row-" + host.listing_id + host.id} listing_id={host.listing_id} summary={host.id}
          price={host.price}
          />

        );
        console.log(hostDivs);
        // Set the state of the person list to the value returned by the HTTP response from the server.
        this.setState({
          listings: hostDivs,
        })
      
      })
      .catch(err => console.log(err))
    
	}

	render() {

		return (
			<div className="Zipcode">
				<PageNavbar active="host" />

				<div className="container bestgenres-container">
			      <div className="jumbotron">
			        <div className="h5">Get Host's Listings</div>

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
                      <div className="header"><strong>Listing_ID</strong></div>
                        <div className="header"><strong>Price</strong></div>
			            <div className="header"><strong>Summary</strong></div>
			          </div>
			          <div className="movies-container" id="results">
			            {this.state.listings}
			          </div>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}