import jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    console.error("Token verification failed:", e.name, e.message);
    
    if (e.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token has expired" });
    } else if (e.name === 'JsonWebTokenError' || e.name === 'NotBeforeError') {
      return res
        .status(403)
        .json({ message: "Forbidden: Invalid token or signature" });
    } else {
      return res
        .status(500)
        .json({ error: "Internal Server error during token processing" });
    }
  }
};

export { validateToken };