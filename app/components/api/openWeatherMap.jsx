var axios = require('axios');

const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?&appid=0eb7e7d510c63c23495642f2df1f7fc0&units=imperial';

//api key : 0eb7e7d510c63c23495642f2df1f7fc0
module.exports = {
	getTemp: function (location) {

		//Encode the location parameter we are getting, in order to add it on our new url

		var encodedLocation = encodeURIComponent(location);

		//We instaciate the url http request is going to, based on the openweathermap api documentation and examples
		//Our url now only need two parameters, the appid and the &q which stands for the location we want to search.

		var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;

		//Now we are making the call to openweathermaps api using the promise pattern
		//The first function is for success and the second for failure

		return axios.get(requestUrl).then(function (res) {
			if (res.data.cod && res.data.message) {
				throw new Error(res.data.message);
			} else {
				return res.data.main.temp;
			}
		}, function (err) {
			throw new Error('Unable to fetch weather for that location.');
		});
	}
}

/*
  Using the api key we got from openweathermap and the axios plug-in, which will help us make
  the http requests we want.
  Inside the module exports  
  */