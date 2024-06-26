const express = require("express");
const { createSolution } = require("../controller/solution.controller");
const router = express.Router();
const { verifyToken } = require("../utils/verifyToken");
// Route to add  new solution
router.post(
  "/api/solutions/problems/:id_problem/users/:id_user",
  verifyToken,
  createSolution
);

module.exports = router;
