import { getAuth, signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './userContext';
import '../styles/SingOut.scss';

const SingOut = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const { setUser } = useContext(UserContext);

  const logOutClick = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      setUser('');
      alert('로그아웃 되었습니다.');
      navigate('/');
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      alert('로그아웃에 실패했습니다.');
    }
  };

  return (
    <button className="logoutbtn" onClick={logOutClick}>
      Log Out
    </button>
  );
};

export default SingOut;
