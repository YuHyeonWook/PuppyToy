import { getAuth, signOut } from 'firebase/auth';
import React from 'react';

const SingOut = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const logOutClick = async () => {
    try {
      await signOut(auth);
      alert('로그아웃 되었습니다.');
      navigate('/login');
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      alert('로그아웃에 실패했습니다.');
    }
  };

  return <button onClick={logOutClick}>Log Out</button>;
};

export default SingOut;
