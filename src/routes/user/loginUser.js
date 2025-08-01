import { User } from '../../db/User.js';
import { userService } from '../../services/user.service.js';
import { compare, hash } from 'bcrypt';

export const loginUserRoute = async (request, reply) => {
  const { email, username, password } = request.body;

  const currentUser = await User.findOne(email ? { email } : { username });

  if (!currentUser) {
    return reply.status(400).send({
      message: 'User not found',
    });
  }

  const isPasswordCorrect = await compare(password, currentUser.password);

  if (!isPasswordCorrect) {
    return reply.status(400).send({
      message: 'Password incorrect',
    });
  }

  const token = await userService.loginUser(currentUser._id);

  reply.status(201).send({
    message: 'Successful login',
    token,
  });
};
