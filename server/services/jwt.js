const jwt = require("jwt-simple");
const moment = require("moment");
const SECRET_KEY = "aS789Ch09645sA989T";

function createAccessToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    createToken: moment().unix(),
    expires: moment().add(3, "hours").unix(),
  };
  return jwt.encode(payload, SECRET_KEY);
}

function createRefreshToken(user) {
  const payload = {
    id: user.id,
    expires: moment().add(30, "days").unix(),
  };
  return jwt.encode(payload, SECRET_KEY);
}

function decodedToken(token) {
  return jwt.decode(token, SECRET_KEY, true);
}
module.exports = {
  createAccessToken,
  createRefreshToken,
  decodedToken,
};
