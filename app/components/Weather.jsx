var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');
var ErrorModal = require('ErrorModal');

var Weather = React.createClass({
	getInitialState: function () {
		return {
			isLoading: false		}
	},

	//This function will handle our call to the api onSubmit

	handleSearch: function (location) {

		//Because the scope inside the promises changes, we need to store 'this' in another var in order to use it 
		//properly.
		var that = this;

		//Set isLoading to true in order to stop printing the loading message.

		this.setState({
			isLoading: true,
			errorMessage: undefined,
			location: undefined,
			temp: undefined
		});

		//Here is the promise call from the openWeatherMap component's function 'getTemp'

	    openWeatherMap.getTemp(location).then(function (temp) {
	      that.setState({
	        location: location,
	        temp: temp,
	        isLoading: false
	      });
	    }, function (e) {
	      that.setState({
	        isLoading: false,
	        errorMessage: e.message
	      });
	    });
		console.log(errorMessage);
	},
	componentDidMount: function () {
		var location = this.props.location.query.location;
		if (location && location.length > 0) {
			this.handleSearch(location);
			window.location.hash = ('#/');
		}
	},
	componentWillReceiveProps: function (newProps) {
		var location = newProps.location.query.location;
		if (location && location.length > 0) {
			this.handleSearch(location);
			window.location.hash = ('#/');
		}
	},
	render: function () {
		//Update our var according to the state
		var {isLoading, temp, location, errorMessage} = this.state;

		/*
		  Instead of just rendering the WeatherMessage Component, we need to check if isLoading is true.
		  If it is not and if temp and location are valid, only then we render the WeatherMessage component.
		  Also inside the return method, instead of rendering the component itself, we are calling
		  the renderMessage function, which is responsible for the check we mentioned above. 
		 */

		function renderMessage () {
			if (isLoading) {
				return <h3 className="text-center">Fetching weather...</h3>;

			} else if (temp && location) {
				return <WeatherMessage location={location} temp={temp} />;

			}
		}

		function renderError () {
			if (typeof errorMessage === 'string') {
				return (
					<ErrorModal message={errorMessage}/>
					);
			}
		}

		return (
			<div>
				<h1 className="text-center page-title">Get Weather</h1>
				<WeatherForm onSearch={this.handleSearch} />
				{renderMessage()}
				{renderError()}
			</div>
		);
	}
});

module.exports = Weather;