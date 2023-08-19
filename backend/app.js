const express = require("express");
const app = express();
const path = require("path");


require("dotenv").config();
const PORT = process.env.PORT;

const morgan = require("morgan");
app.use(morgan("dev"));

const cors = require("cors");
app.use(cors());

require('./db/db');

// app.use(express.static(path.join(__dirname, "build")));

const addtasks = require("./routes/addtask");
app.use("/api", addtasks);

const viewalltasks = require("./routes/viewtasks");
app.use("/api", viewalltasks);

const deletetask = require("./routes/deletetask");
app.use("/api", deletetask);

const updateTask = require("./routes/updatetasks");
app.use("/api", updateTask);

// app.get('*',async(req,res)=>{
//   try{
//     res.sendFile(path.join(__dirname,'build/index.html'));
// }
//   catch(error){
//     console.log(error);
//   }
// })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
