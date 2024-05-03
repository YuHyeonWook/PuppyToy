import { useState } from 'react';
import { UserContext } from './userContext';
import { UserProviderProps } from '../lib/types/PropsTypes';

const UserProvider = ({ children }: UserProviderProps) => {
  const [userState, setUserState] = useState({});
  return (
    <UserContext.Provider value={{ userState, setUserState }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
