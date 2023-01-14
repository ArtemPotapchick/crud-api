import * as dotenv from 'dotenv';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import * as url from 'url';
import { DELETE, GET, POST, PUT } from './utils/methods';
import { User, users } from './model/Users';
import {
  createNewUser,
  getJSONDataFromRequest,
  getUserById,
  removeUserById,
  updateUserById,
} from './controllers/UserController';
import { validateRequiredFields, validateUserId } from './utils/validators';
import {
  invalidUserIdResponse,
  missedRequiredFieldsResponse,
  resourceNotFoundResponse,
  unExistingUserResponse,
} from './utils/responses';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const queryObject = url.parse(req.url!, true).path;
  const userId = queryObject?.split('/').slice(-1).join();
  switch (req.url) {
    case '/api/users': {
      switch (req.method) {
        case GET: {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify(users));
          break;
        }
        case POST: {
          getJSONDataFromRequest<User>(req).then((user: User) => {
            if (validateRequiredFields(user)) {
              createNewUser(user).then((newUser) => {
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(newUser));
              });
            } else {
              missedRequiredFieldsResponse(res);
            }
          });
          break;
        }
      }
      break;
    }
    case `/api/users/${userId}`: {
      switch (req.method) {
        case GET: {
          if (validateUserId(userId!)) {
            getUserById(userId!).then((result) => {
              if (result) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify(result));
              } else {
                unExistingUserResponse(res, userId as string);
              }
            });
          } else {
            invalidUserIdResponse(res, userId as string);
          }
          break;
        }
        case DELETE: {
          if (validateUserId(userId!)) {
            getUserById(userId!).then((result) => {
              if (result) {
                removeUserById(userId!).then(() => {
                  res.statusCode = 204;
                  res.setHeader('Content-Type', 'application/json');
                  res.end();
                });
              } else {
                unExistingUserResponse(res, userId as string);
              }
            });
          } else {
            invalidUserIdResponse(res, userId as string);
          }
          break;
        }
        case PUT: {
          if (validateUserId(userId!)) {
            getUserById(userId!).then((result) => {
              if (result) {
                getJSONDataFromRequest<User>(req).then((user: User) => {
                  if (validateRequiredFields(user)) {
                    updateUserById(userId!, user).then((newUser) => {
                      res.statusCode = 200;
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify(newUser));
                    });
                  } else {
                    missedRequiredFieldsResponse(res);
                  }
                });
              } else {
                unExistingUserResponse(res, userId as string);
              }
            });
          } else {
            invalidUserIdResponse(res, userId as string);
          }
          break;
        }
      }
      break;
    }
    default: {
      resourceNotFoundResponse(req, res);
    }
  }
});
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
