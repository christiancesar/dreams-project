import { kafka } from "./index";

export const usersProducer = kafka.producer();

export const usersProducerConnect = async () => {  
  await usersProducer.connect()
}