module.exports = app => {
  const szotar = require("../controllers/szavak.controller.js");

  var router = require("express").Router();

  router.post("/", szotar.create);

  router.get("/", szotar.findAll);

  router.get("/published", szotar.findAllPublished);

  router.get("/:id", szotar.findOne);

  router.put("/:id", szotar.update);

  router.delete("/:id", szotar.delete);

  router.delete("/", szotar.deleteAll);

  app.use("/api/szotar", router);
};
