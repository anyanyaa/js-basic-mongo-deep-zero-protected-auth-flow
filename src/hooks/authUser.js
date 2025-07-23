import { userService } from '../services/user.service.js';

export const authUser = async (request, reply) => {
  try {
    return await userService.getUserByToken(request.headers.authorization);
  } catch (err) {
    return reply.status(401).send({
      message: 'Invalid token',
    });
  }
};
