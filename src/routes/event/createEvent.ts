import { eventService } from '../../services/event.service';
import { RouteHandler } from 'fastify';

export const createEventRoute: RouteHandler<{
  Body: { title: string; plannedDate: Date };
}> = async (request, reply) => {
  const { title, plannedDate } = request.body;
  const { id } = request.user;

  const event = await eventService.createEvent(title, plannedDate, id);

  reply.send({
    message: 'Successful created event',
    event,
  });
};
