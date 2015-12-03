// boilerplate code
var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		methodOverride = require('method-override'),
		engine = require('ejs-mate'),
		morgan = require("morgan"),
		routes = require('./routes'),
		path = require("path");

// use ejs-locals for all ejs templates: 
app.engine('ejs', engine);
// access client assets from index view (line 32)
app.use('/css',express.static(path.join(__dirname, '../client/css')));
app.use('/js',express.static(path.join(__dirname, '../client/js')));
app.use('/templates',express.static(path.join(__dirname, '../client/js/templates')));
// set static directory to public
app.use(express.static('public'));
// use morgan
app.use(morgan("tiny"));
// use body parser
app.use(bodyParser.urlencoded({extended: true}));
// body-parser json
app.use(bodyParser.json());
// use method-override
app.use(methodOverride('_method'));
// api post routes
app.use('/api/posts', routes.posts);
// api user routes
app.use('/api/users', routes.users);

// Set home page route
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// start the server
app.listen(3000, function () {
	console.log('Starting a server on localhost:3000');
});