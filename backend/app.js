const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;

const morgan = require("morgan");
app.use(morgan("dev"));

const cors = require("cors");
app.use(cors());

require('./db/db');

const addtasks = require("./routes/addtask");
app.use("/api", addtasks);

const viewalltasks = require("./routes/viewtasks");
app.use("/api", viewalltasks);

const deletetask = require("./routes/deletetask");
app.use("/api", deletetask);

const updateTask = require("./routes/updatetasks");
app.use("/api", updateTask);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
