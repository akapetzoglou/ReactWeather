#Comments inside a JSX
    {/* */}

#Components of the WeatherApp
    The ReactWeatherApp will contain 3 different components.
     Three Presentational Components
      A navbar component -> Which will be our navigation bar (Nav)
      A message component -> Which will be the message displayed for the weather (WeatherMessage) 
      A form component -> Which will be the input field and the button we are going to use inside the form (WeatherForm)

    Two Container Components
     The Main component -> Which will contain all our components
     The page component -> Which will include everything else in the page below the navigation bar (Weather).
#Adding React-Router plugin
    npm install react-router@2.0.0 --save
#Make the first route
    In the app.jsx we have to import the react-router plug-in. The way to do that is by creating a new variable 

    /app.jsx : 
    ***destructuring syntax ES6***
        var {Route, Router, IndexRoute, hashHistory} = require('react-router');

    Inside the render function: 
        ReactDOM.render(
            <Router history={hashHistory}>
                <Route path="/" component={Main}>

                </Route>
            </Router>,
  document.getElementById('app')
);
    We have now defined our first Main route, which will render the "Main" component. 


#Creating the pages
    Index Component
        /components/Weather.jsx
        After we define our new component, we have to update our <Router> like so: 
                <Router history={hashHistory}>
                    <Route path="/" component={Main}>
                        <IndexRoute component={Weather} />
                    </Route>
                 </Router>
        <IndexRoute> is component available via the 'react-router' plug-in. In there we can define our first child component as you see above.
        In order to let our 'Main' component know where to place this child, 
        we modify our 'Main' component as follows: 
                            <Nav /> 
                    <h2>Main Component</h2>
                    {this.props.children}

    Other Child Components
        Follow the same procedure as above. 
         Create a new component
         Define it's alias on webpack.config.js in order to require it easily
         In app.jsx add a nested <Route /> component inside our 'Main' route. 
            <Route path="/" component={Main}>
                <Route path="about" component={about} />
                <IndexRoute component={Weather} />
            </Route>
        Since we call "{this.props.children}" in our 'Main' component, we don't need to specify anything more there for now. With this the 'Main' component will render every child it sees in the 'app.jsx'.

#Create Links inside the navBar
    /components/Nav.jsx
        var {Link} = require('react-router');
        ...
        return(
            <div>
                <h2>Nav Component</h2>
                <Link to="/">Get Weather</Link>
                <Link to="/about">About</Link>
            </div>
            );
        ...
    <Link /> is a component included in 'react-router' plug-in.

#Promises and Callbacks
    //Calback pattern

    function getTempCallback (location, callback) {
        callback(undefined, 78);
        callback('City not found');
    }

    getTempCallback('Philadelphia', function (err, temp) {
     if(err) {
        console.log('error', err);
        } else {
        console.log('success', temp);
            }
    });

//Promise pattern

    function getTempPromise (location) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(79);
                reject('City not found');
            }, 1000);
        });
    }

    getTempPromise('Philadelphia').then(function (temp) {
        console.log('promise success', temp);
    }, function (err) {
        console.log('promise failed', err);
    }); 


#Before actually use the openweathermap api
    We need to establish the data flow between our components.
        We want to show the temperature and the location on the message under our form. As we have realised the form component (WeatherForm) and the message component (WeatherMessage) are both presentational components and they are both children of the page component (Weather). So in order to update the message component according to the data we will get in the input field of the form component we have to follow this flow: 
          Send the data from the form component to its container (the page component)
         Update the state of the container with the new data
         Send the new data via props to the message component. 

         Form --- (data) ---> Page (update state) --- (data via props) ---> Message

#Using the openweathermap api
    We are going to use the axios library via npm
        npm install axios --save

#Const
    name convetions is to use uppercase with underscore to seperate the words
    ex. OPEN_WEATHER_MAP_URL


#Things to check
    axios plug-in
    and ES6 features template strings

