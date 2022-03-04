import mongoose from 'mongoose';

export const connectDb = async (): Promise<void> => {
  const mongoUri: string = process.env.MONGO_CONNECTION_URI || '';
  await mongoose.connect(mongoUri)
    .then(res => console.log('Connected to MongoDB server...'))
    .catch((err: Error) => console.log('Failed to connect to the MongoDB server!!! Error:', err.message));
}
