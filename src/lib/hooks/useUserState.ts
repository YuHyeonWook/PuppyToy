import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

export const useUserState = () => {
  const { userState, setUserState } = useContext(UserContext);
  if (userState === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return { userState, setUserState };
};
