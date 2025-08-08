import { eventService } from '../../services/event.service.js';

export const deleteEventRoute = async (request, reply) => {
  const {
    user,
    params: { id },
  } = request;

  await eventService.removeEvent(user.id, id);

  reply.status(204).send({
    message: 'Event successfully deleted',
  });
};
