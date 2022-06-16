import mongoose from 'mongoose';

const connectDB = (client: typeof mongoose) => {
  client.connect(process.env.MONGO_URI as string);
  return client;
};

export default connectDB;
