import { usersConsumer } from "./provider/kafka/usersConsumer"
import { usersProducerConnect } from "./provider/kafka/usersProducer"

async function run() {
  await usersProducerConnect()
  await usersConsumer()
}

run().catch(console.error)