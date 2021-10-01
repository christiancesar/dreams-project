import { NextFunction, Request, Response } from "express";
import { producer } from "../provider/kafka/dreamsProducer";

/**
 * Disponibiliza o producer para todas rotas
 */

export function producerMiddleware(request: Request, response: Response, next: NextFunction) {
  request.producer = producer;
  return next();
}
