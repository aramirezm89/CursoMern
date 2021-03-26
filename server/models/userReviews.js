const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserReviesSchema = Schema({
    name: String,
    description: String,
    review: String,
    avatar: String,
})

module.exports = mongoose.model("UserReviews",UserReviesSchema)