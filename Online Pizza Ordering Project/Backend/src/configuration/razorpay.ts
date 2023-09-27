import Razorpay from "razorpay";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID as string,
  key_secret: process.env.RAZOR_KEY_SECRECT as string
});

export default razorpayInstance;
