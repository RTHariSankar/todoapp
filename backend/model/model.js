const mongoose = require("mongoose");

const addtaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  status: {
    type: String,
    default:'Incomplete',
    required: [true, "status is required"],
  },

  addedAt: {
    type: Date,
    default: new Date(),
  },
});

addtaskSchema.post("validate", function (error, doc, next) {
  if (error) {
    const errors = {};
    for (let field in error.errors) {
      errors[field] = error.errors[field].message;
    }
    next(errors);
  } else {
    next();
  }
});

const addtaskModel = mongoose.model("addtasks", addtaskSchema);

module.exports = addtaskModel;
