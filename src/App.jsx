// import { Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import SignUp from './pages/SignUp';
// import Home from './pages/Home';
// import UserAdd from './pages/UserAdd';
// import UserProfile from './pages/UserProfile';
// import WorkspaceApplication from './pages/WorkspaceApplication';
// import Gallery from './pages/Gallery';
import { UserContext } from './components/UserContext';
import { useEffect, useState } from 'react';
import { Router } from './router/Router';
import './App.scss';

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // removeUser - 유저 정보를 상태와 로컬 스토리지에서 동시에 제거하는 역할
  const removeUser = () => {
    setUser({});
    localStorage.removeItem('user');
  };

  return (
    <>
      <UserContext.Provider value={{ user, setUser, removeUser }}>
        <Router />
      </UserContext.Provider>
    </>
  );
};

export default App;
