const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
//added to check id of logged in admin 
// const mainAdminName = "sakwa";
// const password = "password";
// const mainAdmin = {
//   username: mainAdminName,
//   password: password,
// };

//validation for protected routes
function checkAuthStatus(request) {
  if (!request.headers.authorization) {
    return false;
  }
  const token = request.headers.authorization.split(" ")[1];
  const loggedInAdmin = jwt.verify(token, "mySecretString", (err, data) => {
    if (err) {
      return false;
    } else {
      return data;
    }
  });
  console.log(loggedInAdmin);
  return loggedInAdmin;
}

//checking ID of logged in Admin
// function checkAdminStatus(request) {
//   if (
//     request.headers.authorization ===
//     {
//       username: mainAdminName,
//       password: password,
//     }
//   ) {
//     const token = request.headers.authorization.split(" ")[1];
//     const adminOne = jwt.verify(token, "mySecretString", (err, data) => {
//       if (err) {
//         return false;
//       } else {
//         return data;
//       }
//     });
    
//     console.log("############", adminOne, "############");
//     return adminOne;
//   }
//    {
//     ("contact main admin");
//   } 
// }

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

//POST route to log in Admin
router.post("/admin/login", (req, res) => {
  db.Admin.findOne({
    where: {
      email: req.body.email,
      username: req.body.username,
    },
  }).then((foundAdmin) => {
    if (!foundAdmin) {
      res.status(404).send("wrong email and/or password");
    }
    //compares password entered to password in database
    if (bcrypt.compareSync(req.body.password, foundAdmin.password)) {
      const adminToken = {
        //attaches username, email and id of logged in user to the token
        username: foundAdmin.username,
        email: foundAdmin.email,
        id: foundAdmin.id,
      };

      //jwt.sign() in-built method uses info from userToken + a secret string + optional time duration. Creates a Token stored in local storage
      const token = jwt.sign(adminToken, "mySecretString", { expiresIn: "2h" });

      return res.status(200).send({ token: token });
    } else {
      return res.status(403).send("wrong password");
    }
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
  // const adminOne = checkAdminStatus(req);
  // if (!adminOne) {
  //   return res.status(401).send("Contact Main Admin to be added as an admin");
  // }

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

//GET route for profile of logged in admin
router.get("/adminprofile", function (req, res) {
  const loggedInAdmin = checkAuthStatus(req);
  console.log(loggedInAdmin);
  if (!loggedInAdmin) {
    return res.status(401).send("only logged in admins can view this page");
  }
  // res.status(200).send("valid token");
  db.Admin.findOne({
    where: {
      id: loggedInAdmin.id
      },
      include: [db.Article]
  }).then(dbAdmin =>{

    res.json(dbAdmin)
  }).catch(err => {
    console.log(err);
    res.status(500).send("error occurred")
  })
});

module.exports = router;
