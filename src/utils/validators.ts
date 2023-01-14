import * as uuid from 'uuid';
import { User } from '../model/Users';

export const validateUserId = (userId: string) => {
  return uuid.validate(userId);
};
export const validateRequiredFields = (user: { [key: string]: any }): user is User => {

  const isUsernameValid = 'username' in user && typeof user['username'] == 'string' &&
    user['username'].length > 0;

  const isAgeValid = 'age' in user && +user['age'] >= 0 && +user['age'] <= 100;

  const isHobbiesValid = 'hobbies' in user && user['hobbies'] instanceof Array &&
    user['hobbies'].every(i => typeof i === 'string');

  return Object.keys(user).length === 3 && isUsernameValid && isAgeValid && isHobbiesValid;
};
