const express = require("express");
const deleteTask = express.Router();

deleteTask.use(express.json());
deleteTask.use(express.urlencoded({ extended: true }));

const taskData = require("../model/model");

deleteTask.delete("/deletetask/:_id", async (req, res) => {
  try {
    let id = req.params._id;
    await taskData.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(501).json("Error!!! Data not deleted");
  }
});

module.exports = deleteTask;
