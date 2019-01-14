const router = require("express").Router();
const permission = require("../utils/permissions");

router.get("/", function(req, res) {
	res.status(200).json({
		message: "Welcome to EpiMood crafted with love!"
	});
});
var userController = require("../controllers/userController");

router
	.route("/users")
	.get(permission.permission(true), userController.index)
	.post(permission.permission(true), userController.new);
router
	.route("/users/:user_id")
	.get(permission.permission(), userController.view)
	.patch(permission.permission(), userController.update)
	.put(permission.permission(), userController.update)
	.delete(permission.permission(), userController.delete);
router.route("/login").post(userController.login);

module.exports = router;
