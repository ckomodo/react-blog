const express = require("express");
const router = express.Router();
db = require("../models");

router.get("/", function (req, res) {
  res.send("blog is coming soon");
});

router.get("/api/articles", function (req, res) {
  db.Article.findAll({
    include: [db.Admin],
  }).then((article) => {
    res.json(article);
  });
});

module.exports = router;
