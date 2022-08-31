/*
    This file exports what the user.routes.js file should render/send
    at the end of the middleware chain. As of now those are just placeholders
*/

const db = require("../models");
const bcrypt = require("bcryptjs");

/* Extract User from models (const db) for easier referencing */
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.changePassword = async (req, res) => {
    const currUser = await User.findOne({
        where: {
            username: req.body.username
        }
    })
        .catch(err => res.status(500).send({ message: err.message }))

    if (currUser) {
        currUser.update({
            password: bcrypt.hashSync(req.body.newPassword, 8),
        }).then(res.send({ message: "Password successfully updated" }))
    } else {
        res.send({ message: "Error: Trying to update password to an non-exising user" })
    }
}
