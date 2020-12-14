import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import IndividualListing from './IndividualListing';
import Zipcode from './Zipcode';
import Host from './Host';
import BestNearby from './BestNearby';

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
							path="/bestNearby"
							render={() => (
								<BestNearby />
							)}
						/>
				
						<Route
							exact
							path="/host/:hostId"
							component={Host} 
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
							path="/listing/:listingId"
							component={IndividualListing} 
							render={() => (
								<IndividualListing />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}