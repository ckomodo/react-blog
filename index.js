// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
// app.use(express.static("public"));

// Routes
// =============================================================
// require("./routes/api-routes.js")(app);

app.get("/", function (req, res) {
  res.send("blog is coming soon");
});

//USER ROUTES

//GET/read all users
app.get("/api/users", function (req, res) {
  db.User.findAll().then((users) => {
    res.json(users);
  });
});

//GET route for one user and respective comments
app.get("/api/user/:id", function (req, res) {
  db.User.findOne({
    where: {
      id: req.params.id,
    },
    include: [db.Comment]
  }).then(user => {
    console.log("+++++++this is a specific user+++++++++");
    res.json(user);
  });
});



//POST/create users
app.post("/api/newuser", function (req, res) {
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
app.put("/api/users/:id", function (req, res) {
  db.User.update(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    {
      where: {
        id: req.params.id,
      }
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

//DELETE a user
app.delete("/api/user/:id", function (req, res) {
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

//ADMIN ROUTES

//GET/read all Admins
app.get("/api/admin", function (req, res) {
  console.log("++++++FIND ADMINS+++++");
  db.Admin.findAll()
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
app.get("/api/admin/:id", function (req, res) {
  db.Admin.findOne({
    where: {
      id: req.params.id,
    },
    include: [db.Article]
  }).then(admin => {
    console.log("========this is a specific admin======");
    res.json(admin);
  });
});

//POST/create admin
app.post("/api/newadmin", function (req, res) {
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
app.put("/api/admin/:id", function (req, res) {
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
      include: [db.Article]
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
app.delete("/api/admin/:id", function (req, res) {
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

//ARTICLE ROUTES

//GET/read all Articles
app.get("/api/articles", function (req, res) {
  db.Article.findAll().then((article) => {
    res.json(article);
  });
});



app.get("/api/articles/:id", function (req, res){
  db.Article.findOne({
    where: {
      id: req.params.id
    },
    include:[db.Admin]
  }).then(article=>{
    res.json(article)
  });
});

//POST/create articles
app.post("/api/newarticle", function (req, res) {
  db.Article.create({
    title: req.body.title,
    article: req.body.article,
    AdminId: req.body.AdminId
  })
    .then((newArticle) => {
      res.json(newArticle);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//PUT/update Article
app.put("/api/article/:id", function (req, res) {
  db.Article.update(
    {
      title: req.body.title,
      article: req.body.article,
      AdminId: req.body.AdminId
    },
    {
      where: {
        id: req.params.id,
      }
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
app.delete("/api/article/:id", function (req, res) {
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

//COMMENT ROUTES

//GET/read all Comments
app.get("/api/comments", function (req, res) {
  db.Comment.findAll().then((article) => {
    res.json(article);
  });
});


//GET route for a single comment with respective Users
app.get("/api/comment/:id", function (req, res) {
  db.Comment.findOne({
    where: {
      id: req.params.id,
    },
    include: [db.User]
  }).then(comment => {
    console.log("========this is a specific comment======");
    res.json(comment);
  });
});

//POST/create comments
app.post("/api/newcomment", function (req, res) {
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
app.put("/api/comment/:id", function (req, res) {
  db.Comment.update(
    {
      comment: req.body.comment,
      rating: req.body.rating,
    },
    {
      where: {
        id: req.params.id,
      }
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
app.delete("/api/comment/:id", function (req, res) {
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

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
