const http = require("http");
const server = http.createServer((req, res) => {
  console.log("run request ...");
  res.setHeader("Content-Type", "text/html");
  res.writable("<h3>Hello World</h3>");
  res.end();
});
server.listen(3000, "localhost", () => {
  console.log("Node server running port: 3000");
});
