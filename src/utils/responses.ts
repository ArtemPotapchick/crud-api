import { IncomingMessage, ServerResponse } from 'http';

export const missedRequiredFieldsResponse = (res:ServerResponse) =>{
  res.statusCode = 400;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'body does not contain required fields or some fields are invalid' }));
}
export const unExistingUserResponse = (res:ServerResponse,userId:string) =>{
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 404;
  res.end(JSON.stringify({ message: `Record with id - ${userId} doesn't exist` }));
}
export const invalidUserIdResponse = (res:ServerResponse,userId:string) =>{
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 400;
  res.end(JSON.stringify({ message: `userId - ${userId} is invalid` }));
}
export const resourceNotFoundResponse = (req:IncomingMessage,res:ServerResponse) =>{
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 404;
  res.end(JSON.stringify({ message: `${req.url} - Resource not found` }));
}
