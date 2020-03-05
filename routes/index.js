const express = require("express");
const router = express.Router();
const apiRoutes = require("./apiRoutes");
const htmlRoutes = require("./htmlRoutes");

router.use("/", htmlRoutes);
router.use("/api", apiRoutes);

module.exports = router;


