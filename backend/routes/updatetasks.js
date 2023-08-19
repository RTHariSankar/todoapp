const express = require("express");
const updateTask = express();

updateTask.use(express.json());
updateTask.use(express.urlencoded({ extended: true }));

const taskData = require("../model/model");

updateTask.put("/updateTask/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
      }
    };
    await taskData.findByIdAndUpdate(id, updatedData);
    res.status(200).json({ message: "Task Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Task unable to update" });
  }
});

module.exports = updateTask;

