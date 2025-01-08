import app from "./src/App/app.js";
import { connectMongoDb } from "./src/Config/MongoDbConnect.js";
import { connectRabbitMq } from "./src/Config/RabbitMq.js";
import env from "./src/Env/env.js";

app.listen(env.PORT, async () => {
  await connectRabbitMq();
  
  await connectMongoDb();
  console.log(`Server is running on port ${env.PORT}`);
});
