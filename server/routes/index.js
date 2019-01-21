const router = require('express').Router()
const permission = require('../utils/permissions')

const userController = require('../controllers/userController')
const activityControler = require('../controllers/activityControler')

router.get('/', function(req, res) {
	res.status(200).json({
		message: 'Welcome to EpiMood crafted with love!',
	})
})

router
	.route('/users')
	.get(permission.permission(), userController.index)
	.post(permission.permission(), userController.new)
router
	.route('/users/:user_id')
	.get(permission.permission(), userController.view)
	.patch(permission.permission(), userController.update)
	.put(permission.permission(), userController.update)
	.delete(permission.permission(), userController.delete)

router.route('/login').post(userController.login)

router
	.route('/activities')
	.get(permission.permission(), activityControler.index)
	.post(permission.permission(), activityControler.new)
router
	.route('/activities/:activity_id')
	.get(permission.permission(), activityControler.view)
	.patch(permission.permission(), activityControler.update)
	.put(permission.permission(), activityControler.update)
	.delete(permission.permission(), activityControler.delete)

router
	.route('/activities/:activity_id/feedback')
	.post(permission.permission(), activityControler.feedback)

module.exports = router
