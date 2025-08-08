import { eventService } from '../../services/event.service.js';

export const createEventRoute = async (request, reply) => {
  const { title, plannedDate } = request.body;
  const { id } = request.user;

  const event = await eventService.createEvent(title, plannedDate, id);

  reply.send({
    message: 'Successful created event',
    event,
  });
};
