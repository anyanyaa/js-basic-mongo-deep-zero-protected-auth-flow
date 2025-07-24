import { User } from '../../db/User.js';
import { userService } from '../../services/user.service.js';

export const createUserRoute = async (request, reply) => {
  const { username, email, password } = request.body;

  const currentUserByEmail = await User.findOne({ email });
  const currentUserByUsername = await User.findOne({ username });

  if (currentUserByEmail || currentUserByUsername) {
    return reply.status(400).send({
      message: 'User already exists',
    });
  }

  await userService.createUser(username, email, password);

  reply.status(201).send({ message: 'Successful created' });
};
