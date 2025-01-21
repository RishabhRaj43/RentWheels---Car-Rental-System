import app from "./src/App/app.js";
import connectDB from "./src/Config/dbConfig.js";
import rabbitMQService from "./src/Services/RabbitMQService.js";
import env from "./src/Env/env.js";
import { startBackgroundJobs } from "./src/Handler/StartBackgroundJobs.js";

const startServer = async () => {
  try {
    await connectDB();
    await rabbitMQService.connect();
    await startBackgroundJobs();

    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
    process.exit(1);
  }
};

startServer();
