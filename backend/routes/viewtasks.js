const express = require("express");
const readTask = express.Router();

readTask.use(express.json());
readTask.use(express.urlencoded({ extended: true }));

const taskData = require("../model/model");

readTask.get("/viewalltasks", async (req, res) => {
  try {
    let data = await taskData.find();
    res.json(data);
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = readTask;
