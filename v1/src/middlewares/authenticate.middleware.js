const httpStatus = require("http-status");
const JWT = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    return res.status(httpStatus.UNAUTHORIZED).send({ message: "İşlemi yapmak için giriş yapın", success: false });
  }

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(httpStatus.FORBIDDEN).send({ message: "Lütfen oturum açın!", success: false });
    }

    req.user_id = user.user_id;
    req.isAdmin = user.isAdmin;

    next();
  });
};

module.exports = authenticateToken;
