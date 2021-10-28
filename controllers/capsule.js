/////////////////////////
// Import Dependencies
/////////////////////////
const express = require("express") // express for Router function
const Capsule = require("../models/capsules.js") // capsules model

//////////////////
// create router
//////////////////
const router = express.Router()

/////////////////////////////////
// Router Middleware
/////////////////////////////////

// middleware to check if user is logged in
// router.use((req, res, next) => {
//     // check if logged in
//     if (req.session.loggedIn){
//         // send to routes
//         next()
//     } else {
//         res.redirect("/user/login")
//     }
// })


////////////////////////
// Capsules Routes
////////////////////////



// index route - get - /capsules
router.get("/", (req, res) => {
    //find all the capsules
    Capsule.find({username: req.session.username})
    .then((capsules) => {
        // render the index template with the capsules
        res.render("capsules/index.liquid", {capsules})
    })
    // error handling
    .catch((error) => {
        res.json({error})
    })
})


// pay route - get - /respect
router.get("/respect", (req, res) => {
        res.render("capsules/respect.liquid")
   
})



// new route - get request - /capsules/new
router.get("/new", (req, res) => {
    res.render("capsules/new.liquid")
})

// create - post request - /capsules
router.post("/", (req, res) => {

    

    // add the username to req.body, to track user
    req.body.username = req.session.username

    // create the new capsule
    Capsule.create(req.body)
    .then((capsule) => {
        // redirect the user back to the index route
        res.redirect("/")
    })
    // error handling
    .catch((error) => {
        res.json({error})
    })

})

// edit route - get request - /capsules/:id/edit
router.get("/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id

    // get the capsule with the matching id
    Capsule.findById(id)
    .then((capsule) => {
        // render the edit page template with the capsule data
        res.render("capsules/edit.liquid", { capsule })
    })
    // error handling
    .catch((error) => {
        res.json({error})
    })
})

// update route - put request - "/capsules/:id"
router.put("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    
    // convert the checkbox property to true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false

    // update the item with the matching id
    Capsule.findByIdAndUpdate(id, req.body, {new: true})
    .then((capsule) => {
        // redirect user back to index
        res.redirect("/capsules")
    })
     // error handling
     .catch((error) => {
        res.json({error})
    })
}
)

// destroy route - delete request - /capsules/:id
router.delete("/:id", (req, res) => {
    // grab the id from params
    const id = req.params.id
    // delete the capsule
    Capsule.findByIdAndRemove(id)
    .then((capsule) => {
        // redirect user back to index
        res.redirect("/capsules")
    })
     // error handling
     .catch((error) => {
        res.json({error})
    })
})

// show route - get - /capsules/:id
router.get("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id

    // get that particular capsule from the database
    Capsule.findById(id)
    .then((capsule) => {
        // render the show template with the capsule
        res.render("capsules/show.liquid", {capsule})
    })
    // error handling
    .catch((error) => {
        res.json({error})
    })
})


/////////////////////////////
// export the router
/////////////////////////////
module.exports = router