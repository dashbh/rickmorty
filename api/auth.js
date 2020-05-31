const jwt = require("jsonwebtoken");
const privateKey = 'iwuew6WER';

const auth = function(req, res, next) {
  const token = req.header("Authorization");

  try {
    const authorized = jwt.verify(token, privateKey);
    req.user = authorized.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Not Authenticated !!" });
  }
};

module.exports = auth;