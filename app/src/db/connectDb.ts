import mongoose from 'mongoose';

export async function connectDb(url: string) {
  try {
    const l = await mongoose.connect('mongodb://localhost:27017/test');
    // eslint-disable-next-line no-console
    console.log(l);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}
