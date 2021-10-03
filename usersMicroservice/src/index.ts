import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  brokers: ['localhost:9092'],
  clientId: 'users',
})

const topic = 'dreams-users'
const consumer = kafka.consumer({ groupId: 'users-group' })

const producer = kafka.producer();

async function run() {
  await producer.connect()
  await consumer.connect()
  await consumer.subscribe({ topic })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
      console.log(`- ${prefix} ${message.key}#${message.value}`)

      const users = [
        {
          name: 'Christian Cesar',
          age: 23,
          birthday: '1997-11-01'
        },
        {
          name: 'Maria Clara',
          age: 25,
          birthday: '1995-05-25'
        }
      ]

      const usersFormatted = JSON.stringify(users);

      // setTimeout(() => {
      producer.send({
        topic: 'users-dreams',
        messages: [
          { value: usersFormatted }
        ]
      })
      // }, 3000);
    },
  })
}

run().catch(console.error)