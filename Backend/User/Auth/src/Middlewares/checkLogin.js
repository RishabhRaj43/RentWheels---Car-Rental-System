const checkUserLoggedIn = (req, res, next) => {
  const token = req.cookies.token_user;
  if (token) {
    return res.status(401).json({ message: "User already logged in" });
  }
  next();
};

export default checkUserLoggedIn;
