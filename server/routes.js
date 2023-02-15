const express = require("express");
const hallRoutes = require("./routes/HallRoutes");
const classRoutes = require("./routes/classRoutes");

const router = express.Router();
router.use("/halls", hallRoutes);
router.use("/class", classRoutes);

module.exports = router;
