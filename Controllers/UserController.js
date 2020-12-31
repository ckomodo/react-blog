// var express = require("express");
// const User = require("../models/User");

// // Sets up the Express App
// // =============================================================
// var app = express();

// var db = require("../models/User");


// //USER routes

// //GET/read all users
// app.get("/api/users", function (req, res) {
//     db.User.findAll().then((users) => {
//       res.json(users);
//     });
//   });
  
//   //POST/create users
//   app.post("/api/users", function (req, res) {
//     db.User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     })
//       .then((newUser) => {
//         res.json(newUser);
//       })
//       .catch((err) => {
//         res.status(500).json(err);
//       });
//   });
  
//   //PUT/update a user
//   app.put("/api/users/:id", function (req, res) {
//     db.User.update(
//       {
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     )
//       .then((updateUser) => {
//         if (updateUser[0] === 0) {
//           res.status(404).json(updateUser);
//         } else {
//           console.log(updateUser);
//           res.json(updateUser);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });
  
//   //DELETE a user
//   app.delete("/api/users/:id", function (req, res) {
//     db.User.destroy({
//       where: {
//         id: req.params.id,
//       },
//     })
//       .then((data) => {
//         if (data === 0) {
//           res.status(404).json(data);
//         } else {
//           res.json(data);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

//   module.exports = User;