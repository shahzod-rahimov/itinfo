const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method == "OPTIONS") {
      next();
    }
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        return res.status(403).json({ message: "Author not registered" });
      }
      const token = authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "Author ro'yhatdan o'tmagan" });
      }
      const { is_expert, authorRoles } = jwt.verify(
        token,
        config.get("secret")
      );

      let hasRole = false;
      authorRoles.forEach((authorRole) => {
        if (roles.includes(authorRole)) {
          hasRole = true;
        }
      });
      if (!is_expert || !hasRole) {
        return res.status(403).json({ message: "Sizga ruhsat etilmagan" });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "Avtor ro'yhatdan o'tmagan" });
    }
  };
};
