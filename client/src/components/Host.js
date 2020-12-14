import React from 'react';
import PageNavbar from './PageNavbar';
import ListingRow from './ListingRow';
import '../style/Zipcode.css';
import 'bootstrap/dist/css/bootstrap.min.css';
export default class Host extends React.Component {
	constructor(props) { 
		super(props);
		this.state = {
			hostId: this.props.match.params.hostId,
			allHosts: [],
			listings: []
		};

		//this.submitHostId = this.submitHostId.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	/* ---- Q3a (Best Genres) ---- 
	submitHostId() {
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
    
	} */

	handleChange(e) {
		this.setState({
			hostId: e.target.value
		});
	}

	componentDidMount() {
		console.log(this.state.hostId);
		fetch("http://localhost:8081/getHost/" + this.state.hostId, {
	  method: 'GET' // The type of HTTP request.
	})
	  .then(res => res.json()) // Convert the response data to a JSON.
	  .then(hostList => {
		console.log(hostList);
		// Map each attribute of a person in this.state.people to an HTML element
		let listingDivs = hostList.map((host, i) => 
		  <ListingRow key={i} listing_id={host[0]} price={host[1]} summary={host[2]}
		  />
	
		);
		console.log(listingDivs);
		// Set the state of the person list to the value returned by the HTTP response from the server.
		this.setState({
		  listings: listingDivs
		})
	  })
	  .catch(err => console.log(err))
	}

	render() {

		return (
			<div className="Host">
				<PageNavbar active="host" />

				<div className="container hosts-container">
			      <div className="jumbotron">
			        <div className="hosts-container">
						
						  <table>
							  <thead>
								  <tr>
								  <th className="header"><strong>Listing_ID</strong></th>
                        			<th className="header"><strong>Price</strong></th>
			            			<th className="header"><strong>Summary</strong></th>
								  </tr>
							  </thead>
							  <tbody> 
							  {this.state.listings}
							  </tbody>
						  </table>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}
