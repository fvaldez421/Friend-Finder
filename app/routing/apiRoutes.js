
var friends = require("../data/friends.js");

module.exports = function(app) {
	app.get("/api/friends", function(req, res) {
	  res.json(friends["user"]);
	});

	app.post("/api/new", function(req, res) {
		var user = [];
		user.push(req.body);
		var totalDiff = 0;
		var diffArr = [];
		console.log(user);
		if (user) {
		for (var i = 0; i < friends["friends"].length; i++) {
			var match = friends[i];
			var offset = 0;

			for (var j = 0; j < user[0].scores.length; j++) {
				var userScore = parseInt(user[0].scores[j]);
				var matchScore = parseInt(friends.friends[i].scores[j]);
				offset += Math.abs(userScore - matchScore);
				console.log(offset);
			};
			diffArr.push(offset);
			console.log(diffArr);
		};
		};
		var closest = Math.min.apply(null, diffArr);
		var mIndex = diffArr.indexOf(closest);
		var match = friends["friends"][mIndex];
		diffArr = [];

		friends["friends"].push(req.body);
		if (match) {
			res.json({status: 200, name: match.name, img: match.img});
		}else {
			console.log("error in matchmaking");
		}
	});
};
