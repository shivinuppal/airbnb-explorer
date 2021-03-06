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
import MapComponent from './MapComponent';
import Discover from './Discover';
import Analytics from './Analytics';
import ZipcodeZipcode from './ZipcodeZipcode'

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
								<Zipcode />
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
							path="/map"
							render={() => (
								<MapComponent />
							)}
						/>
						<Route
							exact
							path="/search"
							render={() => (
								<Zipcode />
							)}
						/>
						<Route
							exact
							path="/discover"
							render={() => (
								<Discover />
							)}
						/>
						<Route
							exact
							path="/analytics"
							render={() => (
								<Analytics />
							)}
						/>
						<Route
							exact
							path="/zipcodes/:zipcode"
							component={ZipcodeZipcode}
							render={() => (
								<ZipcodeZipcode />
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
