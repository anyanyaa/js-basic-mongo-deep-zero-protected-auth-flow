import mongoose from 'mongoose';

export const EventModel = mongoose.model('Event', {
  _id: {
    type: mongoose.Types.ObjectId,
    default: function () {
      return new mongoose.Types.ObjectId();
    },
  },
  title: String,
  plannedDate: Date,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});