#Debugging
    React Developer Tools on Chrome
    Instead of 'break;' use 'debugger;' anywhere in the code in order to stop there and check.
    Source maps are usefull to return your transpiled code (your code gets translated through Webpack now, in order to be readable from the browsers). With source maps it is easier to track your errors.

#Refactor stateless functional components
    These are the components that only contain a render function. 
    Instead of (example): 
        var About = React.createClass({
            render: function () {
                return(
                    <h3>About Component</h3>
                );
            }
            });

    We can use this syntax: 
        var About = (props) => {
            return (
                <h3>About Component</h3>
                )
        };


#Deploying the WebApp live
    We are going to use GIT, GITHUB and HEROKU
    
        Adding git to an app:
            navigate inside the project folder and in the command line just run: 
                git init

        Ignore a file with git:
            Add a new file called .gitignore. Inside that file just specify the files you don't want to add on git. 
            Example: "node_modules/" 
            the '/' specifies that we are talking about a folder.

        Git add:
            Add a specific file: git add <filename>
            Add every file except the ingored ones: git add .
            With the a flag your modified files get commited as well: 
            git commit -am 'message'
            For new files we need to add them.

        Pushing to Github:
            Github--> New repository
                $git status //Shows the files modified and not commited , etc
                $git commit -am '' // Adds the files that are modified but not commited and also adds a message for the new commit
                $git push

        Deploying the WebApp on Heroku: 
            Go to Heroku and create a new account
            Install the heroku toolbelt by going to: https://devcenter.heroku.com/articles/heroku-cli
            Update the 'server.js' file:
                var express = require('express');
                // Create our app
                var app = express();
                //Usually 'const' are named with CAPS
                const PORT = process.env.PORT || 3000;
                app.use(function (req, res, next) {
                    if (req.headers['x-forwarded-proto'] === 'https') {
                        res.redirect('http://' + req.hostname + req.url);
                    } else {
                        next();
                    }
                });
                app.use(express.static('public'));
                app.listen(PORT, function () {
                  console.log('Express server is up on port ' + PORT);
                });

            Browse into the app folder from the command line and run :
                heroku login // Login with your Heroku credentials
                heroku create // Create the heroku remote for your app
                git push heroku master // Push to the heroku repo on master
                heroku open// open the heroku link for your app
#Workflow
    Scenario: Modified a component.
        If we run '$git status' after making some changes in a component, we are going to see only one the file we made the changes in. In order to proceed we need to run '$webpack', so that the 'bundle.js' file is updated with our changes. After that we follow the same procedure: 
            $git commit -am ''
            $git push // ||git push orgin master. This way we are also pushing to our github repo
            $heroku login
            $git push heroku master
            $heroku open

#Design (Foundation css framework)
    Foundation vs Bootstrap
        Units rems over pixels
        pricing tables
        tors

#Installing Foundation
    $npm install css-loader@0.23.1 script-loader@0.6.1 style-loader@0.13.0 jquery@2.2.1 foundation-sites@6.2.0 --save-dev

    Update webpack.config.js : 
        var webpack = require('webpack');
        module.exports = {
          entry: [
            'script!jquery/dist/jquery.min.js',
            'script!foundation-sites/dist/foundation.min.js',
            './app/app.jsx'
            ],
          externals: {
            jquery: 'jQuery'
          },
          plugins: [
            new webpack.ProvidePlugin({
              '$': 'jquery',
              'jQuery': 'jquery'
            })
          ]

    Inside 'app.jsx' import the new css, like so:
        // Load Foundation
        require('style!css!foundation-sites/dist/foundation.min.css');
        $(document).foundation();

#Styling Navigation
    Menu + Top Bar => 
        All we need to do here and for styling in general using Foundation, is to go the     http://foundation.zurb.com/sites/docs/ , find what we want and use the same classNames and structures as suggested. So for this one we are going to find the "Menu" and the "Top Bar" components in the foundation page and use them.