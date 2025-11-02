import jwt from "jsonwebtoken";
const validateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to the request
    req.user = decoded;
    next();
  } catch (e) {
    if (e.message === ERRORS.JWT.INVALID_OR_EXPIRED) {
      return res.status(403).json({ error: e.message });
    }
    if (e.message === ERRORS.JWT.SECRET_NOT_DEFINED) {
      return res.status(500).json({ error: "Internal Server error" });
    }
  }
};

export { validateToken };
