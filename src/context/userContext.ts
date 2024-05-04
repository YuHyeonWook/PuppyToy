import { createContext } from 'react';
import { UserType } from '../lib/types/UserTypes';

type UserContextType = {
  userState: UserType | null;
  setUserState: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export const UserContext = createContext({} as UserContextType);
