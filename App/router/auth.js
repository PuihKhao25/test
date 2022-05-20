const express = require("express");
const router = express.Router();
const AuthLoginController = require('../controller/authenControllers')
const upload = require('../midleware/upload')
const validate = require("../validate/validate")

router.get("/sign-up", AuthLoginController.signUp);
router.get("/login", AuthLoginController.login);
router.post("/post-sign-up", upload.single("avatar"), validate.validateRegisterUser(), validate.validationRegError, AuthLoginController.postSignUp);
router.post("/post-login", AuthLoginController.postLogin);

router.get("/", AuthLoginController.homeManage);
router.post("/deleteUser/:id", AuthLoginController.deleteUser);
router.get("/editUser/:id", AuthLoginController.getEditUser);
router.put("/editUser/:id", AuthLoginController.postEditUser);

module.exports = router