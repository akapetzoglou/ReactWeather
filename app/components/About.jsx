var React = require('react');

var About = (props) => {
	return (
		<div>
			<h1 className="text-center page-title">About</h1>
			<p>This is weather application build on React. yata yata yata!</p>
			<p>
				Here are some of the tools used:
			</p>
			<ul>
				<li>
					<a href="https://facebook.github.io/react">React</a> - This was the Javascript Framework used.
				</li>
				<li>
					<a href="http://openweathermap.org">Open Weather Map</a> - This is the api used to fetch the weather.
				</li>
			</ul>
		</div>
	);
};

module.exports = About;