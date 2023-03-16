const jwt = require("../services/JwtService");

module.exports = async function (req, res, next) {
  if (req.method === "OPTIONS") next();
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.error(400, { friendlyMsg: "1Author not registered" });
    }

    const token = authorization.split(" ")[1];
    if (!token) { 
      return res.error(400, { friendlyMsg: "2Author not registered" });
    }

    [err, decodeData] = await to(jwt.verifyAccess(token));

    if (err) {
      return res.error(400, { friendlyMsg: err.message });
    }
    req.author = decodeData; // shuni surashim kere nima qilayotganini?
    return next();
  } catch (error) {
    return res.error(400, { friendlyMsg: "3Author not registered" });
  }
};

async function to(promice) {
  return promice.then((res) => [null, res]).catch((error) => [error]);
}
