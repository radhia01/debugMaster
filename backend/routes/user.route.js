const express = require("express");
const router = express.Router();
const { verifyToken } =require ("../utils/verifyToken");
const {
  getUsers,
  addUser,
  login,
  updateUser,
  updatePassword,
  getPostedProblemsByUser,
} = require("../controller/user.controller");
const { getProblemTags } = require("../controller/problem.controller");
// route to get all users
router.get("/api/users", verifyToken, getUsers);
// add user (register)
router.post("/api/users", addUser);
// login
router.post("/api/login", login);
// route to update user
router.put("/api/users/:id", verifyToken, updateUser);
// route to update user password
router.put("/api/users/update/password/:id", verifyToken, updatePassword);
// route to get all posted problem by the user
router.get("/api/problems/users/:id", verifyToken, getPostedProblemsByUser);
module.exports = router;
