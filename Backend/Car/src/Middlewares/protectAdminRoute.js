import jwt from "jsonwebtoken";
import env from "../Env/env.js";

const protectAdminRoute = async (req, res, next) => {
  try {
    const cookieToken = req.cookies["token_admin"];
    const authHeader = req.headers["authorization"];
    let authHeadertoken;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      authHeadertoken = authHeader.split(" ")[1];
    }
    if (!cookieToken && !(authHeader && authHeader.startsWith("Bearer "))) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const token = cookieToken || authHeadertoken;

    const decoded = jwt.verify(token, env.JWT_ADMIN_SECRET);

    req.adminEmail = decoded.email;
    req.adminId = decoded.id;
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

export default protectAdminRoute;
