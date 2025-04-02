const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const registerModel = require('../Model/Register');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailExists = await registerModel.findOne({ email });
    const nameExists = await registerModel.findOne({ name });

    if (emailExists) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    if (nameExists) {
      return res.status(400).json({ message: "Username already exists. Please choose another." });
    }

    const newRegister = new registerModel({
      name,
      email,
      password
    });

    const savedRegister = await newRegister.save();

    const accessToken = jwt.sign(
      { name: savedRegister.name, email: savedRegister.email },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    return res.status(201).json({ name: savedRegister.name, accessToken });
  } catch (error) {
    return res.status(500).json({ error: "Error in registering account", details: error.message });
  }
};

module.exports = register;
