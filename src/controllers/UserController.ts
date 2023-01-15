import { User, users } from '../model/Users';
import { IncomingMessage } from 'http';
import { v4 as uuid } from 'uuid';

export const getUserById = (userId: string) => {
  return new Promise((resolve) =>  resolve(users.find(user => user.id === userId)));
};

export const createNewUser = (user: User) =>{
  return new Promise( (resolve) => {
    const newUser = { id: uuid(), ...user };
    users.push(newUser);
    resolve(newUser)
  })
}
export const removeUserById = (userId:string) =>{
  return new Promise((resolve) =>  resolve(users.splice(users.findIndex(function(user){
    return user.id === userId;
  }), 1)));
}
export const updateUserById = (userId:string,newUser:User) =>{
  return new Promise((resolve) =>  resolve(users.find((user) => {
    if(user.id === userId) {
      user.username = newUser.username
      user.age = newUser.age;
      user.hobbies = [...newUser.hobbies];
      return user
    }
  })))
}
export const getJSONDataFromRequest =<T>(req: IncomingMessage): Promise<T> => {
  return new Promise(resolve => {
    const chunks = [] as Uint8Array[];
    req.on('data', (chunk) => {
      chunks.push(chunk);
    });
    req.on('end', () => {
      resolve(
        JSON.parse(
          Buffer.concat(chunks).toString()
        )
      )
    });
  })
}
