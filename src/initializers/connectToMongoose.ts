import mongoose, { Mongoose } from 'mongoose';

/**
 * @param {string} url
 * @returns Promise<Mongoose>
 */
export const connectToMongoose = (url: string) => {
  return mongoose.connect(url);
};
