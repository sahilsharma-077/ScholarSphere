require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("ScholarSphere backend running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });



app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected (ScholarSphere)"))
.catch(err => console.log(err));

app.get("/", (req,res)=>{
    res.send("ScholarSphere API running");
});

app.listen(5001, ()=>{
    console.log("Server running on port 5001");
});

