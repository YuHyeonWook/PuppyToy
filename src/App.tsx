import './App.scss';
import { UserContext } from './components/UserContext';
import { useEffect, useState } from 'react';
import { Router } from './router/Router';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const [user, setUser] = useState({});
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

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Router />
      </UserContext.Provider>
    </>
  );
};

export default App;
