import { handleOTPVerification } from "./HandleOTPVerification.js";
import { handleRental } from "./HandleRental.js";

const startBackGroundJobs = async () => {
  await handleOTPVerification();
  await handleRental();
};

export default startBackGroundJobs;
