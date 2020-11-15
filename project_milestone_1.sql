CREATE TABLE Host (id INTEGER, host_url VARCHAR(50), host_since DATE, host_about VARCHAR(MAX), host_response_time TINYINT, host_response_rate TINYINT, host_acceptance_rate TINYINT, host_is_superhost BOOLEAN, host_neighborhood VARCHAR(max), host_total_listings_count INTEGER, host_has_profile_pic BOOLEAN, host_identity_verified BOOLEAN, PRIMARY KEY (id));

CREATE TABLE Listing (listing_id integer, host_id integer, PRIMARY KEY (listing_id), FOREIGN KEY (host_id) REFERENCES Host (id));

CREATE TABLE Locations (listing_id INTEGER, street VARCHAR(MAX), neighborhood_cleansed VARCHAR(max), neighborhood_group_cleansed VARCHAR(max), zipcode TINYINT, latitutde FLOAT(32), longitude FLOAT(32), is_location_exact BOOLEAN, PRIMARY KEY (listing_id), FOREIGN KEY (listing_id) REFERENCES Listing (id));

CREATE TABLE Descriptions (listing_id INTEGER, name VARCHAR(MAX), summary VARCHAR(MAX), space VARCHAR(MAX), description VARCHAR(MAX), neighborhood_overview VARCHAR(MAX), notes VARCHAR(MAX), transit VARCHAR(MAX), PRIMARY KEY (listing_id), FOREIGN KEY (listing_id) REFERENCES Listing (id));

CREATE TABLE Url (listing_id INTEGER, listing_url VARCHAR(50), thumbnail_url VARCHAR(MAX), medium_url VARCHAR(MAX), picture_url VARCHAR(MAX), xl_picture_url VARCHAR(MAX), PRIMARY KEY (listing_id), FOREIGN KEY (listing_id) REFERENCES Listing (id));

CREATE TABLE Amenity (listing_id INTEGER, property_type VARCHAR(MAX), room_type VARCHAR(MAX), accommodates TINYINT, bathrooms FLOAT(8), bedrooms TINYINT, beds TINYINT, bed_type VARCHAR(MAX), amenities VARCHAR(MAX), square_feet FLOAT(128), guests_included TINYINT, PRIMARY KEY (listing_id), FOREIGN KEY (listing_id) REFERENCES Listing (id));

CREATE TABLE ListingPolicy (listing_id INTEGER, cancellation_policy VARCHAR(25), price FLOAT(64), weekly_price FLOAT(64), monthly_price FLOAT(128), security_deposit FLOAT(64), cleaning_fee FLOAT(64), minimum_nights INTEGER, maximum_nights INTEGER, extra_people FLOAT(64), PRIMARY KEY (listing_id), FOREIGN KEY (listing_id) REFERENCES Listing (id));

CREATE TABLE ListingReview (listing_id INTEGER, number_of_reviews INTEGER, review_scores_rating FLOAT(32), review_scores_accuracy FLOAT(16), review_scores_cleanliness FLOAT(16), review_scores_checkin FLOAT(16), review_scores_communication FLOAT(16), review_scores_location FLOAT(16), review_scores_value FLOAT(16), reviews_per_month FLOAT(16), PRIMARY KEY (listing_id), FOREIGN KEY (listing_id) REFERENCES Listing (id));

CREATE TABLE Calendar (listing_id INTEGER, calendar_date DATE, available BOOLEAN, price FLOAT(64), PRIMARY KEY (listing_id, calendar_date), FOREIGN KEY (listing_id) REFERENCES Listing (id));

CREATE TABLE Reviews(listing_id INTEGER, id INTEGER, review_date DATE, comments VARCHAR(MAX), PRIMARY KEY (id), FOREIGN KEY (listing_id, id) REFERENCES Listing (id));
