import { userService } from '../services/user.service.js';

export const authUser = async (request, reply) => {
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
