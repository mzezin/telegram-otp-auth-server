/* eslint-disable import/prefer-default-export */
/* eslint-disable func-names */
import { Schema, model } from 'mongoose';

const generateOTP = () => Array(...Array(6))
  .map(() => Math.floor(Math.random() * 10))
  .join('');


const OTPSchema = new Schema({
  userId: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    default: true,
    set: () => generateOTP(),
  },
  expiration: {
    type: Date,
    default: true,
    set: () => Date.now() + 120000,
  },
});

export const OTP = model('OTP', OTPSchema);
