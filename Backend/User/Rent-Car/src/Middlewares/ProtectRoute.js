import jwt from "jsonwebtoken";
import env from "../Config/Env/env.js";
import { verifyToken } from "../Utils/checkRoles.js";

const roleBasedProtect = (roleArray) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      let authHeadertoken = null;

      if (authHeader && authHeader.startsWith("Bearer ")) {
        authHeadertoken = authHeader.split(" ")[1];
      }

      if (!(authHeader && authHeader.startsWith("Bearer "))) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const token = authHeadertoken;

      const role = jwt.decode(token).role;

      if (!roleArray.includes(role)) {
        return res.status(401).json({ message: "You are not authorized" });
      }

      const secret = env.ROLE_SECRET[role];

      const { verified, decoded } = verifyToken(token, secret);
      if (!verified) return res.status(401).json({ message: "Invalid token" });

      req.email = decoded.email;
      req.role = decoded.role;
      req.id = decoded.id;

      req.token = token;
      next();
    } catch (error) {
      console.error("Error in roleBasedProtect middleware: ", error);
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: "Invalid token" });
      }

      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: "Please login again" });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};

export default roleBasedProtect;
