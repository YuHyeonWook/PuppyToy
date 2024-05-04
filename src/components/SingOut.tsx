import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../lib/hooks/useUserState';
import '@styles/SingOut.scss';

const SingOut = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const { setUserState } = useUserState();

  const logOutClick = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      setUserState('');
      alert('로그아웃 되었습니다.');
      navigate('/');
    } catch (error: any) {
      console.log(error.code);
      console.log(error.message);
      alert('로그아웃에 실패했습니다.');
    }
  };

  return (
    <button className="logout--btn" onClick={logOutClick}>
      로그아웃
    </button>
  );
};

export default SingOut;
