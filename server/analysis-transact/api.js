const router = require("express").Router(),
  util = require("../common/util.js");

  router.route("/analysis/projects/projects_apply")
  .get(function (request, response) {
    response.json(util.json("/analysis-transact/data/analysis_projects_projects_apply.json"));
  });
  router.route("/analysis/projects/projects_accept")
  .get(function (request, response) {
    response.json(util.json("/analysis-transact/data/analysis_projects_projects_accept.json"));
  });
  router.route("/analysis/projects/projects_finish")
  .get(function (request, response) {
    response.json(util.json("/analysis-transact/data/analysis_projects_projects_finish.json"));
  });
   router.route("/analysis/projects/gsc_organs")
  .get(function (request, response) {
    response.json(util.json("/analysis-transact/data/analysis_projects_gsc_organs.json"));
  });
   router.route("/analysis/projects/projects_appraiseResult")
  .get(function (request, response) {
    response.json(util.json("/analysis-transact/data/analysis_projects_appraiseResult.json"));
  });
   router.route("/analysis/projects/efficiency_analysis")
  .get(function (request, response) {
    response.json(util.json("/analysis-transact/data/analysis_projects_efficiency_analysis.json"));
  });


module.exports = router;