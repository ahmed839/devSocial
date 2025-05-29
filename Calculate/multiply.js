function calculateMultiply(a, b) {
    const result = a * b;
    console.log("Multiplication result:", result);

    setTimeout(()=>{
        console.log("setTimeOut")
    },3000)
 
}
module.exports =  calculateMultiply
