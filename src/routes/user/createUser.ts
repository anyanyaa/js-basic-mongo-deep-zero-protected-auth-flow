import { User } from '../../db/User';
import { userService } from '../../services/user.service';
import { RouteHandler } from 'fastify';

export const createUserRoute: RouteHandler<{
  Body: { username: string; email: string; password: string };
  Reply: { 400: { message: string }; 201: { message: string } };
}> = async (request, reply) => {
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
