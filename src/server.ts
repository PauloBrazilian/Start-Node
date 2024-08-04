import Fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './routes';

const app = Fastify({ logger: true });

const start = async () => {
  try {
    await app.register(cors);
    await app.register(routes);

    await app.listen({ port: 8090 });
    app.log.info(`Server listening on http://localhost:8090`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
