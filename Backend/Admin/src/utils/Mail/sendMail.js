import nodemailer from "nodemailer";
import env from "../../Env/env.js";

const sendMail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.MAIL_USERNAME,
        pass: env.MAIL_PASSWORD,
      },
      debug: true,
    });

    const mailOptions = {
      from: env.MAIL_USERNAME,
      to: email,
      subject: "Verification Code",
      text: `The Verification code for Admin is ${otp}`,
      html: `<h1>The Verification code is ${otp}</h1>
             <p>Please do not share this code with anyone</p>
             <p>It will expire in 5 mins</p>`,
    };
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return console.log(error);
      }
    });
  } catch (error) {
    console.log("SendMail Error: ", error);
    throw new Error("Error Sending Mail");
  }
};

export default sendMail;
