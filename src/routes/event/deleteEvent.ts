import { eventService } from '../../services/event.service';
import { RouteHandler } from 'fastify';

export const deleteEventRoute: RouteHandler<{
  Params: { id: string };
}> = async (request, reply) => {
  const {
    user,
    params: { id },
  } = request;

  await eventService.removeEvent(user.id, id);

  reply.status(204);
};
