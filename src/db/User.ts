import mongoose, { Schema } from 'mongoose';

//создаем модель монго

const userSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: function () {
      return new mongoose.Types.ObjectId();
    },
    required: true,
  },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = mongoose.model('User', userSchema);
