import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { closeRabbitMq } from "./src/Services/Mq/rabbitMq.js";
import startServer from "./src/Services/StartServer.js";

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

app.use("/", authRouter);

startServer(app);

process.on("SIGINT", async () => {
  console.log("Shutting down the server...");
  await closeRabbitMq();
  process.exit(0);
});
