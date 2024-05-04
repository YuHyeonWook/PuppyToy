import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './router/routes';
import { UserProvider } from './context/UserProvider';
import './App.scss';
import { useUserState } from './lib/hooks/useUserState';

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
};

export default App;
