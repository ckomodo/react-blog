const express = require("express");
const router = express.Router();
db = require("../models");

//GET/read all Admins
router.get("/api/admin", function (req, res) {
  console.log("++++++FIND ADMINS+++++");
  db.Admin.findAll({
    include: [db.Article],
  })
    .then((admins) => {
      console.log("++++++LOG ADMINS+++++");
      res.json(admins);
    })
    .catch((err) => {
      console.log("++++++ERROR ADMINS+++++");
      console.log(err);
      res.status(500).json(err);
    });
});

//GET route for a single admin with respective Articles
router.get("/api/admin/:id", function (req, res) {
  db.Admin.findOne({
    where: {
      id: req.params.id,
    },
    include: [db.Article],
  }).then((admin) => {
    console.log("========this is a specific admin======");
    res.json(admin);
  });
});

//POST/create admin
router.post("/api/newadmin", function (req, res) {
  db.Admin.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((newAdmin) => {
      res.json(newAdmin);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//PUT/update admin
router.put("/api/admin/:id", function (req, res) {
  db.Admin.update(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    {
      where: {
        id: req.params.id,
      },
      //gets all admin's associated articles
      include: [db.Article],
    }
  )
    .then((updateAdmin) => {
      if (updateAdmin[0] === 0) {
        res.status(404).json(updateAdmin);
      } else {
        console.log(updateAdmin);
        res.json(updateAdmin);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//DELETE an admin
router.delete("/api/admin/:id", function (req, res) {
  db.Admin.destroy({
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
