CREATE TABLE HostA (id INTEGER, host_url VARCHAR(4000), host_since DATE, host_about VARCHAR(4000), host_response_time TINYINT, host_response_rate TINYINT, host_acceptance_rate TINYINT, host_is_superhost BOOLEAN, host_neighborhood VARCHAR(4000), host_total_listings_count INTEGER, host_has_profile_pic BOOLEAN, host_identity_verified BOOLEAN, PRIMARY KEY (id));

CREATE TABLE Listing (listing_id integer, host_id integer, PRIMARY KEY (listing_id), FOREIGN KEY (host_id) REFERENCES Host (id));

CREATE TABLE Locations (listing_id INTEGER, street VARCHAR(5000), neighborhood_cleansed VARCHAR(5000), neighborhood_group_cleansed VARCHAR(5000), zipcode TINYINT, latitutde FLOAT(32), longitude FLOAT(32), is_location_exact BOOLEAN, PRIMARY KEY (listing_id), FOREIGN KEY (listing_id) REFERENCES Listing (listing_id));

CREATE TABLE Descriptions (listing_id INTEGER, name VARCHAR(1000), summary VARCHAR(2000), space VARCHAR(1000), description VARCHAR(2000), neighborhood_overview VARCHAR(2000), notes VARCHAR(1000), transit VARCHAR(1000), PRIMARY KEY (listing_id), FOREIGN KEY (listing_id) REFERENCES Listing (listing_id));

CREATE TABLE Url (listing_id INTEGER, listing_url VARCHAR(50), thumbnail_url VARCHAR(1000), medium_url VARCHAR(1000), picture_url VARCHAR(1000), xl_picture_url VARCHAR(1000), PRIMARY KEY (listing_id), FOREIGN KEY (listing_id) REFERENCES Listing (listing_id));

CREATE TABLE Amenity (listing_id INTEGER, property_type VARCHAR(1000), room_type VARCHAR(1000), accommodates TINYINT, bathrooms FLOAT(8), bedrooms TINYINT, beds TINYINT, bed_type VARCHAR(1000), amenities VARCHAR(2000), square_feet FLOAT(8), guests_included TINYINT, PRIMARY KEY (listing_id), FOREIGN KEY (listing_id) REFERENCES Listing (listing_id));

CREATE TABLE ListingPolicy (listing_id INTEGER, cancellation_policy VARCHAR(25), price FLOAT(8), weekly_price FLOAT(8), monthly_price FLOAT(8), security_deposit FLOAT(8), cleaning_fee FLOAT(8), minimum_nights INTEGER, maximum_nights INTEGER, extra_people FLOAT(8), PRIMARY KEY (listing_id), FOREIGN KEY (listing_id) REFERENCES Listing (listing_id));

CREATE TABLE ListingReview (listing_id INTEGER, number_of_reviews INTEGER, review_scores_rating FLOAT(32), review_scores_accuracy FLOAT(16), review_scores_cleanliness FLOAT(16), review_scores_checkin FLOAT(16), review_scores_communication FLOAT(16), review_scores_location FLOAT(16), review_scores_value FLOAT(16), reviews_per_month FLOAT(16), PRIMARY KEY (listing_id), FOREIGN KEY (listing_id) REFERENCES Listing (listing_id));

CREATE TABLE Calendar (listing_id INTEGER, calendar_date DATE, available BOOLEAN, price FLOAT(8), PRIMARY KEY (listing_id, calendar_date), FOREIGN KEY (listing_id) REFERENCES Listing (listing_id));

CREATE TABLE Reviews(listing_id INTEGER, id INTEGER, review_date DATE, comments VARCHAR(5000), PRIMARY KEY (listing_id, id), FOREIGN KEY (listing_id) REFERENCES Listing (listing_id));

Create Table ML(listing_id INTEGER, Topic1 FLOAT(8), Topic2 FLOAT(8), TOpic3 FLOAT(8),
Topic4 FLOAT(8), Topic5 FLOAT(8), TOpic6 FLOAT(8), Topic7 FLOAT(8), Topic8 FLOAT(8), TOpic9 FLOAT(8), Topic10 FLOAT(8),
Topic11 FLOAT(8), Topic12 FLOAT(8), TOpic13 FLOAT(8),
Topic14 FLOAT(8), Topic15 FLOAT(8), TOpic16 FLOAT(8), Topic17 FLOAT(8), Topic18 FLOAT(8), TOpic19 FLOAT(8), Topic20 FLOAT(8),
PRIMARY KEY listing_id, FOREIGN KEY (listing_id) REFERENCES Listing (listing_id));