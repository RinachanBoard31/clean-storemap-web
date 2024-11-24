export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  sex: number;
  gender: number;
}

export interface UserUpdateType {
  name: string;
  age: number;
  sex: number;
  gender: number;
}


export interface UserLoginType {
  email: string;
}
