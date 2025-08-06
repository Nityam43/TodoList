const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

exports.protect = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized User" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.id).select(
      "_id username email"
    );
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
