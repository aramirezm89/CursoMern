const UserReviews = require("../models/userReviews")
const {response} = require("express");


function addReview(req, res){
    const userReview = new UserReviews();

    const {name,description,review,avatar} = req.body;

    userReview.name = name;
    userReview.description = description;
    userReview.review = review;
    userReview.avatar = avatar;

    userReview.save((err,reviewStored) =>{
        if(err){
            res.status(500).send({message:"error al guardar la review"})
        }else{
            if(!reviewStored){
                res.status(500).send({message:"Datos incorrectos no se pudo guardar su review."})
            }else{
                res.status(200).send({
                    userReview:reviewStored,
                    message:"Review guardada correctamente"
                })
            }
        }
    })
}

module.exports = {
    addReview
}