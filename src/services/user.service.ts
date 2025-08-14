import { User } from '../db/User';
import { hash } from 'bcrypt';
import JWT from 'jsonwebtoken';

const { sign, verify } = JWT;

export const userService = {
  SECRET_KEY: 'Secret key',

  //сохраняем юзера в базу данных монго
  async createUser(username: string, email: string, password: string) {
    const user = new User({
      username,
      email,
      password: await hash(password, 10),
    });

    await user.save();

    return user;
  },

  //получаем токен, логинимся

  async loginUser(id: string): Promise<string> {
    return sign({ id }, this.SECRET_KEY, {
      expiresIn: '2h',
    });
  },

  //проверяем актуальность сессии

  async getUserByToken(token: string): Promise<{ id: string }> {
    return verify(token, this.SECRET_KEY) as unknown as { id: string };
  },
};
