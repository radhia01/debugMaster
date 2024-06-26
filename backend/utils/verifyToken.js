const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  const data = req.headers.authorization;
  if (!data) {
    return res.status(401).json({ error: "unauthorized" });
  }
  const token = data.split(" ")[1];
  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "unauthorized" });
  }
};
