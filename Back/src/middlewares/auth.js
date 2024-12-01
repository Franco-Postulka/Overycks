const jwt = require("jsonwebtoken");

const authenticationToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Sin token, autorizacion denegada" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "el token no es valido", error: err });
  }
};

module.exports = { authenticationToken };
