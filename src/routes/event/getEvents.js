import { eventService } from '../../services/event.service.js';

export const getEventsRoute = async (request, reply) => {
  const { id } = request.user;

  const allEvents = await eventService.getEvents(id);

  reply.status(200).send(allEvents);
};
