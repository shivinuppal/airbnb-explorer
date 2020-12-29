import React from 'react';
import '../style/Analytics.css';
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
    // and a list of analytics for a specified genre.
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
     this.showAveragePricePerZipcode();
     this.showAnnualRevenues();
     this.showApartments();
     this.showMaxListings();
     this.showBestHosts();
     this.render();
   }


  showAveragePricePerZipcode() {
    fetch("http://localhost:8081/getAvgPricePerZipcode", {
      method: "GET"
    })
      .then(res => res.json())
      .then(zipsList => {
        console.log(zipsList);
        let zipsDivs = zipsList.map((zip, i) =>
          <AnalyticsRow key={i} zipcode={zip[0]} avgprice={"$" + zip[1]} />
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
          <AnnualRevenuesRow key={i} listing={rev[0]} annualrev={rev[1]} name={rev[2]}/>
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
            price={"$" + apartment[2]} max_nights={apartment[3]} min_nights={apartment[4]} name={apartment[5]}/>
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
          <MaxListingsRow key={i} listing={listing[0]} price={"$" + listing[1]}
            bathrooms={listing[2]} bedrooms={listing[3]} beds={listing[4]} name={listing[5]}/>
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
          <HostsRow key={i} host={host[0]} listings={host[1]} name={host[3]}
            price={"$" + host[2]} />
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
        <div className="container analytics-container">

          <div className="jumbotron">
            <div className="analytics-container">
            <div className= "h2">The most expensive zipcodes $$$ </div>
              <div className="analytics-header">
                <div className="header"><strong>Zipcode</strong></div>
                <div className="header"><strong>Average Price</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.zips}
              </div>
            </div>
          </div>

          <br></br>
          <div className="jumbotron">
            <div className="analytics-container">
            <div className= "h2">Airbnbs with the top Annual Revenue per square foot</div>
              <div className="analytics-header">
                <div className="header"><strong>Name</strong></div>
                <div className="header"><strong>Annual Revenue Per Square Foot</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.annualRevs}
              </div>
            </div>
          </div>
          <br></br>
          <div className="jumbotron">
            <div className="analytics-container">
            <div className= "h2">Apartments you can throw a party at!</div>
              <div className="listing-header">
                <div className="header"><strong>Listing</strong></div>
                <div className="header"><strong>Guests</strong></div>
                <div className="header"><strong>Daily Price</strong></div>
                <div className="header"><strong>Max Nights</strong></div>
                <div className="header"><strong>Min Nights</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.apartments}
              </div>
            </div>
          </div>

          <br></br>
          <div className="jumbotron">
            <div className="analytics-container">
            <div className= "h2">For the average Joe: </div>
            <div className= "h5">These have average prices, average beds, average everything </div>
              <div className="listing-header">
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
          <div className="jumbotron">
            <div className="analytics-container">
              <div className= "h2">Check out these great hosts</div>
              <div className="analytics-header">
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
