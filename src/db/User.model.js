/* eslint-disable import/prefer-default-export */
/* eslint-disable func-names */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  id: {
    type: Number,
    required: 'Id is mandatory field',
    unique: 'Id is already used',
  },
  displayName: String,
  username: {
    type: String,
    required: 'Username is mandatory field',
    unique: 'Username is already used',
  },
  password: String,
}, {
  timestamps: true,
});

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  return next();
});

export const User = model('User', userSchema);
