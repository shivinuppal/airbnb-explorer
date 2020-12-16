import React from 'react';
import PageNavbar from './PageNavbar';
import BestGenreRow from './BestGenreRow';
import '../style/BestGenres.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenre extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedDecade: "",
			decades: [],
			genres: []
		};

		this.submitDecade = this.submitDecade.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	/* ---- Q3a (Best Genres) ---- */
	componentDidMount() {
		fetch("http://localhost:8081/decades", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(decadeList => {
		//console.log(decadeList);
        if (!decadeList) return;
        // Map each genreObj in genreList to an HTML element:
		// A button which triggers the showMovies function for each genre.
		//console.log(decadeList);
        let decadeDivs = decadeList.map((decade, i) =>
          <option key={i} value={decade.decade}>{decade.decade}</option>
        );

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        this.setState({
          decades: decadeDivs
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.
	}

	handleChange(e) {
		this.setState({
			selectedDecade: e.target.value
		});
	}

	/* ---- Q3b (Best Genres) ---- */
	submitDecade() {
		//console.log(this.state.selectedDecade);
		fetch("http://localhost:8081/decades/" + this.state.selectedDecade, {
			method: "GET"
		})
			.then(res => res.json())
			.then(bestGenresList => {
				//console.log(bestGenresList);  
				let bestGenresDiv = bestGenresList.map((genre, i) =>
        <BestGenreRow key={i} genre={genre.genre} rating={genre.rating} />
        );
          this.setState({
            genres: bestGenresDiv
          });
        })
        .catch(err => console.log(err))
	}

	render() {

		return (
			<div className="BestGenres">
				<PageNavbar active="bestgenres" />

				<div className="container bestgenres-container">
			      <div className="jumbotron">
			        <div className="h5">Best Genres</div>

			        <div className="years-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedDecade} onChange={this.handleChange} className="dropdown" id="decadesDropdown">
			            	<option select value> -- select an option -- </option>
			            	{this.state.decades}
			            </select>
			            <button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitDecade}>Submit</button>
			          </div>
			        </div>
			      </div>
			      <div className="jumbotron">
			        <div className="movies-container">
			          <div className="movie">
			            <div className="header"><strong>Genre</strong></div>
			            <div className="header"><strong>Average Rating</strong></div>
			          </div>
			          <div className="movies-container" id="results">
			            {this.state.genres}
			          </div>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}