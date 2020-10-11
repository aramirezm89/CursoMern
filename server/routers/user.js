const express = require("express");
const UserController = require("../controllers/user");
const md_auth = require("../middleware/authenticated");

const api = express.Router();
api.post("/login", UserController.Login);
api.post("/sign-in", UserController.signIn);
api.get("/users", [md_auth.ensureAuth], UserController.getUsers);
api.get("/users-active",[md_auth.ensureAuth],UserController.getUsersActive)

module.exports = api;
