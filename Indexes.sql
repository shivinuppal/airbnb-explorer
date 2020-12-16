CREATE INDEX CalendarIndex ON Calendar (listing_id);
CREATE INDEX CalendarDateIndex ON Calendar (calendar_date);
CREATE INDEX AmenityIndex ON Amenity (listing_id);
CREATE INDEX GuestsBedsIndex ON Amenity(accommodates, bedrooms);
CREATE INDEX MirriamIndex ON Amenity(bathrroms, bedrooms, beds);
CREATE INDEX MirriamIndex2 ON Listing_Policy (price);
CREATE INDEX PolicyIndex ON Listing_Policy (listing_id);
CREATE INDEX DescriptionsIndex ON Descriptions (listing_id);
CREATE INDEX Host2Index ON Host2 (id);
CREATE INDEX HostIndex ON Host (id);
CREATE INDEX ListingsIndex ON Listings (listing_id, host_id);
CREATE INDEX ListingsReviewIndex ON Listing_reviews (listing_id);
CREATE INDEX LocationIndex ON Location (listing_id);
CREATE INDEX ReviewsIndex ON Reviews (listing_id);
CREATE INDEX MLIndex ON MACHINE_LEARNING (listing_id);
CREATE INDEX URLIndex ON URL (listing_id);
CREATE INDEX ReviewIndex ON Listing_Reviews (number_of_reviews, review_scores_rating);
CREATE INDEX ZipcodeIndex ON Location (zipcode);

DROP INDEX CalendarIndex;
DROP INDEX CalendarDateIndex;
DROP INDEX MirriamIndex;
DROP INDEX MirriamIndex2;
DROP INDEX AmenityIndex;
DROP INDEX PolicyIndex;
DROP INDEX DescriptionsIndex;
DROP INDEX Host2Index;
DROP INDEX HostIndex;
DROP INDEX ListingsIndex;
DROP INDEX ListingsReviewIndex;
DROP INDEX LocationIndex;
DROP INDEX ReviewsIndex;
DROP INDEX MLIndex;
DROP INDEX URLIndex;
DROP INDEX ReviewIndex;
DROP INDEX GuestsBedsIndex;
