import mongoose from 'mongoose';

export const connectDb = async (): Promise<void> => {
  const mongoUri: string = process.env.MONGO_CONNECTION_URI || '';
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB server...');
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('Failed to connect to the MongoDB server!!!\n[ERROR]', err.message);
      process.exit(1);
    }
  }
}
