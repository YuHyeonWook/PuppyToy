import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRouteProps } from '../lib/types/PropsTypes';

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && location.pathname !== '/' && location.pathname !== '/signup') {
        navigate('/', { replace: true });
      } else if (user && (location.pathname === '/' || location.pathname === '/signup')) {
        navigate('/home', { replace: true }); // 인증된 사용자를 /home 경로로 리디렉션
      }
    });

    return unsubscribe;
  }, [auth, location.pathname, navigate]);

  return children;
};

export default ProtectedRoute;
