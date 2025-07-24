import mongoose from 'mongoose';

//создаем модель монго

export const User = mongoose.model('User', {
  _id: {
    type: mongoose.Types.ObjectId,
    default: function () {
      return new mongoose.Types.ObjectId();
    },
  },
  username: String,
  email: String,
  password: String,
});
