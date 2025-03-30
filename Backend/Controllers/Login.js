const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const registerModel = require("../Model/Register");
require("dotenv").config();

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Both email and password are required" });
        }

        const user = await registerModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist. Please register." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { username: user.username, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = login;
