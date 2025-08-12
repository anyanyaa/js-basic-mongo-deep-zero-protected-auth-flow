import { initializeServer } from './initializers/initializeServer';
import {
  userEmailSchema,
  userPasswordSchema,
  userUsernameSchema,
} from './schemas/userSchemas';
import { createUserRoute } from './routes/user/createUser';
import { loginUserRoute } from './routes/user/loginUser';
import { authUser } from './hooks/authUser';
import {
  eventAuthSchema,
  eventParamsIdSchema,
  eventPlannedDateSchema,
  eventQueryLimitSchema,
  eventQueryOffsetSchema,
  eventTitleSchema,
} from './schemas/eventSchemas';
import { createEventRoute } from './routes/event/createEvent';
import { getEventsRoute } from './routes/event/getEvents';
import { deleteEventRoute } from './routes/event/deleteEvent';

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

        //create event

        protectedInstance.post(
          '/event',
          {
            schema: {
              tags: ['Events'],
              description: 'Create event',
              summary: 'Create event',
              body: {
                type: 'object',
                properties: {
                  title: eventTitleSchema,
                  plannedDate: eventPlannedDateSchema,
                },
                required: ['title', 'plannedDate'],
              },
              headers: {
                type: 'object',
                properties: {
                  authorization: eventAuthSchema,
                },
                required: ['authorization'],
              },
            },
          },
          createEventRoute,
        );

        //get events

        protectedInstance.get(
          '/event',
          {
            schema: {
              tags: ['Events'],
              description: 'Get events',
              summary: 'Get events',
              headers: {
                type: 'object',
                properties: {
                  authorization: eventAuthSchema,
                },
                required: ['authorization'],
              },
              querystring: {
                type: 'object',
                properties: {
                  limit: eventQueryLimitSchema,
                  offset: eventQueryOffsetSchema,
                },
                required: ['limit', 'offset'],
              },
            },
          },
          getEventsRoute,
        );

        //delete event

        protectedInstance.delete(
          '/event/:id',
          {
            schema: {
              tags: ['Events'],
              description: 'Delete event',
              summary: 'Delete event',
              headers: {
                type: 'object',
                properties: {
                  authorization: eventAuthSchema,
                },
                required: ['authorization'],
              },
              params: {
                type: 'object',
                properties: {
                  id: eventParamsIdSchema,
                },
                required: ['id'],
              },
            },
          },
          deleteEventRoute,
        );

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
