const express = require("express");
const router = express.Router();
const catwaysRoutes = require("./catways");
const userRoutes = require("./user");

router.use("/catways/", catwaysRoutes);
router.use("/user/", userRoutes);

module.exports = router;
