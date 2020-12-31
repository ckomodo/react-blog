// var express = require("express");
// const Admin = require("../models/Admin");


// // Sets up the Express App
// // =============================================================
// var app = express();

// var db = require("../models/Admin");

// //USER routes

// //GET/read all Admins
// app.get("/api/admin", function (req, res) {
//     db.Admin.findAll().then((admins) => {
//       res.json(admins);
//     });
//   });
  
//   //POST/create admin
//   app.post("/api/admin", function (req, res) {
//     db.Admin.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     })
//       .then((newAdmin) => {
//         res.json(newAdmin);
//       })
//       .catch((err) => {
//         res.status(500).json(err);
//       });
//   });
  
//   //PUT/update admin
//   app.put("/api/admin/:id", function (req, res) {
//     db.Admin.update({
//       username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     )
//       .then((updateAdmin) => {
//         if (updateAdmin[0] === 0) {
//           res.status(404).json(updateAdmin);
//         } else {
//           console.log(updateAdmin);
//           res.json(updateAdmin);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });
  
//   //DELETE a user
//   app.delete("/api/admin/:id", function (req, res) {
//     db.Admin.destroy({
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

//   module.exports = Admin;