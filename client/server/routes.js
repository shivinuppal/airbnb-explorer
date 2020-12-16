var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Q1a (Dashboard) ---- */
function getAllGenres(req, res) {
  var query = `
    SELECT DISTINCT genre
    FROM Genres;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


/* ---- Q1b (Dashboard) ---- */
function getTopInGenre(req, res) {
  var genre = req.params.genre; 
  var query = `
    SELECT m.title, m.rating, m.vote_count
    FROM Movies m JOIN Genres g ON m.id = g.movie_id
    WHERE g.genre = '${genre}'
    ORDER BY m.rating DESC, m.vote_count DESC LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });

};

/* ---- Q2 (Recommendations) ---- */
function getRecs(req, res) {
  var movie = req.params.movieName; 
  var query = `
    WITH movie_genre AS (
      SELECT g.movie_id, g.genre
      FROM Movies m JOIN Genres g ON m.id = g.movie_id
      WHERE m.title = '${movie}'
    ), 
    movie_totals AS (
      SELECT g.movie_id
      FROM movie_genre m JOIN Genres g ON g.genre = m.genre
      GROUP BY g.movie_id
      HAVING COUNT(g.movie_id) = (SELECT COUNT(*) FROM movie_genre)
    ) 
    SELECT m.title, m.id, m.rating, m.vote_count
    FROM Movies m JOIN movie_totals t ON m.id = t.movie_id
    WHERE m.title != '${movie}'
    ORDER BY m.rating DESC, m.vote_count DESC LIMIT 5;
    
  `;
  //console.log()
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- (Best Genres) ---- */
function getDecades(req, res) {
	var query = `
    SELECT DISTINCT (FLOOR(year/10)*10) AS decade
    FROM (
      SELECT DISTINCT release_year as year
      FROM Movies
      ORDER BY release_year
    ) y
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- Q3 (Best Genres) ---- */
function bestGenresPerDecade(req, res) {
  var decade = req.params.selectedDecade; 
  //console.log(decade);
  var query = `
    WITH movies_decade AS (
      SELECT id, rating
      FROM Movies
      WHERE release_year >= '${decade}' AND release_year <= '${decade}' + 9
    ), 
    genre_avg AS (
    SELECT g.genre, AVG(m.rating) AS rating
    FROM movies_decade m JOIN Genres g ON m.id = g.movie_id
    GROUP BY g.genre
    )
    SELECT DISTINCT g.genre, IFNULL(a.rating,0) AS rating
    FROM Genres g LEFT JOIN genre_avg a ON g.genre = a.genre
    ORDER BY rating DESC, g.genre ASC;
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
	getAllGenres: getAllGenres,
	getTopInGenre: getTopInGenre,
	getRecs: getRecs,
	getDecades: getDecades,
  bestGenresPerDecade: bestGenresPerDecade
}