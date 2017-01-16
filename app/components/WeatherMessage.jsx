var React = require('react');

var WeatherMessage = ({temp, location}) => {
	return (
		<h1 className="text-center">It's {temp} in {location} </h1>
	);
}

module.exports = WeatherMessage;

//Use ES6 destructuring inside the parameter instead of props