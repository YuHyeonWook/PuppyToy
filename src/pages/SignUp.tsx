import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import '@styles/Login.scss';

export const SignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setconfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const auth = getAuth();

  const register = async () => {
    try {
      if (email === '' || password === '' || confirmPassword === '') {
        setError('전부 입력해주세요.');
      } else if (password !== confirmPassword) {
        setError('비밀번호가 일치하지 않습니다.');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('회원가입이 완료되었습니다.');
        navigate('/');
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-email') {
          setError('이메일 형식이 틀립니다.');
        } else if (error.code === 'auth/email-already-in-use') {
          setError('해당 이메일은 사용중입니다.');
        } else if (error.code === 'auth/weak-password') {
          setError('6자 이상의 비밀번호를 입력해주세요.');
        }
      } else {
        setError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
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
        {error && <div className="error-message">{error}</div>}
        <div className="btn">
          <button className="btn__first" onClick={register}>
            Sign up
          </button>
          <Link className="btn__second" to="/">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};
