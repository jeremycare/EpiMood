const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const User = require('../models/userModel')
const Activity = require('../models/activityModel')

const index = function(req, res) {
	User.find(function(err, users) {
		if (err) {
			res.status(500).json(err)
			return
		}
		res.status(200).json({
			message: 'Users retrieved successfully',
			data: users,
		})
	})
}

const addUser = function(req, res) {
	const user = new User()
	user.email = req.body.email
	user.admin = req.body.admin
	user.token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
	user.save(function(err) {
		if (err) {
			if (err.name === 'MongoError' && err.code === 11000) {
				res.status(409).json({ message: 'User already exist!' })
				return
			}
			res.status(500).json(err)
			return
		}
		res.status(200).json({
			message: 'New user created!',
			data: user,
		})
	})
}

const getUser = function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err) {
			res.status(500).json(err)
			return
		}
		res.status(200).json({
			data: user,
		})
	})
}

const updateUser = function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err) {
			res.status(500).json(err)
			return
		}
		if (!user) {
			res.status(404).json({ message: 'User not found' })
			return
		}
		user.email = req.body.email
		user.admin = req.body.admin
		user.token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
		user.save(function(err) {
			if (err) {
				if (err.name === 'MongoError' && err.code === 11000) {
					res.status(409).json({ message: 'User already exist!' })
					return
				}
				res.status(500).json(err)
				return
			}
			res.status(200).json({
				data: user,
			})
		})
	})
}

const deleteUser = function(req, res) {
	User.deleteOne(
		{
			_id: req.params.user_id,
		},
		function(err, user) {
			if (err) {
				res.status(500).json(err)
				return
			}
			res.status(204).json({
				message: 'User deleted',
			})
		}
	)
}

const retrieve = function(req, res) {
	User.findOne({ 'user.email': req.params.email }, function(err, user) {
		if (user) {
			user.token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
			user.save()
		} else {
			user = new User()
			user.email = req.body.email
			user.token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
			user.save()
		}
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.GMAIL,
				pass: process.env.GMAIL_PASS,
			},
		})

		const mailOptions = {
			from: process.env.GMAIL,
			to: process.env.GMAIL, //TODO CHANGE TO USER EMAIL
			subject: 'EpiMood - AutoLogin Link',
			text: process.env.CLIENT_URL + '/' + user.token,
		}

		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				res.status(500).json({ message: 'Email service not available' })
			} else {
				console.log('Email sent: ' + info.response)
			}
		})
		return res.status(200).json({ message: 'Email sent with Autologin !' })
	})
}

const sendReminders = () => {
	User.find((err, users) => {
		users.forEach(async user => {
			const activities = (await Activity.find({
				'users.user': user._id,
				'users.voted': false,
			})).reduce((arr, act) => {
				arr.push(act.name)
				return arr
			}, [])
			if (activities.length > 0) {
				const transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: process.env.GMAIL,
						pass: process.env.GMAIL_PASS,
					},
				})
				const mailOptions = {
					from: process.env.GMAIL,
					to: process.env.GMAIL, //TODO CHANGE TO USER EMAIL
					subject: 'EpiMood - AutoLogin Link',
					html:
						'<div><h1>Hi ! Dont forget to give us feedbacks on the following activities :</h1><br><ul>' +
						activities.map(x => '<li><h2>' + x + '</h2></li>') +
						'</ul><b>' +
						process.env.CLIENT_URL +
						'/' +
						user.token +
						'</b></div>',
				}
				transporter.sendMail(mailOptions, function(error, info) {
					if (error) {
						res.status(500).json({ message: 'Email service not available' })
					} else {
						console.log('Email sent: ' + info.response)
					}
				})
			}
		})
	})
}

const getUsersId = async emails => {
	const usersId = []
	for (const email of emails) {
		let user = await User.findOne({ email: email })
		if (!user) {
			try {
				user = new User()
				user.email = email
				user.token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
				user.save()
			} catch (e) {
				throw new Error(e)
			}
		}
		usersId.push(user._id)
	}
	return usersId
}

const login = (req, res) => {
	return res.status(200).json({
		user: req.user,
	})
}

module.exports = {
	index: index,
	new: addUser,
	update: updateUser,
	delete: deleteUser,
	view: getUser,
	getUsersId: getUsersId,
	sendReminders: sendReminders,
	retrieve: retrieve,
	login: login,
}
