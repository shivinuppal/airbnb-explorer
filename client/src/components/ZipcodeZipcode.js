import React from 'react';
import PageNavbar from './PageNavbar';
import ZipcodeRow from './ZipcodeRow';

import '../style/Zipcode.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Zipcode extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			guests: 1,
			selectedZipcode: parseInt(this.props.match.params.zipcode),
			beds: 1,
			listings: [],
			noInfo: "",
			day: "21",
			month: "09"
		};

		this.submitZipcode = this.submitZipcode.bind(this);
		this.handleGuestsChange = this.handleGuestsChange.bind(this);
		this.handleBedsChange = this.handleBedsChange.bind(this);
		this.handleDayChange = this.handleDayChange.bind(this);
		this.handleZipcodeChange = this.handleZipcodeChange.bind(this);
		this.handleMonthChange = this.handleMonthChange.bind(this);

	}

	handleZipcodeChange(e) {
		this.setState({
			selectedZipcode: e.target.value
		});
	}

	handleGuestsChange(f) {
		this.setState({
			guests: f.target.value
		});
	}

	handleDayChange(f) {
		this.setState({
			day: f.target.value
		});
	}

	handleMonthChange(f) {
		this.setState({
			month: f.target.value
		});
	}

	handleBedsChange(e) {
		this.setState({
			beds: e.target.value
		});
	}




	submitZipcode() {
		console.log(typeof (this.state.selectedZipcode));
		fetch("http://localhost:8081/getZipcodesZipcodes?zipcode=" + this.state.selectedZipcode + "&guests=" + this.state.guests + "&beds=" + this.state.beds + "&month=" + this.state.month + "&day=" + this.state.day, {
			method: 'GET' 
		})
			.then(res => res.json()) 
			.then(zipcodeList => {
				let zipcodeDivs = [];
				let zipcodeInfo = "";
				if (zipcodeList.length != 0) {
					zipcodeDivs = zipcodeList.map((zipcode, i) =>
						<ZipcodeRow id={i} listing_id={zipcode[0]} guests={zipcode[1]}
							bedrooms={zipcode[3]} name={zipcode[4]} price={"$" + zipcode[7]} pic={zipcode[8]}
						/>

					);
				} else {
					zipcodeInfo = <div className="header" id="no-info">No matches found. Please expand search parameters.</div>
				}



				this.setState({
					listings: zipcodeDivs,
					noInfo: zipcodeInfo
				})

			})
			.catch(err => console.log(err))

	}

	render() {

		return (
			<div className="Zipcode">
				<PageNavbar active="zipcode" />

				<div className="container bestgenres-container">
					<div className="jumbotron">
						<div className="h2">To find Airbnbs in this Zipcode, {this.state.selectedZipcode}, enter the following search parameters</div>


						<div className="big-container">
							<div className="h5"> Guests </div>
							<div className="dropdown-container">
								<select value={this.state.guests} onChange={this.handleGuestsChange} className="dropdown" id="guestsDropdown">
									<option value={1}> 1 </option>
									<option value={2}> 2 </option>
									<option value={3}> 3 </option>
									<option value={4}> 4 </option>
									<option value={5}> 5 </option>
									<option value={6}> 6 </option>
									<option value={7}> 7 </option>
									<option value={8}> 8 </option>
									<option value={9}> 9 </option>
									<option value={10}> 10 </option>
									<option value={11}> 11 </option>
									<option value={12}> 12 </option>
									<option value={13}> 13 </option>
									<option value={14}> 14 </option>
									<option value={15}> 15 </option>
								</select>
							</div>
						</div>
						<div className="big-container">
							<div className="h5"> Day </div>

							<div className="dropdown-container">
								<select value={this.state.day} onChange={this.handleDayChange} className="dropdown" id="dayDropdown">

									<option value={"01"}> 1 </option>
									<option value={"02"}> 2 </option>
									<option value={"03"}> 3 </option>
									<option value={"04"}> 4 </option>
									<option value={"05"}> 5 </option>
									<option value={"06"}> 6 </option>
									<option value={"07"}> 7 </option>
									<option value={"08"}> 8 </option>
									<option value={"09"}> 9 </option>
									<option value={"10"}> 10 </option>
									<option value={"11"}> 11 </option>
									<option value={"12"}> 12 </option>
									<option value={"13"}> 13 </option>
									<option value={"14"}> 14 </option>
									<option value={"15"}> 15 </option>
									<option value={"16"}> 16 </option>
									<option value={"17"}> 17 </option>
									<option value={"18"}> 18 </option>
									<option value={"19"}> 19 </option>
									<option value={"20"}> 20 </option>
									<option value={"21"}> 21 </option>
									<option value={"22"}> 22 </option>
									<option value={"23"}> 23 </option>
									<option value={"24"}> 24 </option>
									<option value={"25"}> 25 </option>
									<option value={"26"}> 26 </option>
									<option value={"27"}> 27 </option>
									<option value={"28"}> 28 </option>
									<option value={"29"}> 29 </option>
									<option value={"30"}> 30 </option>
									<option value={"31"}> 31 </option>
								</select>
							</div>
						</div>
						<div className="big-container">
							<div className="h5"> Month </div>
							<div className="dropdown-container">
								<select value={this.state.month} onChange={this.handleMonthChange} className="dropdown" id="monthDropdown">

									<option value={"01"}> January </option>
									<option value={"02"}> February </option>
									<option value={"03"}> March </option>
									<option value={"04"}> April </option>
									<option value={"05"}> May </option>
									<option value={"06"}> June </option>
									<option value={"07"}> July </option>
									<option value={"08"}> August </option>
									<option value={"09"}> September </option>
									<option value={"10"}> October </option>
									<option value={"11"}> November </option>
									<option value={"12"}> December </option>
								</select>
							</div>
						</div>
						<div className="big-container">
							<div className="h5"> Year </div>
							<div className="dropdown-container">
								<select value={2016} className="dropdown" id="yearDropdown">

									<option value={2016}> 2016 </option>
								</select>
							</div>
						</div>
						<div className="big-container">
							<div className="h5"> Bedrooms </div>
							<div className="dropdown-container">
								<select value={this.state.beds} onChange={this.handleBedsChange} className="dropdown" id="bedsDropdown">

									<option value={1}> 1 </option>
									<option value={2}> 2 </option>
									<option value={3}> 3 </option>
									<option value={4}> 4 </option>
									<option value={5}> 5 </option>
									<option value={6}> 6 </option>
									<option value={7}> 7 </option>
									<option value={8}> 8 </option>
									<option value={9}> 9 </option>
									<option value={10}> 10 </option>
									<option value={11}> 11 </option>
									<option value={12}> 12 </option>
									<option value={13}> 13 </option>
									<option value={14}> 14 </option>
									<option value={15}> 15 </option>
								</select>
							</div>
						</div>
						<br />
						<div className="button-container">
							<button className="submit-btn" id="zipcodesSubmitBtn" onClick={this.submitZipcode}>Submit</button>
						</div>
						<br />
						{this.state.noInfo}
					</div>

				</div>

				<div className="listings-container center">
					{this.state.listings}
				</div>
			</div>
		);
	}
}
