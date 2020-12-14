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
			allHosts: [],
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

	export submitHostId(host_id) {
		//console.log(this.state.hostId);
		fetch("http://localhost:8081/getHost/" + host_id, {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(hostList => {
        console.log(hostList);

        // Map each attribute of a person in this.state.people to an HTML element
        let hostDivs = hostList.map((host, i) => 
          <ListingRow key={i} listing_id={host.listing_id} price={host.price} summary={host.summary}
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
			            <select value={this.state.submitHostId} onChange={this.handleChange} className="dropdown" id="zipcodesDropdown">
			            	<option select value> -- select an option -- </option>
			            	{this.state.allHosts}
			            </select>
			            <button className="submit-btn" id="zipcodesSubmitBtn" onClick={this.submitHostId}>Submit</button>
			          </div>
			        </div>
			      </div>
			      <div className="jumbotron">
			        <div className="hosts-container">
						  <table>
							  <tr>
							  <th className="header"><strong>Listing_ID</strong></th>
                        	<th className="header"><strong>Price</strong></th>
			            	<th className="header"><strong>Summary</strong></th>
							  </tr>
							  {this.state.listings}
						  </table>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}