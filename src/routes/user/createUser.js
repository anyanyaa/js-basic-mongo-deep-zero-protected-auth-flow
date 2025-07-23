import { User } from '../../db/User.js';
import { userService } from '../../services/user.service.js';

export const createUserRoute = async (request, reply) => {
  const { username, email, password } = request.body;

  const currentUser = await User.findOne({ email, username });

  if (currentUser) {
    return reply.status(400).send({
      message: 'User already exists',
    });
  }

  await userService.createUser(username, email, password);

  reply.status(201).send({ message: 'Successful created' });
};
