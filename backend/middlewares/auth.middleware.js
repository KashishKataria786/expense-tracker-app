import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // lowercase
  console.log(authHeader);
  const token = authHeader  // extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Please login to access content" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
