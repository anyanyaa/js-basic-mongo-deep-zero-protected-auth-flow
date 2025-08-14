import './types/fastify.ts';
import { server } from './server';
import { connectToMongoose } from './initializers/connectToMongoose';

connectToMongoose('mongodb://root:example@localhost:27019/').then(() => {
  return server
    .listen({
      port: 4046,
    })
    .then(() => {
      server.log.info('Started');
    });
});
