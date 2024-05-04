import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { toast } from 'react-toastify';
import { useUserState } from '../lib/hooks/useUserState';
import '@styles/Login.scss';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const { setUserState } = useUserState();
  const [error, setError] = useState<string>('');

  const LoginRegister = async () => {
    try {
      if (email === '') {
        setError('이메일을 입력해주세요.');
      } else if (confirmPassword === '') {
        setError('비밀번호를 입력해주세요.');
      } else if (confirmPassword.length < 6) {
        setError('비밀번호를 6자 이상 입력해주세요.');
      } else {
        const user = await signInWithEmailAndPassword(auth, email, confirmPassword);
        const userUid = user.user.uid;
        const docRef = doc(db, 'newUsers', userUid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userContextData = { id: userUid, ...docSnap.data() };
          setUserState(userContextData);
          localStorage.setItem('user', JSON.stringify({ id: userUid, ...docSnap.data() }));
          navigate('/home');
        } else {
          navigate('/useradd');
        }
        toast('로그인 되었습니다.');
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email':
            setError('이메일 형식이 틀립니다.');
            break;
          case 'auth/user-not-found':
            setError('회원가입이 되어있지 않은 사용자입니다.');
            break;
          case 'auth/invalid-password':
            setError('비밀번호를 6자 이상 입력해주세요.');
            break;

          case 'auth/invalid-credential':
            setError('이메일 또는 비밀번호가 잘못되었습니다.');
            break;
          default:
            break;
        }
      }
    }
  };

  return (
    <section>
      <h1>LOGIN</h1>
      <div className="container">
        <div className="inputbox">
          <input
            className="inputbox__email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="inputbox__pw"
            type="password"
            placeholder="Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="btn">
          <button className="btn__first" onClick={LoginRegister}>
            Login
          </button>
          <div></div>
          <Link className="btn__second" to="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
};
