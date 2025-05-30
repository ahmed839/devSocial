//npm i -g nodemon
const express = require("express");
const app = express();
app.use("/", (req,res)=>{
res.send("Welcome to the root")
});
app.use("/hello",(req,res)=>{
res.send("Hello From Server!!")
}) 

app.listen(7777,()=>{console.log("Server is succesfully done port 7777..")});