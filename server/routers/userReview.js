const express = require("express");
const UserReviews = require("../controllers/userReviews");

const api = express.Router();
api.post("/review",UserReviews.addReview);



module.exports = api;