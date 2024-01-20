const { Router } = require("express");

const router = Router();

const { getCategory } = require("../controllers/category");

router.get("/", getCategory);

module.exports = router;
