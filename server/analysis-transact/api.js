const router = require("express").Router(),
  util = require("../common/util.js");

  router.route("/analysis/projects/projects_apply")
  .get(function (request, response) {
    response.json(util.json("/analysis-transact/data/analysis_projects_projects_apply.json"));
  });

module.exports = router;