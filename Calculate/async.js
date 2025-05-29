const fs = require("fs")
const https = require("https")
console.log("Hello World");
var a = 1078678;
var b = 20986;
https.get("https://dummyjson.com/products/1", (res)=>{
console.log("Fetched Data Successfully");
});
setTimeout(()=>{
    console.log("setTimeout Called after 5 second")
},5000);

fs.readFile("./file.txt", "utf8",(err,data)=>{
console.log("File Data", data)
}

)
function multiplyFn(x, y) {
    const result = x * y;
    return result;
}

var c = multiplyFn(a, b);
console.log("Multiplication Result is", c);
