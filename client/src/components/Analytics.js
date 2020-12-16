import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import AnalyticsRow from './AnalyticsRow';
import AnnualRevenuesRow from './AnnualRevenuesRow';
import ApartmentsRow from './ApartmentsRow';
import MaxListingsRow from './MaxListingsRow';
import HostsRow from './HostsRow';

export default class Analytics extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      zips: [],
      annualRevs: [],
      apartments: [],
      maxListings: [],
      hosts: []
    }
    this.showAveragePricePerZipcode = this.showAveragePricePerZipcode.bind(this);
    this.showAnnualRevenues = this.showAnnualRevenues.bind(this);
    this.showApartments = this.showApartments.bind(this);
    this.showMaxListings = this.showMaxListings.bind(this);
    this.showBestHosts = this.showBestHosts.bind(this);
  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    this.render();
  }


  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showAveragePricePerZipcode() {
    fetch("http://localhost:8081/getAvgPricePerZipcode", {
			method: "GET"
		})
			.then(res => res.json())
			.then(zipsList => {
				console.log(zipsList);
				let zipsDivs = zipsList.map((zip, i) =>
        <AnalyticsRow key={i} zipcode={zip[0]} avgprice={"$" + zip[1]}/>
        );
          this.setState({
            zips: zipsDivs
          });
        })
        .catch(err => console.log(err))
    }

    //annual revenues
    showAnnualRevenues() {
        fetch("http://localhost:8081/getAnnualRevenues", {
			method: "GET"
		})
			.then(res => res.json())
			.then(revsList => {
				console.log(revsList);
				let revsDivs = revsList.map((rev, i) =>
        <AnnualRevenuesRow key={i} listing={rev[0]} annualrev={"$" + rev[1]} 
        area={rev[2]}/>
        );
          this.setState({
            annualRevs: revsDivs
          });
        })
        .catch(err => console.log(err))
    }

   //annual revenues
   showApartments() {
    fetch("http://localhost:8081/getApartments", {
        method: "GET"
    })
        .then(res => res.json())
        .then(apartmentsList => {
            console.log(apartmentsList);
            let apartmentsDivs = apartmentsList.map((apartment, i) =>
    <ApartmentsRow key={i} listing={apartment[0]} guests={apartment[1]} 
    price={"$" + apartment[2]} max_nights={apartment[3]} min_nights={apartment[4]}/>
    );
      this.setState({
        apartments: apartmentsDivs
      });
    })
    .catch(err => console.log(err))
}

//Listings with max(bathrooms, bedrooms, beds)
showMaxListings() {
    fetch("http://localhost:8081/getMaxListings", {
        method: "GET"
    })
        .then(res => res.json())
        .then(maxListingsList => {
            console.log(maxListingsList);
            let maxListingsDivs = maxListingsList.map((listing, i) =>
    <MaxListingsRow key={i} listing={listing[0]} price={ "$" + listing[1]} 
    bathrooms={listing[2]} bedrooms={listing[3]} beds={listing[4]}/>
    );
      this.setState({
        maxListings: maxListingsDivs
      });
    })
    .catch(err => console.log(err))
}

//show best hosts
showBestHosts() {
    fetch("http://localhost:8081/getBestHosts", {
			method: "GET"
		})
			.then(res => res.json())
			.then(hostsList => {
				console.log(hostsList);
				let hostsDivs = hostsList.map((host, i) =>
        <HostsRow key={i} host={host[0]} listings={host[1]}
        price={"$" + host[2]}/>
        );
          this.setState({
            hosts: hostsDivs
          });
        })
        .catch(err => console.log(err))
    }

  render() {
    return (
      <div className="Analytics">

        <PageNavbar active="analytics" />

        <br></br>
        <div className="container movies-container">

          <br></br>
          <div className="input-container">
			<button id="ZipsBtn" className="submit-btn" onClick={this.showAveragePricePerZipcode()}>Average Price Per ZipCode</button>
		  </div>
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <div className="header"><strong>Zipcode</strong></div>
                <div className="header"><strong>Average Price</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.zips}
              </div>
            </div>
          </div>
          
          <br></br>
          <div className="input-container">
			<button id="ApartsBtn" className="submit-btn" onClick={this.showAnnualRevenues()}>Annual Revenues</button>
		  </div>
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <div className="header"><strong>Listing</strong></div>
                <div className="header"><strong>Annual Revenue</strong></div>
                <div className="header"><strong>Listing Area</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.annualRevs}
              </div>
            </div>
          </div>
          <br></br>
          <div className="input-container">
			<button id="RevsBtn" className="submit-btn" onClick={this.showApartments()}>Apartments</button>
		  </div>
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <div className="header"><strong>Listing</strong></div>
                <div className="header"><strong>Guests</strong></div>
                <div className="header"><strong>Daily Price</strong></div>
                <div className="header"><strong>Maximum Nights</strong></div>
                <div className="header"><strong>Minimum Nights</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.apartments}
              </div>
            </div>
          </div>

          <br></br>
          <div className="input-container">
			<button id="MaxListsBtn" className="submit-btn" onClick={this.showMaxListings()}>Average Listings</button>
		  </div>
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <div className="header"><strong>Listing</strong></div>
                <div className="header"><strong>Price</strong></div>
                <div className="header"><strong>Bathrooms</strong></div>
                <div className="header"><strong>Bedrooms</strong></div>
                <div className="header"><strong>Beds</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.maxListings}
              </div>
            </div>
          </div>

          <br></br>
          <div className="input-container">
			<button id="HostsBtn" className="submit-btn" onClick={this.showBestHosts()}>Best Hosts</button>
		  </div>
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <div className="header"><strong>Host</strong></div>
                <div className="header"><strong>Total Listings</strong></div>
                <div className="header"><strong>Average Price</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.hosts}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
