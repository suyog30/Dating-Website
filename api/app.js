const mongoose = require("mongoose")
const express = require("express")
const app = express()


//const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config();


//DB connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to Database")
}).catch(() => {
    console.log("Unable to connect to Database")
})


//use parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors())


//import the routes
const userRoutes = require("./routes/user")

//Using routes
app.use('/api', userRoutes)


const port = process.env.PORT || 8000

//starting a server
app.listen(port, () => {
    console.log(`App is running at ${port}`)
})