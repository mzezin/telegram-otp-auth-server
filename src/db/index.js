import mongoose from 'mongoose';

export * from './User.model';
export * from './OTP.model';


export const dbInit = async () => {
  mongoose.Promise = Promise;

  const mongoOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };

  mongoose.set('debug', true);
  mongoose.set('useCreateIndex', true);

  await mongoose.connect('mongodb://localhost/test', mongoOptions);
  console.log('MongoDB connected');
};
