const express = require("express");
const UserController = require("../controllers/user");

const api = express.Router();
api.post("/login", UserController.Login);
api.post("/sign-in", UserController.signIn);
module.exports = api;
