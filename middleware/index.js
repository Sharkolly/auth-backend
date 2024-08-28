const jwt = require("jsonwebtoken");
const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) res.json({ err: "Error Found"});
  try {
    jwt.verify(token, process.env.JWTSECRETKEY, (err, user) => {
      // if (err) res.json({ error: `${err.name}: ${err.message}` });
      if (err) throw new Error(`${error}: ${err.name}: ${err.message}`);
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err.message);
  };
};
module.exports = authenticateToken;