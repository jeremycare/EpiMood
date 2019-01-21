const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	token: {
		type: String,
		required: true,
		unique: true,
	},
	admin: {
		type: Boolean,
		required: false,
		default: false,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	update_at: {
		type: Date,
	},
});

module.exports = mongoose.model('Users', UserSchema);
