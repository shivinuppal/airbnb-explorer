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

	componentDidMount() {
		fetch("http://localhost:8081/getNearby/0", {
			method: 'GET' 
		})
			.then(res => res.json()) 
			.then(zipcodeList => {

				let zipcodeDivs = zipcodeList.map((zipcode, i) =>
					[<option value={zipcode.zipcode}>{zipcode.zipcode}</option>]

				);

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

	submitZipcode() {
		fetch("http://localhost:8081/getNearby/" + this.state.selectedZipcode, {
			method: 'GET' 
		})
			.then(res => res.json()) 
			.then(zipcodeList => {

				let zipcodeDivs = zipcodeList.map((zipcode, i) =>
					<ZipcodeRow id={"row-" + zipcode.listing_id + zipcode.zipcode} listing_id={zipcode.listing_id} zipcode={zipcode.zipcode}
						neighbor={zipcode.neighbor + "--------."}
					/>

				);
				console.log(zipcodeDivs);
				
				this.setState({
					genres: zipcodeDivs,
				})

			})
			.catch(err => console.log(err))

	}

	render() {

		return (
			<div className="Zipcode">
				<PageNavbar active="bestNearby" />

				<div className="container bestgenres-container">
					<div className="jumbotron">
						<div className="h5">Get Best Nearby Listings</div>

						<div className="years-container">
							<div className="input-container">
								<input type='text' placeholder="Enter Listing Id" value={this.state.selectedZipcode} onChange={this.handleChange} id="listingId" className="movie-input" />
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