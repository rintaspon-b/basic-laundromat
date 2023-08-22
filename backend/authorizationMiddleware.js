const jwt = require("jsonwebtoken");
const config = require("./config");

function authorize(req, res, next) {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Authorization failed" });
    }
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      config.authorizer.secret
    ); // Verify jwt
    // console.log("authorized success: " + decoded.user.id);
    next();
  } catch (err) {
    return res.status(401).json({ message: err });
  }
}

module.exports = authorize;
