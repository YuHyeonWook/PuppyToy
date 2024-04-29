import { Dispatch, SetStateAction } from 'react';

export interface User {
  age: number;
  breed: string;
  gender: string;
  id: string;
  imageUrl: string;
  inWork: string;
  name: string;
  outWork: string;
  position: string;
  workDate: string;
}

export interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}
