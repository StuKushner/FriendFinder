//Load friends data
var friendsData = require("../data/friends.js");

// Get all of our friends data
module.exports = function(app) {
	app.get("/api/friends", function(req, res){
		res.json(friendsData);
	});

	// Our code will respond to a user's survey results.
	// It will calculate the difference between the user's numbers and those of other friends
	// The user with the least differences will be the "best friend match"
	// After the test, the user will be pushed to the database
	app.post("/api/friends", function(req, res){
		var newFriendScores = req.body.scores;
		var allScores = [];
		var friendCount = 0;
		var closestMatch = 0;

		// For each friend's data, we get a score difference,
		// which is appended by the difference between the scores of the user and those of each friend
		for (var i = 0; i < friendsData.length; i++) {
			var scoreDifference = 0;
			for (var j = 0; j < newFriendScores.length; j++) {
				scoreDifference += (Math.abs(parseInt(friendsData[i].scores[j]) - parseInt(newFriendScores[j])));
			}
			allScores.push(scoreDifference);
		}

		// Loop through all of the scores
		// If the sum of the differences is less than the differences of the current "best match"
		// the new best friend will be given accordingly
		for (var i = 0; i < allScores.length; i++) {
			if (allScores[i] <= allScores[closestMatch]) {
				closestMatch = i;
			}
		}

		var newBFF = friendsData[closestMatch];
		res.json(newBFF);
		friendsData.push(req.body);
	});
};