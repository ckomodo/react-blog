// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
require("dotenv").config
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

//to enable front end app to make request to this app
const CORS = require("cors");

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//so the app accepts request from the front end
app.use(CORS());

const frontEndRoutes = require("./controllers/frontEndController");
app.use(frontEndRoutes);

//Admin routes
const adminControllers = require("./controllers/adminController");
app.use(adminControllers);

//Article routes
const articleControllers = require("./controllers/articleController");
app.use(articleControllers);

//User routes
const userControllers = require("./controllers/userController");
app.use(userControllers);

//Comment routes
const commentControllers = require("./controllers/commentController");
app.use(commentControllers);

// Routes
// =============================================================
// require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});