import { Dispatch, SetStateAction } from 'react';

export interface UserType {
  name: string;
  age: number;
  breed: string;
  gender: string;
  id: string;
  imageUrl: string;
  inWork: string;
  outWork: string;
  position: string;
  workDate: string;
}

export interface UserContextType {
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
}
