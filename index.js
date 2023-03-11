const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const port = process.env.PORT || 8000;
const app = express();
const offer = require("./routes/offerRoute");
const user = require("./routes/userRoute")
mongoose.connect("mongodb://localhost:27017/user").then(()=> {
    console.log("successfull connected to db");
}).catch(()=> {
    console.log("failed to connect to database");
});

app.use(bodyparser.json());
app.use("/",user)
app.use("/",offer)


app.listen(port,()=>{console.log("server is up at " + port)})
// app.use("/user",)

