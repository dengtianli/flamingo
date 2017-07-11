const router = require("express").Router(),
  util = require("../common/util.js");

  router.route("/analysis/app_projects/status_proportion")
  .get(function (request, response) {
    response.json(util.json("/analysis.case/data/analysis_app_projects_status_proportion.json"));
  });
  router.route("/analysis/app_projects/property_proportion")
  .get(function (request, response) {
    response.json(util.json("/analysis.case/data/analysis_app_projects_property_proportion.json"));
  });
  router.route("/analysis/app_projects/timelimit_proportion")
  .get(function (request, response) {
    response.json(util.json("/analysis.case/data/analysis_app_projects_timelimit_proportion.json"));
  });
  router.route("/analysis/app_projects/nature_proportion")
  .get(function (request, response) {
    response.json(util.json("/analysis.case/data/analysis_app_projects_nature_proportion.json"));
  });
   router.route("/analysis/app_projects/power_proportion")
  .get(function (request, response) {
    response.json(util.json("/analysis.case/data/analysis_app_projects_power_proportion.json"));
  });
 


module.exports = router;