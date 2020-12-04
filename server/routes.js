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

function getZipcode(req, res) {
  zipcode = req.params.zipcode;
  
  var query = `
    Select listing_id, street as zipcode from Locations where street = "${zipcode}"
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
  zipcode = req.params.zipcode;
  
  var query = `
  WITH HostsListing AS (SELECT listing_id
    FROM Listing
    WHERE host_id = ${zipcode})
    SELECT p.price as listing_id, d.summary as zipcode
    FROM listing_policy p JOIN Descriptions d ON p.listing_id = d.listing_id
    WHERE listing_id IN (SELECT * FROM HostsListing);
    
  `;
  console.log(query);
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
    SELECT DISTINCT id as zipcode
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
  getZipcode: getZipcode,
  zipcodes: zipcodes,
  hosts: hosts,
  getHostListings: getHostListings
}