import { Request, Response, Router } from "express";

const routes = Router();

routes.get('/users', async (request: Request, response: Response) => {
  
  await request.producer.send({
    topic: 'dreams-users',
    messages: [
      { value: 'List All Users'}
    ]
  })
  return response.send({ok : true});
})

export default routes;