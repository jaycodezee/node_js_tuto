const http = require("http");
const data = require("./data");

http.createServer((req, resp) => {
    resp.writeHead(201, { "Content-Type": "applicationjson" });
    resp.write(JSON.stringify(data));
    resp.end();
  })
  .listen(3000);

console.log("http://localhost:3000/")

