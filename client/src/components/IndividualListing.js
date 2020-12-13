import React from 'react';
import PageNavbar from './PageNavbar';
import HostRow from './HostRow';
import AmenityRow from './AmenityRow';
import UrlRow from './UrlRow';
import '../style/IndividualListing.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class IndividualListing extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			listingId: "",
			hostInfo:[],
			amenityInfo:[],
			urlInfo: ""

		}

		this.handleListingId = this.handleListingId.bind(this);
		this.submitListingId = this.submitListingId.bind(this);
	}

	handleListingId(e) {
		this.setState({
			listingId: e.target.value
		});
	}

	/* ---- Getting all Information about a ListingID ---- */
	submitListingId() {
		console.log(this.state.listingId);
		Promise.all([
			fetch("http://localhost:8081/listing/host/" + this.state.listingId),
			fetch("http://localhost:8081/listing/amenity/" + this.state.listingId),
		//	fetch("http://localhost:8081/listing/listing_policy/" + this.state.listingId),
			fetch("http://localhost:8081/listing/listing_review/" + this.state.listingId),
			fetch("http://localhost:8081/listing/url/" + this.state.listingId),
			fetch("http://localhost:8081/listing/location/" + this.state.listingId), 
			fetch("http://localhost:8081/listing/description/" + this.state.listingId)
		])
		.then(res => Promise.all(res.map(response => response.json())))
		.then(infoList => {
			console.log(infoList);
			let urlDiv = infoList[3][0].picture_url; 
			let hostDiv =
				<HostRow id={infoList[0][0].id} host_about={infoList[0][0].host_about} 
				host_response_time={infoList[0][0].host_response_time} host_response_rate={infoList[0][0].host_response_rate}
				host_acceptance_rate={infoList[0][0].host_acceptance_rate} host_is_superhost={infoList[0][0].host_is_superhost}
				host_neighborhood={infoList[0][0].host_neighborhood} host_total_listings_count={infoList[0][0].host_total_listings_count}
				host_identity_verified={infoList[0][0].host_identity_verified}
				/>
			let descriptionDiv = 
			let amenityDiv =
				<AmenityRow property_type={infoList[1][0].property_type} room_type={infoList[1][0].room_type} 
				accommodates={infoList[1][0].accommodates} bathrooms={infoList[1][0].bathrooms}
				bathrooms={infoList[1][0].bathrooms} bedrooms={infoList[1][0].bedrooms}
				beds={infoList[1][0].beds} bed_type={infoList[1][0].bed_type}
				amenities={infoList[1][0].amenities} square_feet={infoList[1][0].square_feet} 
				guests_included={infoList[1][0].guests_included}/>
			
			this.setState({
				hostInfo: hostDiv,
				amenityInfo: amenityDiv,
				urlInfo: urlDiv
			});

		});
	}


	render() {

		return (
			<div className="IndividualListing">
				<PageNavbar active="IndividualListing" />

			    <div className="container listing-container">
			    	<div className="jumbotron">
			    		<div className="h5">IndividualListing</div>
			    		<br></br>
			    		<div className="input-container">
			    			<input type='text' placeholder="Enter Listing Id" value={this.state.listingId} onChange={this.handleListingId} id="listingId" className="movie-input"/>
			    			<button id="submitListingId" className="submit-btn" onClick={this.submitListingId}>Submit</button>
			    		</div>
			    		<div className="listing-container">
			    			<div className="h6">Information</div>
							<div className="row">
  								<div className="column">
								  <img className="pic" src={this.state.urlInfo}/>  
								  <div className="header"><strong>Amenity Info</strong></div>
									<div className="amenityResults" id="results">
			    					{this.state.amenityInfo}
			    					</div>
								  </div>
  								<div className="column">
								  <div className="header"><strong>Host Info</strong></div>
									<div className="hostResults" id="results">
			    					{this.state.hostInfo}
			    					</div>
								  </div>
								  
							</div>
			    		</div>
			    	</div>
			    </div>
		    </div>
		);
	}
}
