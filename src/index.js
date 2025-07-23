import { server } from './server.js';
import mongoose, { Types } from 'mongoose';
import { compare, hash } from 'bcrypt';
import { connectToMongoose } from './initializers/connectToMongoose.js';
import * as jwt from 'jsonwebtoken';

const { sign, verify } = jwt.default;

//создаем модель монго

const User = mongoose.model('User', {
  _id: mongoose.Types.ObjectId,
  username: String,
  email: String,
  password: String,
});

const SECRET_KEY = 'Secret key';

server.register(
  (instance, opts, done) => {
    //registration user

    instance.post(
      '/user',
      {
        schema: {
          tags: ['Users'],
          description: 'Create user',
          summary: 'Create user',
          body: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
                minimum: 2,
                maximum: 40,
              },
              email: {
                type: 'string',
                format: 'email',
                minimum: 6,
                maximum: 40,
              },
              password: {
                type: 'string',
                minimum: 8,
                maximum: 20,
              },
            },
            required: ['username', 'email', 'password'],
          },
        },
      },
      async function (request, reply) {
        const { username, email, password } = request.body;

        const currentUser = await User.findOne({ email, username });

        if (currentUser) {
          return reply.status(400).send({
            message: 'User already exists',
          });
        }

        const user = new User({
          _id: new Types.ObjectId(),
          username,
          email,
          password: await hash(password, 10),
        });

        await user.save();

        reply.status(201).send({ message: 'Successful created' });
      },
    );

    //login user

    instance.post(
      '/session',
      {
        schema: {
          tags: ['Users'],
          description: 'Login user',
          summary: 'Login user',
          body: {
            type: 'object',
            oneOf: [
              {
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                    minimum: 6,
                    maximum: 40,
                  },
                  password: {
                    type: 'string',
                    minimum: 8,
                    maximum: 20,
                  },
                },
                required: ['email', 'password'],
              },
              {
                properties: {
                  username: {
                    type: 'string',
                    minimum: 2,
                    maximum: 40,
                  },
                  password: {
                    type: 'string',
                    minimum: 8,
                    maximum: 20,
                  },
                },
                required: ['username', 'password'],
              },
            ],
          },
        },
      },
      async function (request, reply) {
        const { email, username, password } = request.body;

        const currentUser = await User.findOne(
          email ? { email } : { username },
        );

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

        const token = sign({ id: currentUser._id }, SECRET_KEY, {
          expiresIn: '2h',
        });

        return {
          token,
        };
      },
    );

    //create a protected route with preHandler (middleware), verify token

    instance.register(
      (protectedInstance, opts, done) => {
        protectedInstance.addHook('preHandler', async (request, reply) => {
          const token = request.headers.authorization;

          try {
            let decoded = verify(token, SECRET_KEY);
          } catch (err) {
            return reply.status(401).send({
              message: 'Invalid token',
            });
          }
        });

        protectedInstance.get(
          '',
          {
            schema: {
              tags: ['Protected'],
              description: 'Protected',
              summary: 'Protected',
              headers: {
                type: 'object',
                properties: {
                  authorization: {
                    type: 'string',
                  },
                },
                required: ['authorization'],
              },
            },
          },
          async function (request, reply) {
            return 'Hello from protected';
          },
        );

        done();
      },
      { prefix: '/protected' },
    );

    done();
  },
  {
    prefix: '/api/v1',
  },
);

connectToMongoose('mongodb://root:example@localhost:27019/').then(() => {
  return server
    .listen({
      port: 4046,
    })
    .then(() => {
      server.log.info('Started');
    });
});
