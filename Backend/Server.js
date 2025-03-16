const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
require("dotenv").config()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

app.get("/",(req,res)=>{
    res.send("This is mobile dev")
})

mongoose.connect(MONGO_URI)
.then(()=>{
    console.log('Conneced to database successfully')
})
.catch((err)=>{
    console.log("Error in connecting to database",err)
})

app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`)
})