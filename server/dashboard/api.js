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
   router.route("/ranking/region_accepts")
  .get(function (request, response) {
    response.json(util.json("/dashboard/data/ranking_region_accepts.json"));
  });
  router.route("/ranking/hort_projects")
  .get(function (request, response) {
    response.json(util.json("/dashboard/data/ranking_hort_projects.json"));
  });
  router.route("/sichuan_region/department_accepts")
  .get(function (request, response) {
    response.json(util.json("/dashboard/data/sichuan_region_depatrment_accepts.json"));
  });
   router.route("/departments_manage_items")
  .get(function (request, response) {
    response.json(util.json("/dashboard/data/departments_manage_items.json"));
  });

module.exports = router;