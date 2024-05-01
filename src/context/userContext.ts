import { createContext } from 'react';
import { UserContextType } from '../types/UserTypes';

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
});
