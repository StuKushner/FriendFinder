var friendsData = require("../data/friends.js");

module.exports = function(app) {
	app.get("/api/friends", function(req, res){
		res.json(friendsData);
	});

	app.post("/api/friends", function(req, res){
		var newFriendScores = req.body.scores;
		var allScores = [];
		var friendCount = 0;
		var closestMatch = 0;

		for (var i = 0; i < friendsData.length; i++) {
			var scoreDifference = 0;
			for (var j = 0; j < newFriendScores.length; j++) {
				scoreDifference += (Math.abs(parseInt(friendsData[i].scores[j]) - parseInt(newFriendScores[j])));
			}
			allScores.push(scoreDifference);
		}

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