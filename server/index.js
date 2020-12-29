const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/* ---- (Get all Information About a Singular Listing) ---- */
//host information
app.get('/listing/host/:listingId', routes.getHostInfo);
//amenity information
app.get('/listing/amenity/:listingId', routes.getAmenityInfo);
//listing policy
app.get('/listing/listing_policy/:listingId', routes.getPolicyInfo);
//listing review
app.get('/listing/listing_review/:listingId', routes.getListingReviewInfo);
//url
app.get('/listing/url/:listingId', routes.getURLInfo);
//location
app.get('/listing/location/:listingId', routes.getLocationInfo);
//description
app.get('/listing/description/:listingId', routes.getDescriptionInfo);

//Zipcode
app.get('/getZipcodes', routes.getZipcode);
app.get('/getZipcodesZipcodes', routes.getZipcodesZipcodes);

// Discover
app.get('/getDiscover', routes.getDiscover);

//Host's Listings
app.get('/getHost/:hostId', routes.getHostListings);
app.get('/getHost', routes.hosts);

//ML
app.get('/getML', routes.getML);

//analytics
app.get('/getAvgPricePerZipcode', routes.getAvgPricePerZipcode);

app.get('/getAnnualRevenues', routes.getAnnualRevenues);

app.get('/getApartments', routes.getApartments);

app.get('/getMaxListings', routes.getMaxListings);

app.get('/getBestHosts', routes.getBestHosts);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});
