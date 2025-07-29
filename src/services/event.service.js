import { EventModel } from '../db/Event.js';
import { Types } from 'mongoose';

export const eventService = {
  async getEvents(userId, limit, offset) {
    const filter = { userId };
    const events = await EventModel.find(filter).skip(offset).limit(limit);
    const count = await EventModel.countDocuments(filter);

    return { items: events, count };
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
