import { handleOTPVerification } from "./HandleOTPVerification.js";

const startBackGroundJobs = async () => {
  await handleOTPVerification();
};

export default startBackGroundJobs;
