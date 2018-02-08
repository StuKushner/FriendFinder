// DEPENDENCIES - the npm packages used
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//Tells node we are creating an express server
var app = express();
//Setting an initial port
var port = process.env.PORT || 3000;

//Parse application
app.use(bodyParser.urlencoded({ extended: true }));
//Parse json
app.use(bodyParser.json());

// ROUTES - this is how the website will respond when users visit or request data from various URLs.
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// LISTEN - this "starts" our server
app.listen(port, function() {
	console.log("App listening on port " + port);
});


