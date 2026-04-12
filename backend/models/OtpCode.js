import mongoose from "mongoose";

const otpCodeSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, required: true, index: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

const OtpCode = mongoose.model("OtpCode", otpCodeSchema);
export default OtpCode;
