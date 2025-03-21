const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const register = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    }
})

register.pre("save", async function(next) {
    const user = this;
    try {
        if(user.password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
            next();
        }
    } catch (error) {
        next(error);
    }
});

const registerSchema = mongoose.model("Register",register)
module.exports = registerSchema