// var express = require("express");
// const Article = require("../models/Article");

// // Sets up the Express App
// // =============================================================
// var app = express();

// var db = require("../models");


// //GET/read all Articles
// app.get("/api/articles", function (req, res) {
//     db.Article.findAll().then((article) => {
//       res.json(article);
//     });
//   });

//   //POST/create articles
//   app.post("/api/articles", function (req, res) {
//     db.Article.create({
//       title: req.body.title,
//       article: req.body.article,
//       AdminId: req.body.AdminId   
//     })
//       .then((newArticle) => {
//         res.json(newArticle);
//       })
//       .catch((err) => {
//         res.status(500).json(err);
//       });
//   });


//   module.exports = Article;