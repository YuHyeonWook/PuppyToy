import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.scss';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  console.log(auth.currentUser.uid);

  const register = async (e) => {
    try {
      if (email !== '' && password !== '') {
        await signInWithEmailAndPassword(auth, email, password);
        alert('로그인 되었습니다.');
        navigate('/useradd');
      } else {
      }
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      if (error.code === 'auth/invalid-email') {
        alert('이메일 형식이 틀립니다.');
      }
      if (error.code === 'auth/user-not-found') {
        alert('아이디가 존재하지 않습니다.');
      }
      if (error.code === 'auth/wrong-password') {
        alert('비밀번호를 다시 확인해주세요.');
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

export default Login;
