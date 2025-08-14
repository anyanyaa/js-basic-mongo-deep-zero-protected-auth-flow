import mongoose, { Schema } from 'mongoose';

const eventSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: function () {
      return new mongoose.Types.ObjectId();
    },
    required: true,
  },
  title: { type: String, required: true },
  plannedDate: { type: Date, required: true },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const EventModel = mongoose.model('Event', eventSchema);
