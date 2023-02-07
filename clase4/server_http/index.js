//Using http
const http = require("http");
const PORT = 8080; 

//Creating the server
const server = http.createServer((request,response)=>{
  response.end('My first Hello world')
})
//Raising the server 
server.listen(PORT,()=>{
  console.log(`API running on port ${PORT}`);
})