export interface User {
  id?: string;
  username: string;
  age: number;
  hobbies: Array<string> | [];
}
export const users = [] as User[];
