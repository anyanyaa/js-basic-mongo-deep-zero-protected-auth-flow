import mongoose from 'mongoose';

//создаем модель монго

export const User = mongoose.model('User', {
  _id: mongoose.Types.ObjectId,
  username: String,
  email: String,
  password: String,
});
