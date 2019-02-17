const router = require('express').Router()
const permission = require('../utils/permissions')

const userController = require('../controllers/userController')
const activityControler = require('../controllers/activityControler')
const activityMiddleware = require('../middlewares/activityMiddelware')

router.get('/', function(req, res) {
	res.status(200).json({
		message: 'Welcome to EpiMood crafted with love!',
	})
})

router
	.route('/users')
	.get(permission.permission(true), userController.index)
	.post(permission.permission(true), userController.new)
router
	.route('/users/:user_id')
	.get(permission.permission(true), userController.view)
	.patch(permission.permission(true), userController.update)
	.put(permission.permission(true), userController.update)
	.delete(permission.permission(true), userController.delete)

router
	.route('/login')
	.post(userController.retrieve)
	.get(permission.permission(false), userController.login)

router
	.route('/activities')
	.get(
		permission.permission(false),
		activityMiddleware.filterAdminActivity(),
		activityControler.index
	)
	.post(permission.permission(true), activityControler.new)
router
	.route('/activities/:activity_id')
	.get(permission.permission(true), activityControler.view)
	.patch(permission.permission(true), activityControler.update)
	.put(permission.permission(true), activityControler.update)
	.delete(permission.permission(true), activityControler.delete)

router
	.route('/activities/:activity_id/feedback')
	.post(permission.permission(false), activityControler.feedback)

module.exports = router
