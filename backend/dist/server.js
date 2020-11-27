"use strict";
exports.__esModule = true;
var jsonServer = require("json-server");
var http = require("http");
var auth_1 = require("./auth");
var authz_1 = require("./authz");
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.post('/user/login', auth_1.handleAuthentication);
server.post('/score', function (req, resp) {
    authz_1.handleAuthorization(req, resp);
    resp.json({ raked: true, position: 2 });
});
server.get('/score/:game', function (req, res) {
    var game = req.param('game');
    res.jsonp(router.db.get(game).value());
});
var port = 5000;
http.createServer(server).listen(port, function () {
    console.log("JSON Server is running on http://localhost:" + port);
});
