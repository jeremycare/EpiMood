let router = require("express").Router();

router.get("/", function(req, res) {
	res.status(200).json({
		message: "Welcome to EpiMood crafted with love!"
	});
});
var userController = require("../controllers/userController");

router
	.route("/users")
	.get(userController.index)
	.post(userController.new);
router
	.route("/users/:user_id")
	.get(userController.view)
	.patch(userController.update)
	.put(userController.update)
	.delete(userController.delete);

module.exports = router;
