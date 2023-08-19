const express = require("express");
const readTask = express.Router();

readTask.use(express.json());
readTask.use(express.urlencoded({ extended: true }));

const taskData = require("../model/model");

readTask.post("/addtasks", async (req, res) => {
    try {
      const data = req.body;
      const newTask = new taskData(data);
      await newTask.save();
      res.status(200).json({ message: "Task added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to add requirement to database" });
    }
});

module.exports = readTask;
