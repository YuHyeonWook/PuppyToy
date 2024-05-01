import { createContext } from 'react';
import { UserContextType } from '../types/UserTypes';

export const UserContext = createContext<UserContextType>({
  user: {
    age: 0,
    breed: '',
    gender: '',
    id: '',
    imageUrl: '',
    inWork: '',
    name: '',
    outWork: '',
    position: '',
    workDate: '',
  },
  setUser: () => {},
});
