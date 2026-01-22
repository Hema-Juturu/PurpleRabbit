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
    
    let statusCode = 500;
    let message = "Internal Server error during token processing";
    
    if (e.name === 'TokenExpiredError') {
      statusCode = 401;
      message = "Unauthorized: Token has expired. Please log in again.";
      
      res.setHeader('X-Token-Invalid', 'expired'); 
      
    } else if (e.name === 'JsonWebTokenError' || e.name === 'NotBeforeError') {
      statusCode = 403;
      message = "Forbidden: Invalid token or signature.";
      
      res.setHeader('X-Token-Invalid', 'invalid'); 
    } 

    return res
      .status(statusCode)
      .json({ message: message });
  }
};

export { validateToken };