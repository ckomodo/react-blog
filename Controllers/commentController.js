const express = require("express");
const router = express.Router();
db = require("../models");

//GET/read all Comments
router.get("/api/comments", function (req, res) {
  db.Comment.findAll().then((article) => {
    res.json(article);
  });
});

//GET route for a single comment with respective Users
router.get("/api/comment/:id", function (req, res) {
  db.Comment.findOne({
    where: {
      id: req.params.id,
    },
    include: [db.User],
  }).then((comment) => {
    console.log("========this is a specific comment======");
    res.json(comment);
  });
});

//POST/create comments
router.post("/api/newcomment", function (req, res) {
  db.Comment.create({
    comment: req.body.comment,
    rating: req.body.rating,
    UserId: req.body.UserId,
  })
    .then((newComment) => {
      res.json(newComment);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//PUT/update Comment
router.put("/api/comment/:id", function (req, res) {
  db.Comment.update(
    {
      comment: req.body.comment,
      rating: req.body.rating,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updateComment) => {
      if (updateComment[0] === 0) {
        res.status(404).json(updateComment);
      } else {
        console.log(updateComment);
        res.json(updateComment);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//DELETE Comment
router.delete("/api/comment/:id", function (req, res) {
  db.Comment.destroy({
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
