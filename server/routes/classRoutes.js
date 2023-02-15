const express = require("express");
const {
  addClass,
  getAllClass,
  editClass,
} = require("../controller/classControllers");
const routes = express.Router();
routes.get("/all", getAllClass);
routes.post("/add", addClass);
routes.patch("/edit/:_id", editClass);
module.exports = routes;
