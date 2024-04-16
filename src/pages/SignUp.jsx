import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.scss';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const register = async (e) => {
    try {
      if (email === '' || password === '' || confirmPassword === '') {
        alert('전부 입력해주세요.');
      } else if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
      } else if (
        email !== '' &&
        password !== '' &&
        confirmPassword !== '' &&
        password === confirmPassword
      ) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('회원가입이 완료되었습니다.');
        navigate('/');
      }
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      if (error.code === 'auth/invalid-email') {
        alert('이메일 형식이 틀립니다.');
      }
      if (error.code === 'auth/email-already-exists') {
        alert('해당 이메일은 사용중입니다.');
      }
      if (error.code === 'auth/weak-password') {
        alert('6자 이상의 비밀번호를 입력해주세요.');
      }
    }
  };

  return (
    <section>
      <h1>SING UP</h1>
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
            placeholder="Password: 6자 이상 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="inputbox__confirm"
            type="password"
            placeholder="Confrim"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
        </div>
        <div className="btn">
          <button className="btn__first" onClick={register}>
            Sign up
          </button>
          <div></div>
          <Link className="btn__second" to="/">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
