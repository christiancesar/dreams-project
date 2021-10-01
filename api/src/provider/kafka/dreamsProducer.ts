import kafka from "./index";

export const producer = kafka.producer()

export const dreamsProducer = async() => {
  await producer.connect()
}