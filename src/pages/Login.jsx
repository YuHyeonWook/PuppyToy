import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.scss';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
<<<<<<< HEAD
import { getFirestore, doc, getDoc } from 'firebase/firestore';
=======
>>>>>>> 93c87da3617342600ebc20b0e8dee1367e53e674

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
<<<<<<< HEAD
  const db = getFirestore();
=======
>>>>>>> 93c87da3617342600ebc20b0e8dee1367e53e674

  const register = async (e) => {
    try {
      if (email !== '' && password !== '') {
<<<<<<< HEAD
        const user = await signInWithEmailAndPassword(auth, email, password);
        const userUid = user.user.uid;

        const docRef = doc(db, 'newUsers', userUid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
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
=======
        await signInWithEmailAndPassword(auth, email, password);
        alert('로그인 되었습니다.');
        navigate('/home');
      } else {
      }
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
>>>>>>> 93c87da3617342600ebc20b0e8dee1367e53e674
      if (error.code === 'auth/invalid-email') {
        alert('이메일 형식이 틀립니다.');
      }
      if (error.code === 'auth/user-not-found') {
        alert('아이디가 존재하지 않습니다.');
      }
<<<<<<< HEAD
      if (error.code === 'auth/invalid-password') {
        alert('비밀번호를 6자 이상 입력해주세요.');
      }
      if (error.code === 'auth/wrong-password') {
        alert('비밀번호를 다시 확인해주세요.');
      }
      if (error.code === 'auth/invalid-credential') {
        alert('이메일 또는 비밀번호가 잘못되었습니다.');
      }
=======
      if (error.code === 'auth/wrong-password') {
        alert('비밀번호를 다시 확인해주세요.');
      }
>>>>>>> 93c87da3617342600ebc20b0e8dee1367e53e674
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

export default Login;
