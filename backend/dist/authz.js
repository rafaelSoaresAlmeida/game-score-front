"use strict";
exports.__esModule = true;
exports.handleAuthorization = void 0;
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api-config");
exports.handleAuthorization = function (req, resp) {
    var token = extractToken(req);
    if (!token) {
        resp.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"');
        resp.status(401).json({ message: 'You need to login.' });
    }
    else {
        jwt.verify(token, api_config_1.apiConfig.secret, function (error, decoded) {
            if (!decoded) {
                resp.status(403).json({ message: 'Not authorized.' });
            }
        });
    }
};
function extractToken(req) {
    var token = undefined;
    if (req.header && req.headers.authorization) {
        // Autorization: Bearer zzz.zzz.zzz
        var parts = req.headers.authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
        return token;
    }
}
