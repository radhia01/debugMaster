const express = require("express");
const {} = require("../controller/problem.controller");
const { addTag, getTags } = require("../controller/tag.controller");
const { verifyToken } = require("../utils/verifyToken");
const { verify } = require("jsonwebtoken");
const router = express.Router();
// ADD new tag
router.post("/api/tags/:idprobleme", verifyToken, addTag);
// get all tags
router.get("/api/tags", verifyToken, getTags);

module.exports = router;
