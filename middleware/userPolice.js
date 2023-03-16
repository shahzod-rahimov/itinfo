const jwt = require("../services/JwtService");

module.exports = async function (req, res, next) {
  if (req.method === "OPTIONS") next();
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.error(400, { friendlyMsg: "User not registered" });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return res.error(400, { friendlyMsg: "User not registered" });
    }

    [err, decodeData] = await to(jwt.verifyAccess(token));

    if (err) {
      return res.error(400, { friendlyMsg: err.message });
    }
    req.user = decodeData;
    return next();
  } catch (error) {
    return res.error(400, { friendlyMsg: "User not registered" });
  }
};

async function to(promice) {
  return promice.then((res) => [null, res]).catch((error) => [error]);
}
