const express = require("express");
const router = express.Router();
db = require("../models");

router.get("/", function (req, res) {
  res.send("blog is coming soon");
});

module.exports = router;
