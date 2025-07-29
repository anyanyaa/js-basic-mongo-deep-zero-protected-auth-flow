import { EventModel } from '../db/Event.js';
import { Types } from 'mongoose';

export const eventService = {
  async getEvents(userId) {
    const events = await EventModel.find({ userId });

    return events;
  },

  async createEvent(title, plannedDate, userId) {
    const event = new EventModel({
      _id: new Types.ObjectId(),
      title,
      plannedDate,
      userId: new Types.ObjectId(userId),
    });

    await event.save();

    return event;
  },
};
