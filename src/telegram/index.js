/* eslint-disable import/prefer-default-export */
import { OTP } from '../db';


export const sendOTP = async (userId) => {
  try {
    const otp = new OTP({ userId });
    await otp.save();

    console.log(otp.code);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
