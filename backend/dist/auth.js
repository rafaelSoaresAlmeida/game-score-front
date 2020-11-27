"use strict";
exports.__esModule = true;
exports.handleAuthentication = void 0;
var users_1 = require("./users");
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api-config");
exports.handleAuthentication = function (req, resp) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = users_1.users[user.email];
        var token = jwt.sign({ sub: dbUser.email, iss: 'game-api' }, api_config_1.apiConfig.secret);
        resp.json({
            user: { name: dbUser.name, email: dbUser.email },
            token: token
        });
    }
    else {
        resp.status(403).json({ message: 'Dádos inválidos.' });
    }
    function isValid(user) {
        if (!user) {
            return false;
        }
        var dbUser = users_1.users[user.email];
        return dbUser !== undefined && dbUser.matches(user);
    }
};