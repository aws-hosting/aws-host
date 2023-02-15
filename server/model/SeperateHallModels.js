const mongoose = require("mongoose");
const Halls = require("./hallsModel");
const SeperateHallSchema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "halls",
    required: [true, "requires a department"],
  },

  type: {
    type: String,
    enum: ["CC", "CL"],

    required: [true, "requires a type"],
  },
  name: {
    type: String,
    unique: true,
    required: [true, "requires a name"],
  },
  venue: {
    type: String,
    required: [true, "requires a venue"],
  },
  capacity: {
    type: Object,
    required: function () {
      return this.type === "CL";
    },
  },
  bluePrint: {
    type: Object,
    required: true,
  },
  noOfDeskRow: {
    type: Number,
    required: true,
  },
  noOfDeskColumns: {
    type: Number,
    required: true,
  },
  totalDeskCount: {
    type: Number,
    required: [
      function () {
        return this.type === "CL";
      },
      "requires total desk count",
    ],
  },
  noOfComputers: {
    type: Number,
    required: function () {
      return this.type === "CC";
    },
  },
  additionalComputers: {
    type: Number,
  },
});
// Add a pre-save hook
SeperateHallSchema.post("save", async function (doc) {
  if (this.type == "CC") {
    await Halls.findByIdAndUpdate(this.department, {
      $inc: { noOfCC: 1 },
    }).catch((err) => console.log(err));
  } else if (this.type == "CL") {
    await Halls.findByIdAndUpdate(this.department, {
      $inc: { noOfHalls: 1 },
    }).catch((err) => console.log(err));
  }
});
const SeperateHalls = mongoose.model("seperateHalls", SeperateHallSchema);
module.exports = SeperateHalls;
