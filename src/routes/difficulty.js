const { Router } = require("express");

const { getDifficulty } = require("../controllers/difficulty");

const router = Router();

router.get("/", getDifficulty);

module.exports = router;