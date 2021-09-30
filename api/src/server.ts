import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';

import { Kafka, logLevel } from 'kafkajs';

const server = express();

server.use(cors())
server.use(express.json())

const kafka = new Kafka({
  clientId: 'api',
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 10
  },
});

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'users-group-receiver' })

/**
 * Disponibiliza o producer para todas rotas
 */
server.use(( request: Request, response: Response, next: NextFunction) => {
  request.producer = producer;
  return next();
})

server.use(routes)

async function run() {
  await producer.connect()
  await consumer.connect()

  await consumer.subscribe({ topic: 'users-dreams' });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Resposta', String(message.value));
    },
  });

  server.listen(3333, () => { 
    console.log('Server listen on port 3333! 🍹') 
  })
}

run().catch(console.error)

