import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import UserAdd from './pages/UserAdd';
import UserProfile from './pages/UserProfile';
import WorkspaceApplication from './pages/WorkspaceApplication';
import Gallery from './pages/Gallery';
import { UserContext } from './components/UserContext';
import { useState } from 'react';
import './App.scss';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/useradd" element={<UserAdd />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/workspaceapplication" element={<WorkspaceApplication />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
