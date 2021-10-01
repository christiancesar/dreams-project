import kafka from './index';

const consumer = kafka.consumer({ groupId: 'users-group-receiver' })

export const usersToDreamsConsumer = async() => {
  await consumer.connect()

  await consumer.subscribe({ topic: 'users-dreams' });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Resposta users: ', String(message.value));
    }
  })
}
