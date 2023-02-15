const ClassModel = require("../model/classModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
exports.getAllClass = catchAsync(async (req, res, next) => {
  const { query } = req;
  console.log(query);
  const data = await ClassModel.find(query);
  console.log(data);
  res.json({ status: "success", data });
});

exports.addClass = catchAsync(async (req, res, next) => {
  const data = req.body;
  data.map((el) => {
    el._id = [el.joinedYear, el.department, el.section].join("-");
    return el;
  });
  console.log(data);
  const doc = await ClassModel.create(data);
  res.json({
    status: "success",
    data: doc,
  });
});
exports.editClass = catchAsync(async (req, res, next) => {
  const { body: doc } = req;
  const { _id } = req.params;
  const updatedData = await ClassModel.findByIdAndUpdate(_id, doc);
  res.json({ status: "success", doc, _id });
});
