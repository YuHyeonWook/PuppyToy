import { useState } from 'react';
import { UserContext } from './userContext';

const UserProvider = ({ children }: any) => {
  const [userState, setUserState] = useState({});
  return (
    <UserContext.Provider value={{ userState, setUserState }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
