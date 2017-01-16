var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');

var Weather = React.createClass({
	getInitialState: function () {
		return {
			isLoading: false
		}
	},

	//This function will handle our call to the api onSubmit

	handleSearch: function (location) {

		//Because the scope inside the promises changes, we need to store 'this' in another var in order to use it 
		//properly.
		var that = this;

		//Set isLoading to true in order to stop printing the loading message.

		this.setState({isLoading: true});

		//Here is the promise call from the openWeatherMap component's function 'getTemp'

		openWeatherMap.getTemp(location).then(function (temp) {
			//Handle Success result
			that.setState({
				location: location,
				temp: temp,
				isLoading: false
			});
		}, //Handle Error result
		function (errorMessage) {
			alert(errorMessage);
			that.setState({
				isLoading: false
			});
		});
	},

	render: function () {
		//Update our var according to the state
		var {isLoading, temp, location} = this.state;

		/*
		  Instead of just rendering the WeatherMessage Component, we need to check if isLoading is true.
		  If it is not and if temp and location are valid, only then we render the WeatherMessage component.
		  Also inside the return method, instead of rendering the component itself, we are calling
		  the renderMessage function, which is responsible for the check we mentioned above. 
		 */

		function renderMessage () {
			if (isLoading) {
				return <h1 className="text-center">Fetching weather...</h1>;

			} else if (temp && location) {
				return <WeatherMessage location={location} temp={temp} />;

			}
		}

		return (
			<div>
			<h1 className="text-center">Get Weather</h1>
			<WeatherForm onSearch={this.handleSearch} />
			{renderMessage()}
			</div>
		);
	}
});

module.exports = Weather;