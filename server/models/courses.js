const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = Schema({
    idCourse:{
        type: Number,
        unique: true,
        required:true
    },
    link:String,
    coupon:String,
    price:String,
    order:Number

})

module.exports = mongoose.model("Course",courseSchema);