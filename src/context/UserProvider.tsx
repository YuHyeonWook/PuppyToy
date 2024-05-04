import { useState } from 'react';
import { UserContext } from './userContext';
import { UserProviderProps } from '../lib/types/PropsTypes';
import { UserType } from '../lib/types/UserTypes';

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userState, setUserState] = useState<UserType | null>(null);
  return (
    <UserContext.Provider value={{ userState, setUserState }}>{children}</UserContext.Provider>
  );
};
