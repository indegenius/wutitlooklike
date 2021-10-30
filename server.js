///////////////////////////////////
// Import our Dependencies
///////////////////////////////////
require("dotenv").config() // brings in .env vars
const express = require("express") // web framework
const morgan = require("morgan") // logger
const methodOverride = require("method-override") // to swap request methods
const path = require("path") // helper functions for file paths
const CapsulesRouter = require("./controllers/capsule")
const UserRouter = require("./controllers/user")
const session = require("express-session") // session middleware
const MongoStore = require("connect-mongo") // save sessions in mongo
const Capsule = require("./models/capsules.js") // capsules model
const sass = require('node-sass');


/////////////////////////////////
// Create our app with object, configure liquid
/////////////////////////////////
// import liquid
const liquid = require("liquid-express-views")
// construct an absolute path to our views folder
const viewsFolder = path.resolve(__dirname, "views/")

// log to see the value of viewsFolder
// console.log(viewsFolder)

// create an app object with liquid, passing the path to the views folder
const app = liquid(express(), {root: viewsFolder})

// console.log app to confirm it exists
// console.log(app)


/////////////////////////////////////////////
// Register Our Middleware
/////////////////////////////////////////////
// logging
app.use(morgan("tiny"))
// ability to override request methods
app.use(methodOverride("_method"))
// ability to parse urlencoded from for submission
app.use(express.urlencoded({extended: true}))
// setup our public folder to serve files statically
app.use(express.static("public"))
// middlware to create sessions (req.session)
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    resave: false,
    saveUninitialized: true
}))
// // sass middleware
// app.use(
//     sass.middleware({
//         src: __dirname + '/public', //where the sass files are 
//         dest: __dirname + '/public', //where css should go
//         debug: true // obvious
//     })
// );

////////////////////////////////////////
// Routes
/////////////////////////////////////////

app.get("/", (req, res) => {
    Capsule.find({})
.then((capsules) => {
    // render the index template with the capsules
    res.render("capsules/index.liquid", {capsules})
})
// error handling
.catch((error) => {
    res.json({error})
})
})

// Register Capsules Router
app.use("/capsules", CapsulesRouter)

// Register User Router
app.use("/user", UserRouter)



/////////////////////////////////////////////
// Setup Server Listener
/////////////////////////////////////////////
const PORT = process.env.PORT // grabbing the port number from env
app.listen(PORT, () =>  console.log(`Listening on port ${PORT}`))