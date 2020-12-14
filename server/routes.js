var config = require('./db-config.js');
var mysql = require('mysql');
const { runQuery } = require('./oracle-connection.js');


config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


function getHostInfo(req, res) {
  var listingId = req.params.listingId;
  console.log(typeof(listingId));
  //id, host_about, host_response_time, host_response_rate, host_acceptance_rate, host_is_superhost, host_neighbourhoor,
   // host_listings_total_count, host_identity_verified
   //WHERE id IN (SELECT host_id FROM Listings WHERE id = ${listingId})
  var query = `
    SELECT *
    FROM Host
  `;
  console.log(query);
  runQuery(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);

    }
  });
};

function getAmenityInfo(req, res) {
  var listingId = req.params.listingId;
  var query = `
    SELECT *
    FROM Amenity
    WHERE listing_id = ${listingId}
  `;

  runQuery(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);

    }
  });
};

function getPolicyInfo(req, res) {
  var listingId = req.params.listingId;
  console.log('policy');
  var query = `
    SELECT price, weekly_price, monthly_price, cancellation_policy, seurity_deposit AS security_deposit, cleaning_fee, extra_people,
    minimum_nights AS min_nights, maximum_nights AS max_nights
    FROM Listing_Policy
    WHERE listing_id = ${listingId}
  `;

  runQuery(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);

    }
  });
};

function getListingReviewInfo(req, res) {
  var listingId = req.params.listingId;
  var query = `
    SELECT l.number_of_reviews, l.reviews_per_month, r.comments
    FROM Listing_ReviewS l JOIN Reviews r ON l.listing_id = r.listing_id
    WHERE l.listing_id = ${listingId}
    LIMIT 5
  `;

  runQuery(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);

    }
  });
};

function getURLInfo(req, res) {
  console.log('url');
  var listingId = req.params.listingId;
  var query = `
    SELECT listing_url, picture_url
    FROM Url
    WHERE listing_id = ${listingId}
  `;

  runQuery(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);

    }
  });
};

function getLocationInfo(req, res) {
  console.log('location');
  var listingId = req.params.listingId;
  var query = `
    SELECT *
    FROM Location
    WHERE listing_id = ${listingId}
  `;

  runQuery(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);

    }
  });
};

function getDescriptionInfo(req, res) {
  var listingId = req.params.listingId;
  var query = `
    SELECT *
    FROM Descriptions
    WHERE listing_id = ${listingId}
  `;

  runQuery(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);

    }
  });
};

function getZipcode(req, res) {
  console.log("hi");
  zipcode = req.query.zipcode;
  console.log(zipcode);
  guests = req.query.guests;
  console.log(guests);
  beds = req.query.beds;
  console.log(beds);
  var currLat = 47.6205;
  var currLong = -122.3493;
  var miles = 2.5;

  // I have defaulted current location to the Space Needle

  var query = `
      SELECT listing_id, ACOS(SIN(3.14159265358979*${currLat}/180.0)*SIN(3.14159265358979*latitude/180.0)+COS(3.14159265358979*${currLat}/180.0)*COS(3.14159265358979*latitude/180.0)*COS(3.14159265358979*longitude/180.0-3.14159265358979*${currLong}/180.0))*6371 AS dist
      FROM Location
      WHERE street = '${zipcode}'
  `;



  var query = `
      WITH Distance AS (
          SELECT street, listing_id, ACOS(SIN(3.14159265358979*${currLat}/180.0)*SIN(3.14159265358979*latitude/180.0)+COS(3.14159265358979*${currLat}/180.0)*COS(3.14159265358979*latitude/180.0)*COS(3.14159265358979*longitude/180.0-3.14159265358979*${currLong}/180.0))*6371 AS dist
          FROM Location
          WHERE street = '${zipcode}'
      ), WithinDistance AS (
          SELECT listing_id, dist, street
          FROM Distance
          WHERE dist < ${miles}
      )
          SELECT w.listing_id, a.accommodates AS guests, ROUND(w.dist, 2) AS dist, a.bedrooms
          FROM WithinDistance w JOIN Amenity a ON w.listing_id = a.listing_id
          WHERE a.accommodates >= ${guests} AND a.bedrooms >= ${beds}
  `;

  console.log(query);
  runQuery(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {

      res.json(rows);
      console.log(rows)
    }
  });
};

function getNearby(req, res) {
  zipcode = req.params.zipcode;

  var query = `
  WITH CloseByListings AS (
    SELECT listing_id
    FROM Location
    WHERE SQRT((la - latitude) * (la - latitude) * 4761 + (lo - longitude) * (lo - longitude) * 2981.16) < X),
    VFM AS (
    SELECT p.listing_id, p.price / r.review_scores_rating AS vfm
    FROM listing_policy p JOIN ListingReview r ON p.listing_id = r.listing_id)
    SELECT listing_id
    FROM CloseByListings c JOIN VFM v ON c.listing_id = v.listing_id
    ORDER BY v.vfm
    LIMIT 10;
  `;
  console.log(query);
  runQuery(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function zipcodes(req, res) {

  var query = `
    SELECT DISTINCT street as zipcode
    FROM Location
  `;
  console.log(query);
  runQuery(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
}


function getHostListings(req, res) {
  hostId = req.params.hostId;

  var query = `
  WITH HostsListing AS (SELECT listing_id
    FROM Listing
    WHERE host_id = ${hostId})
    SELECT p.listing_id as listing_id, p.price as price, d.summary as summary
    FROM listing_policy p JOIN Descriptions d ON p.listing_id = d.listing_id
    WHERE p.listing_id IN (SELECT * FROM HostsListing);

  `;
  console.log(query);
  runQuery(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
      console.log(rows);
    }
  });
};

function hosts(req, res) {

  var query = `
    SELECT DISTINCT id
    FROM Host
  `;
  console.log(query);
  runQuery(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
}



// The exported functions, which can be accessed in index.js.
module.exports = {
  getHostInfo: getHostInfo,
  getAmenityInfo: getAmenityInfo,
  getPolicyInfo: getPolicyInfo,
  getListingReviewInfo: getListingReviewInfo,
  getURLInfo: getURLInfo,
  getLocationInfo: getLocationInfo,
  getDescriptionInfo: getDescriptionInfo,
  getZipcode: getZipcode,
  zipcodes: zipcodes,
  hosts: hosts,
  getHostListings: getHostListings
}
