/*
    This file contains the routes for custom content, depending
    on the user's role
*/

const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.put("/api/pwchange", [authJwt.verifyToken], controller.changePassword)

    app.get("/api/test/all", controller.allAccess);
};
