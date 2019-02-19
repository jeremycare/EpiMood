const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Activity = require('../models/activityModel')

const filterAdminActivity = () => {
	return async (req, res, next) => {
		if (req.user.admin) {
			Activity.find({})
				.populate('users.user')
				.exec(function(err, activities) {
					if (err) {
						res.status(500).json(err)
						return
					}
					req.activities = activities
					next()
				})
		} else {
			const activities = await Activity.find(
				{
					'users.user': req.user._id,
				},
				'name feedbacks.grade feedbacks.comment feedbacks.created_at date users'
			).lean()
			activities.forEach(x => {
				x.voted = x.users.find(
					vote => vote.user.toString() === req.user._id.toString()
				).voted
				delete x.users
			})
			req.activities = activities
			next()
		}
	}
}

module.exports = {
	filterAdminActivity: filterAdminActivity,
}
