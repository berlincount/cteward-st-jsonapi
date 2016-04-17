"use strict";
var server = module.exports = { };

var jsonApi = require("jsonapi-server");
var fs = require("fs");
var path = require("path");

jsonApi.setConfig({
  swagger: {
    title: "cteward storage backend",
    version: "0.3.0",
    description: "JSON API storage backend for cteward",
    contact: {
      name: "Andreas Kotes",
      email: "count@c-base.org",
      url: "https://berlincount.github.io/cteward/"
    },
    license: {
      name: "AGPL-3.0",
      url: "https://www.gnu.org/licenses/agpl-3.0.html"
    }
  },
  protocol: "http",
  hostname: "0.0.0.0",
  port: 16006,
  base: "rest",
  meta: {
//    description: "cteward storage backend"
  }
});

jsonApi.authenticate(function(request, callback) {
  // If a "blockMe" header is provided, block access.
  if (request.headers.blockme) return callback("Fail");

  // If a "blockMe" cookie is provided, block access.
  if (request.cookies.blockMe) return callback("Fail");

  return callback();
});

fs.readdirSync(path.join(__dirname, "/resources")).filter(function(filename) {
  return /^[a-z].*\.js$/.test(filename);
}).map(function(filename) {
  return path.join(__dirname, "/resources/", filename);
}).forEach(require);

jsonApi.onUncaughtException(function(request, error) {
  var errorDetails = error.stack.split("\n");
  console.error(JSON.stringify({
    request: request,
    error: errorDetails.shift(),
    stack: errorDetails
  }));
});

jsonApi.start();
server.start = jsonApi.start;
server.close = jsonApi.close;
