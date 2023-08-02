const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');

const JWT_SECRET = 'df740be8e1dd975abfe3aee5fecab33b700a4c3da01e44ba135240a0cccb1ac5';

const handleAuthError = (res) => {
  res.status(401).send({ message: 'Необходима авторизация' });
};

const extractBearerToken = (header) => {
  header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  //if (!authorization || !authorization.startsWith('Bearer ')) {
  //  return handleAuthError(res);
 // }
  //const token = extractBearerToken(authorization);
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    handleAuthError(res);
  }
  req.user = payload;
  return next();
};
