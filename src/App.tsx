import { UserContext } from './components/userContext';
import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { User } from './types/UserTypes';
import routes from './router/routes';
import './App.scss';

const initialUser: User = {
  age: 0,
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

const router = createBrowserRouter(routes);

const App = () => {
  const [user, setUser] = useState<User | null>(initialUser);
  const auth = getAuth();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
};

export default App;
