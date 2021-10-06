import { MessageBody } from "../../../class/MessageTransfer"
import { executeActions } from "../../utils/executeActions"
import { kafka } from "./index"

export const usersConsumer = async () => {
  const topic = 'dreams-users'
  const consumer = kafka.consumer({ groupId: 'users-group' })

  await consumer.connect()
  await consumer.subscribe({ topic })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
      console.log(`- ${prefix} ${message.key}#${message.value}`)
      const data = JSON.parse(message.value.toString()) as MessageBody
      await executeActions(data)
    }
  })
}