import { handleOTPVerification } from "./HandleOTPVerification.js";

export const startBackgroundJobs = async () => {
  try {
    await handleOTPVerification();
  } catch (error) {
    console.error("Error starting background jobs:", error);
  }
};
