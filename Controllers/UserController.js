const express = require("express");
const db = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//GET/read all users
router.get("/api/users", function (req, res) {
  db.User.findAll().then((users) => {
    res.json(users);
  });
});

//POST route to log in user
router.post("/user/login", (req, res) => {
  db.User.findOne({
    where: {
      email: req.body.email,
      username: req.body.username,
    },
  }).then((foundUser) => {
    if (!foundUser) {
      res.status(404).send("wrong email and/or password");
    }
    //compares password entered to password in database
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      const userToken = {
        username: foundUser.username,
        email: foundUser.email,
      };

      //jwt.sign() in-built method uses info from userToken + a secret string + optional time duration. Creates a Token stored in local storage
      const token = jwt.sign(userToken, "mySecretString", {
        expiresIn: "0.5h",
      });

      return res.status(200).send({ token: token });
    } else {
      return res.status(403).send("wrong password");
    }
  });
});

//GET route for one user and respective comments
router.get("/api/user/:id", function (req, res) {
  db.User.findOne({
    where: {
      id: req.params.id,
    },
    include: [db.Comment],
  }).then((user) => {
    console.log("+++++++this is a specific user+++++++++");
    res.json(user);
  });
});

//POST/create users
router.post("/api/newuser", function (req, res) {
  db.User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((newUser) => {
      res.json(newUser);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//PUT/update a user
router.put("/api/users/:id", function (req, res) {
  db.User.update(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updateUser) => {
      if (updateUser[0] === 0) {
        res.status(404).json(updateUser);
      } else {
        console.log(updateUser);
        res.json(updateUser);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// //GET route for profile of logged in user
// router.get("/userprofile", function (req, res) {
//   const loggedInUser = checkAuthStatus(req);
//   console.log(loggedInUser);
//   if (!loggedInUser) {
//     return res.status(401).send("only logged in Users can view this page");
//   }
//   // res.status(200).send("valid token");
//   db.User.findOne({
//     where: {
//       id: loggedInUser.id
//       },
//       include: [db.Article]
//   }).then(dbUser =>{

//     res.json(dbUser)
//   }).catch(err => {
//     console.log(err);
//     res.status(500).send("error occurred")
//   })
// });



//DELETE a user
router.delete("/api/user/:id", function (req, res) {
  db.User.destroy({
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
