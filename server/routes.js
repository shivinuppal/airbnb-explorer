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
  //
   //
  var query = `
    SELECT DISTINCT id, host_about, host_response_time, host_response_rate, host_acceptance_rate, host_is_superjost AS host_is_superhost, host_neighborhood,
    host_total_listings_count, host_identity_verified, host_name
    FROM Host2
    WHERE id IN (SELECT host_id FROM Listings WHERE listing_id = ${listingId})
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
  console.log('review');
  var listingId = req.params.listingId;
  var query = `
    SELECT l.number_of_reviews, r.comments
    FROM Listing_ReviewS l JOIN Reviews r ON l.listing_id = r.listing_id
    WHERE l.listing_id = ${listingId} AND ROWNUM <= 5
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
  console.log('description');
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
  guests = req.query.guests;
  console.log(guests);
  beds = req.query.beds;
  console.log(beds);
  month = req.query.month;
  day = req.query.day;
  currLat = req.query.latitude;
  currLong = req.query.longitude;
  console.log("("+currLat+", "+currLong+")");
  var miles = req.query.radius;
  console.log(miles);
  var date = "2016-"+month+"-"+day;
  console.log(date);
  // I have defaulted current location to the Space Needle
  var query = `
      WITH Available AS (
          SELECT listing_id, price
          FROM Calendar
          WHERE calendar_date = '${date}'
      ), Distance AS (
          SELECT listing_id, ACOS(SIN(3.14159265358979*${currLat}/180.0)*SIN(3.14159265358979*latitude/180.0)+COS(3.14159265358979*${currLat}/180.0)*COS(3.14159265358979*latitude/180.0)*COS(3.14159265358979*longitude/180.0-3.14159265358979*${currLong}/180.0))*6371 AS dist
          FROM Location
      ), WithinDistance AS (
          SELECT listing_id, dist
          FROM Distance
          WHERE dist < ${miles}
      ), AmenityFiltered AS (
          SELECT w.listing_id, a.accommodates AS guests, w.dist AS dist, a.bedrooms
          FROM WithinDistance w JOIN Amenity a ON w.listing_id = a.listing_id
          WHERE a.accommodates >= ${guests} AND a.accommodates <= ${guests} + 1 AND a.bedrooms >= ${beds} AND a.bedrooms <= ${beds} + 1
      ), FilteredAndAvailable AS (
          SELECT a.listing_id, a.price, f.guests, f.dist, f.bedrooms
          FROM Available a JOIN AmenityFiltered f ON a.listing_id = f.listing_id
      ), Temp AS (
      SELECT a.listing_id, a.guests, ROUND(a.dist, 2) AS dist, a.bedrooms, d.name, d.summary, d.description, a.price, u.picture_url
      FROM Descriptions d JOIN FilteredAndAvailable a ON d.listing_id = a.listing_id JOIN Url u ON d.listing_id = u.listing_id
      ORDER BY a.guests, a.bedrooms, a.dist)
      SELECT * FROM Temp WHERE ROWNUM <= 75
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

function getDiscover(req, res) {
  console.log("hi you've entered getDiscover");
  currLat = req.query.latitude;
  currLong = req.query.longitude;
  console.log("("+currLat+", "+currLong+")");

  var query = `
      WITH CloseBy AS (
          SELECT listing_id, ACOS(SIN(3.14159265358979*${currLat}/180.0)*SIN(3.14159265358979*latitude/180.0)+COS(3.14159265358979*${currLat}/180.0)*COS(3.14159265358979*latitude/180.0)*COS(3.14159265358979*longitude/180.0-3.14159265358979*${currLong}/180.0))*6371 AS dist
          FROM Location
          WHERE ACOS(SIN(3.14159265358979*${currLat}/180.0)*SIN(3.14159265358979*latitude/180.0)+COS(3.14159265358979*${currLat}/180.0)*COS(3.14159265358979*latitude/180.0)*COS(3.14159265358979*longitude/180.0-3.14159265358979*${currLong}/180.0))*6371 < 4
      ), Ratings AS (
          SELECT listing_id, c.dist, r.review_scores_rating AS rating
          FROM CloseBy c NATURAL JOIN Listing_Reviews r
          WHERE r.number_of_reviews > 3 AND r.review_scores_rating > 96
      ), PricePerPerson AS (
          SELECT listing_id, (p.price/a.accommodates) AS price_per_person, a.accommodates AS guests, p.price AS price, a.bedrooms
          FROM Amenity a NATURAL JOIN Listing_Policy p
      ), VFM AS (
          SELECT listing_id, r.rating / (SQRT(p.price_per_person) * (1+r.dist)) AS value_for_money, r.rating, p.guests, p.price, r.dist, p.bedrooms
          FROM Ratings r NATURAL JOIN PricePerPerson p
          ORDER BY r.rating / (SQRT(p.price_per_person) * (1+r.dist)) DESC
      ), Chosen AS (
          SELECT listing_id, guests, dist, bedrooms, price, value_for_money
          FROM VFM
          WHERE ROWNUM <= 21
      )
      SELECT listing_id, c.guests, ROUND(c.dist, 2), c.bedrooms, d.name, d.summary, d.description, c.price, u.picture_url
      FROM Chosen c NATURAL JOIN Descriptions d NATURAL JOIN Url u
      ORDER BY c.value_for_money DESC
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

