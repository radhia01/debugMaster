const pool = require("../config/db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// create new user
exports.addUser = async (req, res) => {
  try {
    const { username, user_email, user_password } = req.body;
    // verify if user already exist
    const userFound = await pool.query(
      "SELECT * FROM  userDBMASTER where user_email =$1 ",
      [user_email]
    );
    if (userFound.rowCount !== 0) {
      return res.status(409).json({ message: "User already exist" });
    }
    // hash password
    if (user_password.length < 8) {
      return res.status(400).json({
        message: "Password must contain al least 8 caracters ",
      });
    }
    const hashedPassword = await bcryptjs.hash(user_password, 10);

    await pool.query(
      "INSERT INTO  userDBMASTER (username,user_email,user_password ) values($1,$2,$3)",
      [username, user_email, hashedPassword]
    );
    const newUser = await pool.query(
      "SELECT  * FROM   userDBMASTER where user_email=$1",
      [user_email]
    );
    return res.status(200).json({
      message: "User successfully created ",
      success: true,
      data: newUser.rows[0],
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Sever error", ms: error.message });
  }
};
// login
exports.login = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    // check if user exist
    const user = await pool.query(
      "SELECT *  from  userDBMASTER where user_email=$1 ",
      [user_email]
    );
    if (user.rowCount === 0) {
      return res.status(404).json({ message: "User Not Found " });
    }

    const comparePasswords = await bcryptjs.compare(
      user_password,
      user.rows[0].user_password
    );
    if (!comparePasswords) {
      return res.status(401).json({ message: "Password Incorrect" });
    }
    if (user && comparePasswords) {
      // generate token
      const token = jwt.sign({ id: user.rows[0]._id }, process.env.JWT_SECRET);
      return res
        .status(200)
        .json({ success: true, token: token, data: user.rows[0] });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Erreur de serveur", err: error.message });
  }
};
// get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await pool.query("SELECT *  from userDBMASTER");
    const today = new Date();
    console.group(today);
    return res.status(200).json({ data: users.rows });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", ms: error.message });
  }
};

// update user profile
exports.updateUser = async (req, res) => {
  try {
    const { username, user_email } = req.body;
    const { id } = req.params;
    const updatedUser = await pool.query(
      "UPDATE userDBMASTER set username=$1, user_email =$2 where id=$3 returning *",
      [username, user_email, id]
    );
    return res.status(200).json({
      message: "User has been updated successfully",
      data: updatedUser.rows[0],
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
// update password
exports.updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword, confirmedNewPassword } = req.body;
    console.log(req.body);
    if (newPassword === confirmedNewPassword) {
      const updatedPassword = await bcryptjs.hash(newPassword, 10);
      if (updatedPassword) {
        const updatedUser = await pool.query(
          "UPDATE userDBMASTER set  user_password =$1 where id=$2 returning *",
          [updatedPassword, id]
        );
        return res.status(200).json({
          message: "Your password has been updated successfully",
          data: updatedUser.rows[0],
        });
      } else {
        res.status(400).json({ message: "Failed to hash the new password" });
      }
    } else {
      res.status(400).json({ message: "Passwords are not similar " });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", err: error.message });
  }
};
// get posted problems by user
exports.getPostedProblemsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const postedProblems = await pool.query(
      "SELECT * FROM  problemstDBMASTER where  problemstDBMASTER.id_user = $1 ",
      [id]
    );
    return res.status(200).json({ data: postedProblems.rows });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", err: error.message });
  }
};
