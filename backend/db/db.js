const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MONGODB CONNECTION SUCCESSFUL");
  })
  .catch(() => {
    console.log("ERROR!!! COULDN'T CONNECT TO DB");
  });
