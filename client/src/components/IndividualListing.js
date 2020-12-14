import React from 'react';
import PageNavbar from './PageNavbar';
import HostRow from './HostRow';
import AmenityRow from './AmenityRow';
import DescriptionRow from './DescriptionRow';
import ReviewRow from './ReviewRow';
import Host from './Host';
import '../style/IndividualListing.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class IndividualListing extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			listingId: "",
			hostInfo: "",
			amenityInfo: "",
			urlInfo: "",
			descriptionInfo: "", 
			reviewInfo: "", 
			reviewComments: []
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
	submitListingId(listing_id) {
		console.log(this.state.listingId);
		console.log(listing_id); 
	/*	Promise.all([
			fetch("http://localhost:8081/listing/host/" + listing_id),
			fetch("http://localhost:8081/listing/amenity/" + listing_id),
			fetch("http://localhost:8081/listing/listing_review/" + listing_id),
			fetch("http://localhost:8081/listing/url/" + listing_id),
			fetch("http://localhost:8081/listing/location/" + listing_id),
			fetch("http://localhost:8081/listing/description/" + listing_id)
		//	fetch("http://localhost:8081/listing/listing_policy/" + this.state.listingId),
		])
	*/	Promise.all([
			fetch("http://localhost:8081/listing/host/" + this.state.listingId),
			fetch("http://localhost:8081/listing/amenity/" + this.state.listingId),
			fetch("http://localhost:8081/listing/listing_review/" + this.state.listingId),
			fetch("http://localhost:8081/listing/url/" + this.state.listingId),
			fetch("http://localhost:8081/listing/location/" + this.state.listingId),
			fetch("http://localhost:8081/listing/description/" + this.state.listingId)
		//	fetch("http://localhost:8081/listing/listing_policy/" + this.state.listingId),
		]) 
			.then(res => Promise.all(res.map(response => response.json())))
			.then(infoList => {
				console.log(infoList);
				let urlDiv = ""; 
				if (infoList[3].length !== 0) {
					urlDiv = infoList[3][0].picture_url;
				}
				let hostDiv =
					<HostRow id={infoList[0][0].id} host_about={infoList[0][0].host_about}
						host_response_time={infoList[0][0].host_response_time} host_response_rate={infoList[0][0].host_response_rate}
						host_acceptance_rate={infoList[0][0].host_acceptance_rate} host_is_superhost={infoList[0][0].host_is_superhost}
						host_neighborhood={infoList[0][0].host_neighborhood} host_total_listings_count={infoList[0][0].host_total_listings_count}
						host_identity_verified={infoList[0][0].host_identity_verified}
					/>
				let descriptionDiv = <DescriptionRow name={infoList[5][0].name} description={infoList[5][0].description}
					neighbourhood_cleansed={infoList[4][0].neighbourhood_cleansed} neighborhood_overview={infoList[4][0].neighborhood_overview}
					zipcode={infoList[4][0].zipcode} transit={infoList[5][0].transit}
				/>
				let amenityDiv =
					<AmenityRow property_type={infoList[1][0].property_type} room_type={infoList[1][0].room_type}
						accommodates={infoList[1][0].accommodates} bathrooms={infoList[1][0].bathrooms}
						bedrooms={infoList[1][0].bedrooms} beds={infoList[1][0].beds} 
						bed_type={infoList[1][0].bed_type} amenities={infoList[1][0].amenities} 
						square_feet={infoList[1][0].square_feet} guests_included={infoList[1][0].guests_included} 
						/>
				let reviewDivComments = ""; 
				let reviewDiv = ""; 
				if (infoList[2].length !== 0) {
					console.log(infoList[2][2].comments);
					reviewDivComments = infoList[2].map((review, i) =>
					<div key={i} className="comment">Comment: {review.comments}</div>
					);
					reviewDiv = <ReviewRow number_of_reviews={infoList[2][0].number_of_reviews} 
					reviews_per_month={infoList[2][0].reviews_per_month}/>
					
				}
				
				this.setState({
					hostInfo: hostDiv,
					amenityInfo: amenityDiv,
					urlInfo: urlDiv,
					descriptionInfo: descriptionDiv, 
					reviewInfo: reviewDiv,
					reviewComments: reviewDivComments
				});

			});
	}

	render() {

		return (
			<div className="IndividualListing">
				<PageNavbar active="IndividualListing" />

				<div className="container listing-container">
					<div className="jumbotron" id="jumbo">
						<div className="h5">IndividualListing</div>
						<br></br>
						<div className="input-container">
							<input type='text' placeholder="Enter Listing Id" value={this.state.listingId} onChange={this.handleListingId} id="listingId" className="movie-input" />
							<button id="submitListingId" className="submit-btn" onClick={this.submitListingId}>Submit</button>
						</div>
						<div className="listing-container">
							<div className="row">
								<div className="column">
									<img className="pic" src={this.state.urlInfo} />
									<div className="header"><strong>Host Info</strong></div>
									<div className="hostResults" id="results">
										{this.state.hostInfo}
									</div>
								</div>
								<div className="column">
									<div className="header"><strong>Description</strong></div>
									<div className="descriptionResults" id="results">
										{this.state.descriptionInfo}
			    					</div>
									<div className="header"><strong>Amenity Info</strong></div>
									<div className="amenityResults" id="results">
										{this.state.amenityInfo}
									</div>
								</div>
								<div className="column">
									<div className="header"><strong>Price</strong></div>
									<div className="descriptionResults" id="results">
										PLACE HOLDER UNTIL LISTING POLICY GETS UPLOADED
									</div>
									<div className="header"><strong>Reviews</strong></div>
									<div className="reviewResults" id="results">
										{this.state.reviewInfo}
										{this.state.reviewComments}
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
