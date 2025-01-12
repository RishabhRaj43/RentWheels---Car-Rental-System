import app from "./src/App/app.js";
import connectDB from "./src/Config/dbConfig.js";
import env from "./src/Env/env.js";

const startServer = async () => {
  try {
    await connectDB();
    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
