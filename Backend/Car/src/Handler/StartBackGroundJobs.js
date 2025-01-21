import { rentCarBooking } from "./Mq/RentCarBooking.js";

const startBackGroundJobs = async () => {
  try {
    await rentCarBooking();
    console.log("Background jobs started");
  } catch (error) {
    console.error("Error starting background jobs:", error.message);
  }
};

export default startBackGroundJobs;
