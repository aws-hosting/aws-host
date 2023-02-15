const mongoose = require("mongoose");
const classModelSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    indexedDB: true,
  },
  noOfStudents: {
    type: Number,
    required: true,
  },
  lateral: {
    type: Number,
    required: true,
  },
  reqular: {
    type: Number,
    required: true,
  },
  reqularStartingRollnumber: {
    type: Number,
    required: true,
  },
  lateralStartingRollnumber: {
    type: Number,
    required: true,
  },
  regularRollNoPrefix: {
    type: String,
    required: true,
  },
  lateralRollNoPrefix: {
    type: String,
    required: true,
  },
  joinedYear: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  notEligible: {
    type: [Number],
    default: [],
  },
});

const ClassModel = mongoose.model("ClassModel", classModelSchema);
module.exports = ClassModel;
