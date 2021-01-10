const express = require("express");
const router = express.Router();
db = require("../models");
const jwt = require ("jsonwebtoken")


//validation for secret route
const checkAuthStatus = request => {
  if(!request.headers.authorization){
    return false
  }
  const token = request.headers.authorization.split(" ")[1]
  const loggedInAdmin = jwt.verify(token, "mySecretString", (err, data)=>{

    if(err) {
      return false
    }
    else {
      return data
    }
  })
  console.log(loggedInAdmin);
  return loggedInAdmin
}

//GET/read all Articles 
router.get("/api/articles", function (req, res) {
  db.Article.findAll({
    include: [db.Admin],
  }).then((article) => {
    res.json(article);
  });
});


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
const loggedInAdmin = checkAuthStatus(req);
if(!loggedInAdmin){
  return res.status(401).send("log in with your admin account to post articles")
}
  db.Article.create({
    title: req.body.title,
    article: req.body.article,
    AdminId: req.body.AdminId,
  })
    .then((newArticle) => {
      res.json(newArticle);
    })
    .catch((err) => {
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
