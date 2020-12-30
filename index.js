// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
// app.use(express.static("public"));

// Routes
// =============================================================
// require("./routes/api-routes.js")(app);

app.get('/', function (req, res){
    res.send("blog is coming soon")
})

//USER routes

//GET all users
app.get('/api/users', function(req, res){
    db.User.findAll().then(users=>{
        res.json(users)
    })
})

//POST/create users
app.post('/api/users', function(req, res){
    db.User.create({
        username: req.body.username,
        email:req.body.email,
        password: req.body.password
    }).then(newUser=>{
        res.json(newUser)
    }).catch(err=>{
        res.status(500).json(err)
    })
})









// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({force: false}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
