import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { UserType } from './types/UserTypes';
import routes from './router/routes';
import UserProvider from './context/UserProvider';
import './App.scss';

const router = createBrowserRouter(routes);

const App = () => {
  const [, setUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
};

export default App;
