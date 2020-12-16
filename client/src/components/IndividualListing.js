import React from 'react';
import PageNavbar from './PageNavbar';
import HostRow from './HostRow';
import AmenityRow from './AmenityRow';
import DescriptionRow from './DescriptionRow';
import PolicyRow from './PolicyRow';
import MLRow from './MLRow';
import '../style/IndividualListing.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class IndividualListing extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			listingId: this.props.match.params.listingId,
			hostInfo: "",
			amenityInfo: "",
			ML: [],
			urlInfo: "",
			descriptionInfo: "",
			reviewInfo: "",
			policyInfo: "",
			reviewComments: []
		}

		this.handleListingId = this.handleListingId.bind(this);
		this.submitML = this.submitML.bind(this);
	//	this.submitListingId = this.submitListingId.bind(this);
	}

	handleListingId(e) {
		this.setState({
			listingId: e.target.value
		});
	}

	/* ---- Getting all Information about a ListingID ---- */
	componentDidMount() {
		console.log(this.state.listingId);
		Promise.all([
			fetch("http://localhost:8081/listing/host/" + this.state.listingId),
			fetch("http://localhost:8081/listing/amenity/" + this.state.listingId),
			fetch("http://localhost:8081/listing/listing_policy/" + this.state.listingId),
			fetch("http://localhost:8081/listing/url/" + this.state.listingId),
			fetch("http://localhost:8081/listing/location/" + this.state.listingId),
			fetch("http://localhost:8081/listing/description/" + this.state.listingId),
		    fetch("http://localhost:8081/listing/listing_review/" + this.state.listingId)
		])
			.then(res => Promise.all(res.map(response => response.json())))
			.then(infoList => {
				console.log(infoList);
				let urlDiv = "";
				if (infoList[3].length !== 0) {
					urlDiv = infoList[3][0][1];
				}
				let hostDiv =
					<HostRow id={infoList[0][0][0]} host_about={infoList[0][0][1]}
						host_response_time={infoList[0][0][2]} host_response_rate={infoList[0][0][3]}
						host_acceptance_rate={infoList[0][0][4]} host_is_superhost={infoList[0][0][5]}
						host_neighborhood={infoList[0][0][6]} host_total_listings_count={infoList[0][0][7]}
						host_identity_verified={infoList[0][0][8]} name={infoList[0][0][9]}
					/>
				if (infoList[5][0][6] === null) {
					infoList[5][0][6] = "No Information";
				}
				let descriptionDiv = <DescriptionRow name={infoList[5][0][1]} description={infoList[5][0][2]}
					neighbourhood_cleansed={infoList[4][0][3]} neighborhood_overview={infoList[4][0][4]}
					zipcode={infoList[4][0][5]} transit={infoList[5][0][7]}
				/>
				let amenityDiv =
					<AmenityRow property_type={infoList[1][0][2]} room_type={infoList[1][0][3]}
						accommodates={infoList[1][0][4]} bathrooms={infoList[1][0][5]}
						bedrooms={infoList[1][0][6]} beds={infoList[1][0][7]}
						bed_type={infoList[1][0][8]} amenities={(infoList[1][0][9]).replace('{', '').replace('}', '')}
						square_feet={infoList[1][0][10]} guests_included={infoList[1][0][11]}
						/>
				let reviewDivComments = "";
				let reviewDiv = "";
				if (infoList[6].length !== 0) {
					reviewDivComments = infoList[6].map((review, i) =>
					<div key={i} className="comment"><strong>Comment: </strong> {review[1]}</div>
					);
					reviewDiv = <div className="number_of_reviews"><strong>Number of Reviews: </strong>{infoList[2][0][0]}</div>

				}
				for (var i in infoList[2][0]) {
					if (infoList[2][0][i] === null) {
						infoList[2][0][i] = "No Information";
					}
				}
				let policyDiv =
				<PolicyRow price={infoList[2][0][0]} cancellation_policy={infoList[2][0][3]}
				security_deposit={infoList[2][0][4]} cleaning_fee={infoList[2][0][5]}
				min_nights={infoList[2][0][7]} max_nights={infoList[2][0][8]} />
				this.setState({
					hostInfo: hostDiv,
					amenityInfo: amenityDiv,
					urlInfo: urlDiv,
					descriptionInfo: descriptionDiv,
					reviewInfo: reviewDiv,
					reviewComments: reviewDivComments,
					policyInfo: policyDiv
				});

			})
			.then(
				this.submitML()
			);
	}

	submitML() {
		fetch("http://localhost:8081/getML?listingId=" + this.state.listingId, {
			method: 'GET' // The type of HTTP request.
		})
			.then(res => res.json()) // Convert the response data to a JSON.
			.then(zipcodeList => {
				// Map each attribute of a person in this.state.people to an HTML element
				let zipcodeDivs = zipcodeList.map((zipcode, i) =>
					<MLRow id={i} listing_id={zipcode[0]} name={zipcode[1]} summary={("" + zipcode[2]).substring(0, 190) + " ..."} description={zipcode[3]}
					pic={zipcode[4]}
					/>

				);
				console.log(zipcodeDivs);
				// Set the state of the person list to the value returned by the HTTP response from the server.
				this.setState({
					ML: zipcodeDivs
				})

			})
			.catch(err => console.log(err))

	}





	render() {

		return (
			<div className="IndividualListing">
				<PageNavbar active="IndividualListing" />
				<div className="container listing-container">
					<div className="jumbotron" id="jumbo">
						<div className="listing-container">
							<div className="row">
								<div className="column">
									<img className="pic" src={this.state.urlInfo} />
									<div className="header"><strong><u>Host Info</u></strong></div>
									<div className="hostResults" id="results">
										{this.state.hostInfo}
									</div>
								</div>
								<div className="column">
									<div className="header"><strong><u>Description</u></strong></div>
									<div className="descriptionResults" id="results">
										{this.state.descriptionInfo}
			    					</div>
									<div className="header"><strong><u>Amenity Info</u></strong></div>
									<div className="amenityResults" id="results">
										{this.state.amenityInfo}
									</div>
								</div>
								<div className="column">
									<div className="header"><strong><u>Policies</u></strong></div>
									<div className="descriptionResults" id="results">
										{this.state.policyInfo}
									</div>
									<div className="header"><strong><u>Reviews</u></strong></div>
									<div className="reviewResults" id="results">
										{this.state.reviewInfo}
										{this.state.reviewComments}
									</div>
								</div>
							</div>


						</div>
						</div>
						<div className="discover-container center">
						{this.state.ML}
						</div>

				</div>
			</div>
		);
	}
}
