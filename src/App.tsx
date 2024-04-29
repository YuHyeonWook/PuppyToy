import { UserContext } from './components/userContext';
import { useEffect, useState } from 'react';
import { Router } from './router/Router';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { User } from './types/UserTypes';
import './App.scss';

const initialUser: User = {
  age: '',
  breed: '',
  gender: '',
  id: '',
  imageUrl: '',
  inWork: '',
  name: '',
  outWork: '',
  position: '',
  workDate: '',
};

const App = () => {
  const [user, setUser] = useState<User | null>(initialUser);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/signup') return;

    onAuthStateChanged(auth, async (user) => {
      if (!user) navigate('/');
    });
  }, [location.pathname]);

  console.log(user);
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Router />
      </UserContext.Provider>
    </>
  );
};

export default App;
