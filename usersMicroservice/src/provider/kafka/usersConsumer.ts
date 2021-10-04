import { kafka } from "./index"
import { UsersControllers } from "../../controllers/UsersControllers"



const usersControllers = new UsersControllers()

export const usersConsumer = async() => {
  const topic = 'dreams-users'
  const consumer = kafka.consumer({ groupId: 'users-group' })

  await consumer.connect()
  await consumer.subscribe({ topic })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
      console.log(`- ${prefix} ${message.key}#${message.value}`)
      await usersControllers.index()
    }
  })
}