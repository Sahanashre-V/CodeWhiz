
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Register = require('../Model/Register')

require('dotenv').config();

const register = async (req, res) => {
  try {
    // console.log(Register, "is it a model?")
    const { name, email, password } = req.body;
    // console.log(name, email, password, "body->>>>>>>>>>>");

    const emailExists = await Register.findOne({email})
    const nameExists = await Register.findOne({name})

    // console.log(emailExists, "email exists->>>")

    if (emailExists) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    if (nameExists) {
      return res.status(400).json({ message: "Username already exists. Please choose another." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newRegister = await Register.create({
      name,
      email,
      password:hashedPassword
    });


    const accessToken = jwt.sign(
      { name: newRegister.name, email: newRegister.email },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    return res.status(201).json({ name: newRegister.name, accessToken });
  } catch (error) {
    return res.status(500).json({ error: "Error in registering account", details: error.message });
  }
};

module.exports = register;
