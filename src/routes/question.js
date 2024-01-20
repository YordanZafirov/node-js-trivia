const { Router } = require("express");
const { getQuestion } = require("../controllers/question");

const router = Router();

router.get("/", getQuestion);

module.exports = router;