var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


function getHostInfo(req, res) {
  var listingId = req.params.listingId; 
  var query = `
    SELECT id, host_about, host_response_time, host_response_rate, host_acceptance_rate, host_is_superhost, host_neighborhood, 
    host_total_listings_count, host_identity_verified
    FROM Host
    WHERE id = (SELECT host_id FROM Listing WHERE listing_id = '${listingId}')
    ;
  `;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
      
    }
  });
};

function getAmenityInfo(req, res) {
  var listingId = req.params.listingId; 
  var query = `
    SELECT *
    FROM Amenity
    WHERE listing_id = '${listingId}'
    ;
  `;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
      
    }
  });
};

function getPolicyInfo(req, res) {
  var listingId = req.params.listingId; 
  var query = `
    SELECT cancellation_policy, price, weekly_price, monthly_price, security_deposit, cleaning_fee, extra_people,
    min_nights, max_nights
    FROM ListingPolicy
    WHERE listing_id = '${listingId}'
    ;
  `;

  connection.query(query, function(err, rows, fields) {
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
    FROM ListingReview l JOIN Reviews r ON l.listing_id = r.listing_id
    WHERE l.listing_id = '${listingId}'
    LIMIT 5
    ;
  `;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
      
    }
  });
};

function getURLInfo(req, res) {
  var listingId = req.params.listingId; 
  var query = `
    SELECT listing_url, picture_url
    FROM Url
    WHERE listing_id = '${listingId}'
    ;
  `;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
      
    }
  });
};

function getLocationInfo(req, res) {
  var listingId = req.params.listingId; 
  var query = `
    SELECT *
    FROM Locations
    WHERE listing_id = '${listingId}'
    ;
  `;

  connection.query(query, function(err, rows, fields) {
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
    WHERE listing_id = '${listingId}'
    ;
  `;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
      
    }
  });
};

function getZipcode(req, res) {
  zipcode = req.params.zipcode;
  
  var query = `
    Select listing_id, street as zipcode, neighborhood_group_cleansed as neighbor
     from Locations where street = "${zipcode}"
  `;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
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
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function zipcodes(req, res) {
  
  var query = `
    SELECT DISTINCT street as zipcode
    FROM Locations
  `;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
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
  connection.query(query, function(err, rows, fields) {
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
  connection.query(query, function(err, rows, fields) {
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