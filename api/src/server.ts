import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import { dreamsProducer } from './provider/kafka/dreamsProducer';
import { usersToDreamsConsumer } from './provider/kafka/usersToDreamsConsumer';
import { producerMiddleware } from './middleware/producerMiddleware';

const server = express();

server.use(cors())
server.use(express.json())
server.use(producerMiddleware)

server.use(routes)

usersToDreamsConsumer().catch(console.error)
dreamsProducer().catch(console.error)

server.listen(3333, () => {
  console.log('Server listen on port 3333! 🍹')
})



