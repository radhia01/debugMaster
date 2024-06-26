const express = require("express");
const {
  createProblem,
  getProblems,
  deleteProblem,
  updateProblem,
  getProblemTags,
  getProblem,
  getProblemsByTag,
} = require("../controller/problem.controller");
const { verifyToken } = require("../utils/verifyToken");
const router = express.Router();

// Route to create a new problem
router.post("/api/problems/users/:idUser", verifyToken, createProblem);

// Route to get all problems
router.get("/api/problems", verifyToken, getProblems);

// Route to delete a problem
router.delete("/api/problems/:id", verifyToken, deleteProblem);

// Route to update a problem
router.put("/api/problems/:id", verifyToken, updateProblem);

// Route to get all tags associated with a problem
router.get("/api/tags/problem/:id_problem", verifyToken, getProblemTags);

// Route to get details of a specific problem
router.get("/api/problems/details/:id", verifyToken, getProblem);

// Route to get problems associated with a specific tag
router.get("/api/problems/tag/:id", verifyToken, getProblemsByTag);

module.exports = router;
