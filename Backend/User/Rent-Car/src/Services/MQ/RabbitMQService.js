import ampqlib from "amqplib";
import env from "../../Config/Env/env.js";

class RabbitMQService {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    if (!this.connection) {
      try {
        this.connection = await ampqlib.connect(env.RABBITMQ_URL);
        console.log("Connected to RabbitMQ");

        this.connection.on("close", () => {
          console.log("RabbitMQ connection closed");
          this.connection = null;
          this.channel = null;
        });

        this.connection.on("error", (err) => {
          console.error("RabbitMQ connection error:", err.message);
        });
      } catch (error) {
        console.error("Error connecting to RabbitMQ:", error.message);
        throw new Error("Error connecting to RabbitMQ");
      }
    }
  }

  async getChannel() {
    if (!this.channel) {
      await this.connect();
      try {
        this.channel = await this.connection.createChannel();
        console.log("Channel created");
      } catch (error) {
        console.error("Error creating channel:", error.message);
        throw new Error("Error creating channel");
      }
    }
    return this.channel;
  }

  async close() {
    try {
      if (this.channel) {
        await this.channel.close();
        console.log("Channel closed");
      }
      if (this.connection) {
        await this.connection.close();
        console.log("Closed connection to RabbitMQ");
      }
      this.channel = null;
      this.connection = null;
    } catch (error) {
      console.error("Error closing connection to RabbitMQ:", error.message);
    }
  }
}

const rabbitMQService = new RabbitMQService();
export default rabbitMQService;
