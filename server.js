/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Party
 * @Date: 2019-12-24 08:50:57
 * @LastEditors: Party
 * @LastEditTime: 2020-03-25 17:03:31
 */
var http = require("http");
var url = require("url");

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(pathname);

    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;