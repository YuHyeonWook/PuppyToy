import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { UserContext } from '../components/userContext';
import '../styles/Login.scss';
import { FirebaseError } from 'firebase/app';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const { setUser } = useContext(UserContext);

  const register = async () => {
    try {
      if (email !== '' && password !== '') {
        const user = await signInWithEmailAndPassword(auth, email, password);
        const userUid = user.user.uid;
        const docRef = doc(db, 'newUsers', userUid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userContextData = { id: userUid, ...docSnap.data() };
          setUser(userContextData);
          localStorage.setItem('user', JSON.stringify({ id: userUid, ...docSnap.data() }));
          navigate('/home');
        } else {
          navigate('/useradd');
        }
        alert('로그인 되었습니다.');
      } else {
        alert('이메일과 비밀번호를 입력해주세요.');
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email':
            alert('이메일 형식이 틀립니다.');
            break;
          case 'auth/user-not-found':
            alert('아이디가 존재하지 않습니다.');
            break;
          case 'auth/invalid-password':
            alert('비밀번호를 6자 이상 입력해주세요.');
            break;
          case 'auth/wrong-password':
            alert('비밀번호를 다시 확인해주세요.');
            break;
          case 'auth/invalid-credential':
            alert('이메일 또는 비밀번호가 잘못되었습니다.');
            break;
          default:
            console.error(error);
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="btn">
          <button className="btn__first" onClick={register}>
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
