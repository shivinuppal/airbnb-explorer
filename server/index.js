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




/* ---- (Dashboard) ---- */
// The route localhost:8081/genres is registered to the function
// routes.getAllGenres, specified in routes.js.

/* ---- (Get all Information About a Singular Listing) ---- */
//host information
app.get('/listing/host/:listingId', routes.getHostInfo);
//amenity information 
app.get('/listing/amenity/:listingId', routes.getAmenityInfo);

//Zipcode
app.get('/getZipcodes/:zipcode', routes.getZipcode);
app.get('/zipcodes', routes.zipcodes);

//Host's Listings
app.get('/getHost/:zipcode', routes.getHostListings);
app.get('/getHost', routes.hosts);








app.listen(8081, () => {
<<<<<<< Updated upstream
	console.log(`Server listening on PORT 8081`);
});
=======
	//console.log(`Server listening on PORT 8081`);
});
>>>>>>> Stashed changes
