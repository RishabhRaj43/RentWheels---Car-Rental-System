import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const cookieToken = req.cookies["token_user"];
    const authHeader = req.headers["authorization"];
    let authHeadertoken;

    if (!cookieToken && !authHeader) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (authHeader && authHeader.startsWith("Bearer ")) {
      authHeadertoken = authHeader.split(" ")[1];
    }
    if (!cookieToken && !(authHeader && authHeader.startsWith("Bearer "))) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const token = cookieToken || authHeadertoken;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userEmail = decoded.email;
    req.userId = decoded.id;
    req.token = token;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware: ", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Please login again" });
    }
    return res.status(401).json({ message: "Internal server error" });
  }
};

export default protectRoute;
