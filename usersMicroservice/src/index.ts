import AppError from "../../common/@types/AppError"
import { UsersControllers } from "./controllers/UsersControllers"
import { usersConsumer } from "./provider/kafka/usersConsumer"
import { usersProducer, usersProducerConnect } from "./provider/kafka/usersProducer"

const usersController = new UsersControllers()
async function run() {
  try {
    // await usersProducerConnect()
    // await usersConsumer()

    console.log("User microservice on-line 🙋‍♀️")

    await usersController.show({ userId: "f06e7fc6-e1b8-8caa-8b7daf3f824f" })
  } catch (error: any) {

    if (error instanceof AppError) {
      // usersProducer.send({
      //   topic: 'users-dreams',
      //   messages: [
      //     { value: error.message }
      //   ]
      // })
      console.error("Intancia do AppError");
      console.error(error);
    }

    console.error("Internal Server Error");
    console.error(error);
  }
}

run()

