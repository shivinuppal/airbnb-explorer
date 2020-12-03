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

// The exported functions, which can be accessed in index.js.
module.exports = {
  getHostInfo: getHostInfo,
  getAmenityInfo: getAmenityInfo
}