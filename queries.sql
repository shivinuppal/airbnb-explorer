/*
* What is the average price and avg rating for top rated listings?
* Top rated listings are the top 10% of listings that
* more than 10 reviews
*/
WITH EnoughReviewsListings AS (
SELECT listing_id
FROM ListingReview
WHERE number_of_reviews > 10),
TopRated AS (
SELECT TOP(10) PERCENT listing_id
FROM EnoughReviewsListings
ORDER BY review_scores_rating)
SELECT AVG(p.price) AS avg_price, AVG(t.review_scores_rating) AS avg_rating
FROM TopRated t JOIN ListingPolicy p ON t.listing_id = p.listing_id;


/*
* What is the min, max & average price of a listing with X bedrooms and Y bathrooms?
* The user will input X and Y
****** UPDATE QUERY TO TAKE USER INPUT ******
*/
SELECT AVG(p.price) AS avg_price, MIN(p.price) AS min_price, MAX(p.price) AS max_price
FROM ListingPolicy p JOIN Amenity a ON p.listing_id = a.listing_id
WHERE a.bedrooms = X AND a.bathrooms = Y;

/*
* What are the top 10 listings (in terms of value for money) within an X mile
* radius of (la, lo)
* VFM = Rating / Price
****** UPDATE QUERY TO TAKE USER INPUT ******
*/
WITH CloseByListings AS (
SELECT listing_id
FROM Location
WHERE SQRT((la - latitude) * (la - latitude) * 4761 + (lo - longitude) * (lo - longitude) * 2981.16) < X),
VFM AS (
SELECT p.listing_id, p.price / r.review_scores_rating AS vfm
FROM ListingPolicy p JOIN ListingReview r ON p.listing_id = r.listing_id)
SELECT listing_id
FROM CloseByListings c JOIN VFM v ON c.listing_id = v.listing_id
ORDER BY v.vfm
LIMIT 10;

/*
* Get the price, summary for all listings hosted by the host of a given listing X
*/
WITH HostsListing AS (SELECT listing_id
FROM Listing
WHERE host_id = (SELECT host_id FROM Listing WHERE listing_id = X))
SELECT p.price, d.summary
FROM ListingPolicy p JOIN Descriptions d ON p.listing_id = d.listing_id
WHERE listing_id IN (SELECT * FROM HostsListing);


/*
* What are the listings that are available for all days in a given period of
* dates X - Y
*/
SELECT *
FROM Calendar
WHERE calendar_date >= X AND calendar_date <= Y
GROUP BY listing_id
HAVING SUM(available::INT) = (Y - X)::INT;
