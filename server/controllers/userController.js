let jwt = require("express-jwt");
User = require("../models/userModel");

exports.index = function(req, res) {
	User.get(function(err, users) {
		if (err) {
			res.status(500).json(err);
			return;
		}
		res.status(200).json({
			message: "Users retrieved successfully",
			data: users
		});
	});
};
exports.new = function(req, res) {
	let user = new User();
	user.email = req.body.email;
	user.admin = req.body.admin;
	user.save(function(err) {
		if (err) {
			if (err.name === "MongoError" && err.code === 11000) {
				res.status(409).json({ message: "User already exist!" });
				return;
			}
			res.status(500).json(err);
			return;
		}
		res.status(200).json({
			message: "New user created!",
			data: user
		});
	});
};
exports.view = function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err) {
			res.status(500).json(err);
			return;
		}
		res.status(200).json({
			data: user
		});
	});
};
exports.update = function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err) {
			res.status(500).json(err);
			return;
		}
		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}
		user.email = req.body.email;
		user.admin = req.body.admin;
		user.save(function(err) {
			if (err) {
				if (err.name === "MongoError" && err.code === 11000) {
					res.status(409).json({ message: "User already exist!" });
					return;
				}
				res.status(500).json(err);
				return;
			}
			res.status(200).json({
				data: user
			});
		});
	});
};
exports.delete = function(req, res) {
	User.remove(
		{
			_id: req.params.user_id
		},
		function(err, user) {
			if (err) {
				res.status(500).json(err);
				return;
			}
			res.status(204).json({
				message: "User deleted"
			});
		}
	);
	exports.login = function(req, res) {};
};
