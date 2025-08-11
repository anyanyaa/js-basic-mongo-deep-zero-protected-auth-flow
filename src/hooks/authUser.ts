import { userService } from '../services/user.service';
import { RouteHandler } from 'fastify';

export const authUser: RouteHandler<{
  Headers: { authorization: string };
}> = async (request, reply) => {
  try {
    const user = await userService.getUserByToken(
      request.headers.authorization,
    );

    request.user = user;
  } catch (err) {
    return reply.status(401).send({
      message: 'Invalid token',
    });
  }
};
