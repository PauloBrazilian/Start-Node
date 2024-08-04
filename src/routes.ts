import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import pool from './db';
import { Person } from './model/Person';

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/person', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const res = await pool.query('SELECT * FROM Person');
      reply.send(res.rows);
    } catch (err) {
      fastify.log.error(err);
      reply.send(err);
    }
  });

  fastify.post('/person', async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, email } = request.body as Person;
    try {
      const res = await pool.query('INSERT INTO Person (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
      reply.send(res.rows[0]);
    } catch (err) {
      fastify.log.error(err);
      reply.send(err);
    }
  });

  fastify.put('/person/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const { name, email } = request.body as Person;
    try {
      const res = await pool.query('UPDATE Person SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
      reply.send(res.rows[0]);
    } catch (err) {
      fastify.log.error(err);
      reply.send(err);
    }
  });

  fastify.delete('/person/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    try {
      await pool.query('DELETE FROM Person WHERE id = $1', [id]);
      reply.send({ message: 'Person deleted successfully' });
    } catch (err) {
      fastify.log.error(err);
      reply.send(err);
    }
  });
}
