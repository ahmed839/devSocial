const { calculateMultiply, calculatSum,  } = require("./Calculate");

var name = "Ahmed Khan";
var a = 10;
var b = 20;

calculatSum(a, b);
calculateMultiply(a, b);



console.log("Name:", name);
console.log("a + b (direct):", a + b);
console.log(__dirname);
