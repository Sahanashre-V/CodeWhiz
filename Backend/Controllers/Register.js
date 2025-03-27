const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const registerModel = require('../Model/Register');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body)

    const emailExists = await registerModel.findOne({ email });
    const usernameExists = await registerModel.findOne({ username });

    if (emailExists) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists. Please choose another." });
    }

    const newRegister = new registerModel({
      username,
      email,
      password
    });

    const savedRegister = await newRegister.save();

    const accessToken = jwt.sign(
      { username: savedRegister.username, email: savedRegister.email },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    return res.status(201).json({ username: savedRegister.username, accessToken });
  } catch (error) {
    return res.status(500).json({ error: "Error in registering account", details: error.message });
  }
};

module.exports = register;
