import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const cookieToken = req.cookies["token_user"];
    const authHeader = req.headers["authorization"];
    let authHeadertoken;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      authHeadertoken = authHeader.split(" ")[1];
    }
    if (!cookieToken && !(authHeader && authHeader.startsWith("Bearer "))) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const token = cookieToken || authHeadertoken;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.email = decoded.email;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Internal server error" });
  }
};

export default protectRoute;
