import { handleOTPVerification } from "./MQ/HandleOTPVerification.js";
import { rentcarBooking } from "./MQ/RentcarBooking.js";

const startBackGroundJobs = async () => {
  try {
    await handleOTPVerification();
    await rentcarBooking();
  } catch (error) {
    console.error("Error starting background jobs:", error.message);
  }
};

export default startBackGroundJobs;
