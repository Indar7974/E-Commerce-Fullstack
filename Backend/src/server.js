const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route")

const app = express();

// const middleware1 = (req,res,next)=>{
//   console.log("This is Middleware 1");
//   let randomNo = Math.floor(Math.random()*10);
//   if(randomNo <4){
//     res.json({msg:"This is Middleware1"});
//     console.log(randomNo);
//   }else{
//     console.log(randomNo);
//     next();
//   }  
// }

// const middleware2 = (req,res,next)=>{
//   console.log("This is Middleware 1");
//   let randomNo2 = Math.floor(Math.random()*10);
//   if(randomNo2 <4){
//     res.json({msg:"This is Middleware1"});
//     console.log(randomNo2);
//   }else{
//     console.log(randomNo2);
//     next();
//   }  
// }

// app.use(middleware1)
// app.use(middleware2);

app.use(express.json()); // Middleware
app.use("/", route); // Middleware

// Batabase Connection

mongoose.connect(
    "mongodb+srv://kushwahindarjeetsingh22:75rUJd7L20e9OqGR@cluster0.ckntexg.mongodb.net/E-Commerce"
  )
  .then(() => console.log("MongooseDB Connected"))
  .catch(() => console.log("MongooseDB Connection Failed"));

// Creating Server

app.get("/", (req, res) => {
  res.send("Hello From Express Js");
});

let PORT = 4000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is Running at Port ${PORT}`);
  }
});