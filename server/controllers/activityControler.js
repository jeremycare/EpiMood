const jwt = require('jsonwebtoken')
const Activity = require('../models/activityModel')
const User = require('../models/userModel')
const UserController = require('../controllers/userController')

const index = (req, res) => {
	res.status(200).json({
		message: 'Activities retrieved successfully',
		data: req.activities,
	})
}

const addActivity = async function(req, res) {
	const activity = new Activity()
	activity.name = req.body.name
	activity.date = req.body.date
	activity.users = (await UserController.getUsersId(req.body.users)).map(x => {
		return {
			user: x,
			voted: false,
		}
	})
	activity.save(err => {
		if (err) {
			if (err.name === 'MongoError' && err.code === 11000) {
				res.status(409).json({ message: 'Activity already exist!' })
				return
			}
			res.status(500).json(err)
			return
		}
		res.status(200).json({
			message: 'New Activity created!',
			data: activity,
		})
	})
}

const viewActivity = function(req, res) {
	Activity.findById(req.params.activity_id, function(err, activity) {
		if (err) {
			res.status(500).json(err)
			return
		}
		res.status(200).json({
			data: activity,
		})
	}).populate('users.user')
}

const updateActivity = function(req, res) {
	Activity.findById(req.params.activity_id, async function(err, activity) {
		if (err) {
			res.status(500).json(err)
			return
		}
		if (!activity) {
			res.status(404).json({ message: 'Activity not found' })
			return
		}
		if (!req.body.users) {
			res.status(404).json({ message: 'Cannot remove all users' })
			return
		}
		activity.name = req.body.name
		activity.date = req.body.date

		const usersIds = await UserController.getUsersId(req.body.users)
		const newUsers = []
		while (activity.users.length > 0) {
			const user = activity.users.shift()
			if (usersIds.includes(user._id)) {
				newUsers.push(user)
				usersIds.filter(x => x !== user._id)
			} else user.remove()
		}
		usersIds.forEach(x =>
			newUsers.push({
				user: x,
				voted: false,
			})
		)
		activity.users = newUsers
		activity.save(err => {
			if (err) {
				if (err.name === 'MongoError' && err.code === 11000) {
					res.status(409).json({ message: 'Activity already exist!' })
					return
				}
				res.status(500).json(err)
				return
			}
			res.status(200).json({
				message: 'Activity updated!',
				data: activity,
			})
		})
	}).populate('users.user')
}

const deleteActivity = function(req, res) {
	Activity.deleteOne(
		{
			_id: req.params.activity_id,
		},
		function(err, activity) {
			if (err) {
				res.status(500).json(err)
				return
			}
			res.status(204).json({
				message: 'Activity deleted',
			})
		}
	)
}

const addFeedback = function(req, res) {
	Activity.findById(req.params.activity_id, async function(err, activity) {
		if (err) {
			res.status(500).json(err)
			return
		}
		if (!activity) {
			res.status(404).json({ message: 'Activity not found' })
			return
		}
		activity.users.forEach(x => console.log('x -> ', x))
		const index = activity.users.findIndex(
			x => x.user.toString() === req.user._id.toString()
		)
		if (index < 0) {
			res
				.status(403)
				.json({ message: 'You are not registered to this activity' })
			return
		}
		if (activity.users[index].voted) {
			res
				.status(403)
				.json({ message: 'You have already voted for this Activity' })
			return
		}
		if (activity.date > new Date()) {
			res.status(403).json({ message: 'Votes are not open' })
			return
		}
		activity.feedbacks.push({
			grade: req.body.grade,
			comment: req.body.comment,
		})
		activity.users[index].voted = true
		activity.save(err => {
			if (err) {
				if (err.name === 'MongoError' && err.code === 11000) {
					res.status(409).json({ message: 'Activity already exist!' })
					return
				}
				res.status(500).json(err)
				return
			}
			res.status(200).json({
				message: 'Feedback Created !',
				data: activity,
			})
		})
	})
}

module.exports = {
	index: index,
	new: addActivity,
	view: viewActivity,
	update: updateActivity,
	delete: deleteActivity,
	feedback: addFeedback,
}
