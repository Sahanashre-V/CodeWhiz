const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const register = require("../Controllers/Register")
const login = require("../Controllers/Login")

const AuthenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.sendStatus(401); 
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {       
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: "Token expired. Please login again." });
            }
            else {
                return res.status(403).json({ message: "Invalid token. Please login again." });
            }
        }
        req.user = user;
        req.id = user.id;
        next();
    });
};

Router.post("/register", register);
Router.post("/login", login);

module.exports = Router