import { eventService } from '../../services/event.service';
import { RouteHandler } from 'fastify';

export const getEventsRoute: RouteHandler<{
  Querystring: { limit: number; offset: number };
}> = async (request, reply) => {
  const { id } = request.user;

  const { limit, offset } = request.query;

  const allEvents = await eventService.getEvents(id, limit, offset);

  reply.send(allEvents);
};
