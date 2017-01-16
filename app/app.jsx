var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var Weather = require('Weather');
var About = require('About');
var Examples =require('Examples');

// App css
require('style!css!sass!applicationStyles')

// Load Foundation
require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

ReactDOM.render(

	/*The history attribute is responsible for telling React we want to use "#" followed by the specified path
	in order to maintain our routes history */

	<Router history={hashHistory}>

		{/*Here we specify our Main route. We define that every link which is included in our Main route is starts
		with a '/'. It also renders the 'Main' component. */}

		<Route path="/" component={Main}>

			{/*The IndexRoute is our Index. Every other Route has two attributes. The path attribute which specifies the url
			that will follow the '/' and the component attribute which will define which component to render on that url. */} 

			<Route path="about" component={About}/>
			<Route path="examples" component={Examples}/>
			<IndexRoute component={Weather} />
		</Route>
	</Router>,
  document.getElementById('app')
);
