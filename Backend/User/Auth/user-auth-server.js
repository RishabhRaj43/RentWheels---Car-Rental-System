import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import rabbitMQService from "./src/Services/Mq/rabbitMq.js";
import startServer from "./src/Services/StartServer.js";
import applyRoutes from "./src/Routes/index.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:8012",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/src/uploads", express.static(path.join(__dirname, "src", "uploads")));

applyRoutes(app);

startServer(app);

process.on("SIGINT", async () => {
  console.log("Shutting down the server...");
  await rabbitMQService.close();
  process.exit(0);
});
