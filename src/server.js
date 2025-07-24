import { initializeServer } from './initializers/initializeServer.js';
import {
  userEmailSchema,
  userPasswordSchema,
  userUsernameSchema,
} from './schemas/userSchemas.js';
import { createUserRoute } from './routes/user/createUser.js';
import { loginUserRoute } from './routes/user/loginUser.js';
import { authUser } from './hooks/authUser.js';

export const server = await initializeServer();

server.route({
  url: '/',
  handler() {
    return 'hello';
  },
  method: 'GET',
});

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
              username: userUsernameSchema,
              email: userEmailSchema,
              password: userPasswordSchema,
            },
            required: ['username', 'email', 'password'],
          },
        },
      },
      createUserRoute,
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
                  email: userEmailSchema,
                  password: userPasswordSchema,
                },
                required: ['email', 'password'],
              },
              {
                properties: {
                  username: userUsernameSchema,
                  password: userPasswordSchema,
                },
                required: ['username', 'password'],
              },
            ],
          },
        },
      },
      loginUserRoute,
    );

    //create a protected route with preHandler (middleware), verify token

    instance.register(
      (protectedInstance, opts, done) => {
        protectedInstance.addHook('preHandler', authUser);

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
