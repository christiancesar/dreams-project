import { kafka } from "./index"
import { UsersControllers } from "../../controllers/UsersControllers"
import { Action, MessageBody } from "../../../class/MessageTransfer"



const usersControllers = new UsersControllers()

export const usersConsumer = async () => {
  const topic = 'dreams-users'
  const consumer = kafka.consumer({ groupId: 'users-group' })

  await consumer.connect()
  await consumer.subscribe({ topic })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
      console.log(`- ${prefix} ${message.key}#${message.value}`)

      const currier = message.value
      await usersControllers.index() 
      

    }
  })
}