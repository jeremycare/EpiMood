const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/userModel");

exports.index = function(req, res) {
	console.log("index");
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
	user.token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
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
		user.token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
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
};

exports.login = function(req, res) {
	User.findOne({ "user.email": req.params.email }, function(err, user) {
		if (user) {
			user.token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
			user.save();
		} else {
			user = new User();
			user.email = req.body.email;
			user.token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
			user.save();
		}
		var transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.GMAIL,
				pass: process.env.GMAIL_PASS
			}
		});

		var mailOptions = {
			from: process.env.GMAIL,
			to: process.env.GMAIL, //TODO CHANGE TO USER EMAIL
			subject: "EpiMood - AutoLogin Link",
			text: process.env.CLIENT_URL + "/" + user.token
		};

		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				res.status(500).json({ message: "Email service not available" });
			} else {
				console.log("Email sent: " + info.response);
			}
		});
		return res.status(200).json({ message: "Email sent with Autologin !" });
	});
};
