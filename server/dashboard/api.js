const router = require("express").Router(),
  util = require("../common/util.js");

router.route("/dashboard")
  .get(function (request, response) {
    response.json(util.json("/dashboard/data/sichuan.json"));
  });
  router.route("/approval/projects")
  .get(function (request, response) {
    response.json(util.json("/dashboard/data/approval_projects.json"));
  });
  router.route("/ranking/department_accepts")
  .get(function (request, response) {
    response.json(util.json("/dashboard/data/ranking_department_accepts.json"));
  });

module.exports = router;