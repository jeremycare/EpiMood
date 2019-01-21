const mongoose = require('mongoose')

let ActivitySchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	update_at: {
		type: Date,
	},
	users: [
		mongoose.Schema({
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Users',
				required: true,
			},
			voted: {
				type: Boolean,
				default: false,
			},
		}),
	],
	feedbacks: [
		mongoose.Schema({
			grade: {
				type: Number,
				required: true,
				min: 0,
				max: 4,
			},
			comment: {
				type: String,
				required: false,
			},
			created_at: {
				type: Date,
				default: Date.now,
			},
		}),
	],
})

module.exports = mongoose.model('Activities', ActivitySchema)
