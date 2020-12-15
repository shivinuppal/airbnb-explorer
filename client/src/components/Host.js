import React from 'react';
import PageNavbar from './PageNavbar';
import ListingRow from './ListingRow';
import HostRow from './HostRow';
import '../style/Zipcode.css';
import 'bootstrap/dist/css/bootstrap.min.css';
export default class Host extends React.Component {
	constructor(props) { 
		super(props);
		this.state = {
			hostId: this.props.match.params.hostId,
			hostInfo: "",
			listings: []
		};

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
		  <ListingRow key={i} listing_id={host[0]} price={host[1]} summary={host[2]} pic={host[3]}
		  />
		);
		let hostDiv =
					<HostRow id={hostList[0][4]} host_about={hostList[0][5]}
						host_response_time={hostList[0][6]} host_response_rate={hostList[0][7]}
						host_acceptance_rate={hostList[0][8]} host_is_superhost={hostList[0][9]}
						host_neighborhood={hostList[0][10]} host_total_listings_count={hostList[0][11]}
						host_identity_verified={hostList[0][12]}
					/> 
		console.log(listingDivs);
		// Set the state of the person list to the value returned by the HTTP response from the server.
		this.setState({
			hostInfo: hostDiv, 
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
						{this.state.hostInfo}
			        </div>
			      </div>
				  {this.state.listings}
			    </div>
			</div>
		);
	}
}
