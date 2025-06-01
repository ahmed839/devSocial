//npm i -g nodemon
const express = require("express");
const app = express();


app.post("/user",(req,res)=>{
res.send("Data Succefully save that the database")
});
app.get("/user",(req,res)=>{
res.send({firstName:"Ahmed", lastName:"Khan"})
});
app.delete("/user",(req,res)=>{
res.send("User Account Delet")
})
// app.use("/", (req,res)=>{
// res.send("Welcome to the root")
// }); 

app.listen(7777,()=>{console.log("Server is succesfully done port 7777..")});