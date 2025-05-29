const http = require("node:http");
const server = http.createServer(function (req,res){
    if(req.url === "/getSecretData"){
   res.end("Response data difrent URL")
    }
    res.end("hello World")
});
server.listen(7777);