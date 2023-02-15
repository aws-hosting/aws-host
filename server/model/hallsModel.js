const mongoose = require("mongoose");

const HallsSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  noOfHalls: {
    type: Number,
    default: 0,
  },
  noOfCC: {
    type: Number,
    default: 0,
  },
  halls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seperateHalls",
    },
  ],
});

const Halls = mongoose.model("halls", HallsSchema);

module.exports = Halls;