function getML(req, res) {
  console.log("hi you've entered ML");
  currListing = req.query.listingId;
  console.log(currListing);



  var query = `
  With first as (
    Select topic1 as top1, topic2 as top2,topic3 as top3, topic4 as top4,topic5 as top5, topic6 as top6,topic7 as top7, topic8 as top8,topic9 as top9, topic10 as top10,
    topic11 as top11, topic12 as top12,topic13 as top13, topic14 as top14,topic15 as top15, topic16 as top16,topic17 as top17, topic18 as top18,topic19 as top19, topic20 as top20

    from Machine_learning where listing_id = ${currListing}
    ),

    topicD as (
    Select listing_id, abs(TOPIC1 - (Select top1 from first))+abs(Topic2 - (Select top2 from first))+
    abs(TOPIC3 - (Select top3 from first))+abs(Topic7 - (Select top7 from first))+
    abs(TOPIC4 - (Select top4 from first))+abs(Topic8 - (Select top8 from first))+
    abs(TOPIC5 - (Select top5 from first))+abs(Topic9 - (Select top9 from first))+
    abs(TOPIC6 - (Select top6 from first))+abs(Topic10 - (Select top10 from first))+
    abs(TOPIC11 - (Select top11 from first))+abs(Topic12 - (Select top12 from first))+
    abs(TOPIC13 - (Select top13 from first))+abs(Topic17 - (Select top17 from first))+
    abs(TOPIC14 - (Select top14 from first))+abs(Topic18 - (Select top18 from first))+
    abs(TOPIC15 - (Select top15 from first))+abs(Topic19 - (Select top19 from first))+
    abs(TOPIC16 - (Select top16 from first))+abs(Topic20 - (Select top20 from first))


    as dist from Machine_learning

    where listing_id != ${currListing}
    ), second as(
    Select t.listing_id, name, summary, description from TopicD t join Descriptions d on d.listing_id = t.listing_id
     where summary is not null order by dist)
    Select s.listing_id, s.name, s.summary, s.description, u.picture_url from second s JOIN Url u ON s.listing_id = u.listing_id where rownum <= 9
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






function getHostListings(req, res) {
  hostId = req.params.hostId;

  var query = `
  WITH HostsListing AS (SELECT listing_id
    FROM Listings
    WHERE host_id = ${hostId}),
    HostInfo AS (SELECT id, host_about, host_response_time, host_response_rate, host_acceptance_rate, host_is_superjost AS host_is_superhost, host_neighborhood,
    host_total_listings_count, host_identity_verified, host_name, host_picture_url
    FROM Host2
    WHERE id = ${hostId}),
    AllListings AS (
      SELECT p.listing_id as listing_id, p.price as price, d.name as name, u.picture_url
      FROM listing_policy p JOIN Descriptions d ON p.listing_id = d.listing_id JOIN Url u on p.listing_id = u.listing_id
    WHERE p.listing_id IN (SELECT * FROM HostsListing)
    )
    SELECT DISTINCT a.listing_id, a.price, a.name, a.picture_url, h.id, h.host_about, h.host_response_time, h.host_response_rate, h.host_acceptance_rate, h.host_is_superhost, h.host_neighborhood,
    h.host_total_listings_count, h.host_identity_verified, h.host_name, h.host_picture_url
    FROM HostInfo h, allListings a
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

//average price of listings per zipcode
function getAvgPricePerZipcode(req, res) {

  var query = `
  SELECT l.zipcode AS zipcode, ROUND(AVG(p.price), 0) AS Average_Price
  FROM Location l JOIN Listing_policy p
  ON l.listing_id = p.listing_id
  WHERE l.zipcode IS NOT NULL
  GROUP BY l.zipcode
  HAVING COUNT(*) >= 10
  ORDER BY AVG(p.price) DESC
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

//annual revenue per listing in order of square feet
function getAnnualRevenues(req, res) {

  var query = `
  WITH Revenues AS(
    SELECT l.listing_id AS listing, SUM(c.price) AS annual_revenue
    FROM listing_policy l JOIN Calendar c
    ON l.listing_id = c.listing_id
    WHERE c.calendar_date LIKE '2016%'
    GROUP BY l.listing_id
    ), Temp AS (
    SELECT DISTINCT r.listing AS listing, r.annual_revenue / a.square_feet AS annual_revenue_per_square_foot, d.name
    FROM Revenues r JOIN Amenity a
    ON r.listing = a.listing_id JOIN Descriptions d ON a.listing_id = d.listing_id
    WHERE a.square_feet IS NOT NULL AND a.square_feet > 5
    ORDER BY r.annual_revenue / a.square_feet DESC)
    SELECT listing, ROUND(annual_revenue_per_square_foot, 2) as annual_revenue_per_square_foot, name
    FROM Temp
    WHERE ROWNUM <=15
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

//find apartment Airbnbs
function getApartments(req, res) {

  var query = `
    WITH Apartments AS (
      SELECT a.listing_id, a.accommodates AS accommodates, a.bathrroms AS bathrooms,
      a.bedrooms AS bedrooms, a.beds AS beds
      FROM amenity a
      WHERE a.property_type LIKE 'Apartment%'
      ),
      Cal AS (
      SELECT a.listing_id, a.accommodates AS people, a.bathrooms AS bathrooms,
      a.bedrooms AS bedrooms, a.beds AS beds
      FROM Apartments a JOIN Calendar c
      ON a.listing_id = c.listing_id
      WHERE c.calendar_date LIKE '2016%'
      ), Temp AS (
      SELECT DISTINCT c.listing_id AS listing, l.extra_people AS guests, l.price AS Price,
      l.minimum_nights AS max_nights, l.minimum_nights AS min_nights, d.name
      FROM Cal c JOIN listing_policy l
      ON c.listing_id = l.listing_id JOIN Descriptions d ON l.listing_id = d.listing_id
      WHERE l.extra_people >= c.people AND l.extra_people >= 50
      ORDER BY l.extra_people DESC)
      SELECT * FROM Temp WHERE ROWNUM <=15
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

//find AVG, MIN, MAX prices of listings with AVG bathrooms, bedrooms, beds
function getMaxListings(req, res) {

  var query = `
  WITH Max AS (
    SELECT ROUND(AVG(a.bathrroms),0) AS bathrooms,
    ROUND(AVG(a.bedrooms),0) AS bedrooms, ROUND(AVG(a.beds),0) AS beds
    FROM amenity a
    ),
    MaxListings AS(
    SELECT a.listing_id, a.bathrroms AS bathrooms, a.bedrooms AS bedrooms,
    a.beds AS beds
    FROM amenity a JOIN Max m
    ON (a.bathrroms >= m.bathrooms - 1) AND (a.bedrooms >= m.bedrooms - 1) AND
    (a.beds >= m.beds -1) AND (a.bathrroms <= m.bathrooms + 1) AND
    (a.bedrooms <= m.bedrooms + 1) AND (a.beds <= m.beds + 1)
    ),
    Prices AS (
    SELECT ROUND(AVG(l.Price), 0) AS
    average_price, MAX(l.Price) AS max_price, MIN(l.Price) AS
    min_price
    FROM listing_policy l
    ),
    AvgListings AS (
    SELECT l.listing_id, l.price AS price
    FROM listing_policy l JOIN Prices p
    ON l.price >= (p.average_price - 100) AND l.price <= (p.average_price + 100)
    ), Temp AS (
    SELECT DISTINCT p.listing_id AS listing, a.price AS price, p.bathrooms AS bathrooms,
    p.bedrooms AS bedrooms, p.beds AS beds, d.name
    FROM AvgListings a JOIN MaxListings p
    ON a.listing_id = p.listing_id JOIN Descriptions d ON p.listing_id = d.listing_id
    WHERE a.price >= 200
    ORDER BY a.price DESC)
    SELECT * FROM Temp WHERE ROWNUM <= 15
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

//get best hosts
function getBestHosts(req, res) {

  var query = `
  WITH bestHosts AS(
    SELECT h.id AS host, h.host_total_listings_count AS num, h.host_name as name
    FROM Host2 h
    WHERE h.host_total_listings_count > 4 AND h.host_is_superjost = 'True'
    ),
    Listing AS(
    SELECT h.host, l.listing_id, h.num AS num_listings, h.name
    FROM bestHosts h JOIN Listings l
    ON h.host = l.host_id
    ), Temp AS (
    SELECT l.host, l.num_listings, ROUND(AVG(p.price),0) AS mean_price, l.name
    FROM Listing_policy p JOIN Listing l
    ON p.listing_id = l.listing_id
    GROUP BY l.host, l.name, l.num_listings
    ORDER BY ROUND(AVG(p.price),0) DESC, l.num_listings DESC)
    SELECT * FROM Temp WHERE ROWNUM <=15
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
  getDiscover: getDiscover,
  hosts: hosts,
  getHostListings: getHostListings,
  getML: getML,
  getAvgPricePerZipcode: getAvgPricePerZipcode,
  getAnnualRevenues: getAnnualRevenues,
  getApartments: getApartments,
  getMaxListings: getMaxListings,
  getBestHosts: getBestHosts
}
