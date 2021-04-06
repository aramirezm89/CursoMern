const express = require("express");
const CoursesController = require("../controllers/courses");

const md_auth = require("../middleware/authenticated");

const api = express.Router();

api.post("/add-course",[md_auth.ensureAuth],CoursesController.addCourse);
api.get("/get-courses",CoursesController.getCourses);
api.delete("/delete-course/:id",[md_auth.ensureAuth],CoursesController.deleteCourse);
api.put("/update-course/:id",[md_auth.ensureAuth],CoursesController.updateCourse)

module.exports = api;