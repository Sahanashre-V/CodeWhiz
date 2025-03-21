const mongoose = require("mongoose")
const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const Router = require("./Routes/Route.js")

app.use(cors())
app.use(express.json())
app.use("/api",Router)

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