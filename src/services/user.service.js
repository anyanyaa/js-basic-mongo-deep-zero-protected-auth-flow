import { User } from '../db/User.js';
import { hash } from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const { sign, verify } = jwt.default;

export const userService = {
  SECRET_KEY: 'Secret key',

  //сохраняем юзера в базу данных монго
  async createUser(username, email, password) {
    const user = new User({
      username,
      email,
      password: await hash(password, 10),
    });

    await user.save();

    return user;
  },

  //получаем токен, логинимся

  async loginUser(id) {
    return sign({ id }, this.SECRET_KEY, {
      expiresIn: '2h',
    });
  },

  //проверяем актуальность сессии

  async getUserByToken(token) {
    return verify(token, this.SECRET_KEY);
  },
};
