import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Recommendations from './Recommendations';
import BestGenres from './BestGenres';
import IndividualListing from './IndividualListing';
import Zipcode from './Zipcode';
import Host from './Host';

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							exact
							path="/dashboard"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							exact
							path="/host"
							render={() => (
								<Host />
							)}
						/>
						<Route
							exact
							path="/zipcode"
							render={() => (
								<Zipcode />
							)}
						/>
						<Route
							path="/recommendations"
							render={() => (
								<Recommendations />
							)}
						/>
						<Route
							path="/listing"
							render={() => (
								<IndividualListing />
							)}
						/>
						<Route
							path="/bestgenres"
							render={() => (
								<BestGenres />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}