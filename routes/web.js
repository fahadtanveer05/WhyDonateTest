const express = require("express");
const router = express.Router();
const UserController = require("../app/controllers/UserController");
const { connect } = require("../config/database");

router.get("/connect", connect);
router.get("/getUser", UserController.getUser);
router.post("/createUser", UserController.createUser);
router.put("/updateUser", UserController.updateUser);
router.delete("/deleteUser", UserController.deleteUser);

module.exports = router;
