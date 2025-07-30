import { eventService } from '../../services/event.service.js';

export const getEventsRoute = async (request, reply) => {
  const { id } = request.user;

  const { limit, offset } = request.query;

  const allEvents = await eventService.getEvents(id, limit, offset);

  reply.send(allEvents);
};
