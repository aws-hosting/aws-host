const SeperateHalls = require("../model/SeperateHallModels");
const Halls = require("../model/hallsModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { createOne } = require("./factory.js");
const ClassModel = require("../model/classModel");
const storeDataModel = require("../model/storeData");
const Students = require("../model/storeData");
exports.getAllHalls = catchAsync(async (req, res, next) => {
  const doc = Halls.find({})
    .populate("halls")
    .exec((err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
      return res.status(200).json({
        status: "success",
        data: data,
      });
    });
});
exports.addHall = catchAsync(async (req, res, next) => {
  const { department, halls } = req.body;
  const selectedHalls = await Halls.findOne({ department });
  if (selectedHalls) {
    // console.log(selectedHalls);
    halls.department = selectedHalls._id;
    console.log(halls);
    const data = await SeperateHalls.create(halls)
      .then(async (halls) => {
        await Halls.updateOne({ department }, { $push: { halls: halls._id } });
      })
      .then((data) => {
        res.json({
          status: "success",
          test: "123",
        });
      })
      .catch((err) => {
        console.log(err);
        return next(new AppError(err.message, 400));
      });
  } else {
    const hall = await Halls.create({
      department,
    })
      .then(async (result) => {
        // console.log(selectedHalls);
        halls.department = result._id;
        // console.log(element);
        const data = await SeperateHalls.create(halls);
        return data;
      })
      .then(async (halls) => {
        await Halls.updateOne({ department }, { $push: { halls: halls._id } });
      })
      .then(() => {
        res.json({
          status: "success",
        });
      })
      .catch((err) => {
        return next(new AppError(err.message, 400));
      });
  }
});
exports.getStudentHallInfo = catchAsync(async (req, res, next) => {
  const { rollnumber } = req.params;
  const data = await Students.find({ rollNo: rollnumber });
  console.log(data);
  res.json({
    data,
  });
});

exports.storeHallData = catchAsync(async (req, res, next) => {
  const data = Students.create(req.body);
  res.json({
    status: "success",
    data,
  });
});
