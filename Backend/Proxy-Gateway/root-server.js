import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import proxy from "express-http-proxy";

const app = express();
dotenv.config();

app.use(cors());

app.use("/api/user", proxy(process.env.USER_PORT));
app.use("/api/admin", proxy(process.env.ADMIN_PORT));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
