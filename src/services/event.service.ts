import { EventModel } from '../db/Event';
import { Types } from 'mongoose';

export const eventService = {
  async getEvents(userId: string, limit: number, offset: number) {
    const filter = { userId };
    const events = await EventModel.find(filter).skip(offset).limit(limit);
    const count = await EventModel.countDocuments(filter);

    return { items: events, count };
  },

  async createEvent(title: string, plannedDate: Date, userId: string) {
    const event = new EventModel({
      title,
      plannedDate,
      userId: new Types.ObjectId(userId),
    });

    await event.save();

    return event;
  },

  async removeEvent(userId: string, eventId: string) {
    await EventModel.deleteOne({
      userId: new Types.ObjectId(userId),
      _id: new Types.ObjectId(eventId),
    });
  },
};
