import { UserContext } from './context/userContext';
import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { UserType } from './types/UserTypes';
import routes from './router/routes';
import './App.scss';

const router = createBrowserRouter(routes);

const App = () => {
  const [user, setUser] = useState({});

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
