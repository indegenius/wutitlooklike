///////////////////////////////////
// import dependencies
///////////////////////////////////
// import the existing connected mongoose object from connection.js
const mongoose = require("./connection")

///////////////////////////////////////////
// Create our Capsules Model
///////////////////////////////////////////
// destructuring Schema and model from mongoose
const {Schema, model} = mongoose 

// make a capsules schema
const capsuleSchema = new Schema({
    picture: String,
    message: String,
    country: String,
    username: String
})

// Make the Capsule Model
const Capsule = model("Capsule", capsuleSchema)

// log the model to make sure it exists
// console.log(Capsule)

///////////////////////////////////////
//export the capsule model
///////////////////////////////////////
module.exports = Capsule