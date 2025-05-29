const crypto = require("crypto");
console.log("Hello World");
var a = 1078678;
var b = 20986;
crypto.pbkdf2Sync("password", "salt", 500000,50, "sha512");
console.log("First Key is Genrated");

function multiplyFn(a,b){
const result  = a*b;
console.log(result)
}
multiplyFn(a,b)

