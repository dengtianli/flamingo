const router = require("express").Router(),
  util = require("../common/util.js");

router.route("/dashboard")
  .get(function (request, response) {
    response.json(util.json("/dashboard/sichuan.json"));
  });

module.exports = router;