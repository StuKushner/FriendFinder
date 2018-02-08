// require path
var path = require("path");

// Takes the user to different parts of the website depending on the URL
module.exports = function(app) {
	app.get("/survey", function(req, res){
		res.sendFile(path.join(__dirname, "/../public/survey.html"));
	});

	// If no matches exist, go to the home page
	app.get("*", function(req, res){
		res.sendFile(path.join(__dirname, "/../public/home.html"));
	});
};

