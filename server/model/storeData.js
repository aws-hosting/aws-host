const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  table: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
  },
  hall: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Students = mongoose.model("Student", studentSchema);
module.exports = Students;
