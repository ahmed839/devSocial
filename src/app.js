//npm i -g nodemon
const {adminAuth,userAuth} =  require("./middlewares/auth")
const express = require("express");
const app = express();

app.use("/admin", adminAuth);
app.use("/user", userAuth,(req,res)=>{
console.log("User Data Sucessfully Fetch")    
res.send("User Data Sucessfully Fetch")
});


app.get("/admin/getAllData",(req,res)=>{
console.log("Access User Account")    
res.send("Access User Account")
});
app.delete("/admin/deletAllData",(req,res)=>{
console.log("Delet User Account")    
res.send("Delet User Account")
})
app.listen(7777,()=>{console.log("Server is succesfully done port 7777..")});