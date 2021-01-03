const express = require("express");
const router = express.Router();
db = require("../models");

//GET/read all Articles in frontEndControllers

//GET one Article with corresponding admin
router.get("/api/articles/:id", function (req, res) {
  db.Article.findOne({
    where: {
      id: req.params.id,
    },
    include: [db.Admin],
  }).then((article) => {
    res.json(article);
  });
});

//POST/create articles
router.post("/api/newarticle", function (req, res) {
  console.log("??????POST????????");
  db.Article.create({
    title: req.body.title,
    article: req.body.article,
    AdminId: req.body.AdminId,
  })
    .then((newArticle) => {
      console.log("!!!!FIND THE ARTICLE!!!!!");
      res.json(newArticle);
    })
    .catch((err) => {
      console.log("******ERRORS******");
      res.status(500).json(err);
    });
});

//PUT/update Article
router.put("/api/article/:id", function (req, res) {
  db.Article.update(
    {
      title: req.body.title,
      article: req.body.article,
      AdminId: req.body.AdminId,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updateArticle) => {
      if (updateArticle[0] === 0) {
        res.status(404).json(updateArticle);
      } else {
        console.log(updateArticle);
        res.json(updateArticle);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//DELETE Article
router.delete("/api/article/:id", function (req, res) {
  db.Article.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (data === 0) {
        res.status(404).json(data);
      } else {
        res.json(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
