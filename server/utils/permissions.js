const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.permission = function(admin) {
	return (req, res, next) => {
		const apiKey = req.get('Api-Key');
		console.log(apiKey);
		if (apiKey === undefined) {
			res.status(401).end();
			return;
		} else {
			try {
				const decoded = jwt.verify(apiKey, process.env.SECRET_KEY);
				if (decoded === null) {
					res.status(401).end();
					return;
				} else {
					console.log(User.findById);
					User.findById(decoded._id, function(err, user) {
						if (err) {
							res.status(500).json(err);
							return;
						}
						if (!user || apiKey !== user.token) {
							res.status(401).json({ message: 'Invalid Token' });
							return;
						}
						if (admin && admin !== user.admin) {
							console.log(admin, user.admin);
							res.status(403).end();
							return;
						}
						req.user = user;
						next();
					});
				}
			} catch (e) {
				console.log(e);
				return res.status(401);
			}
		}
	};
};
