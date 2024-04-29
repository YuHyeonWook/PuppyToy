import {
  Login,
  SignUp,
  Home,
  UserAdd,
  UserProfile,
  WorkspaceApplication,
  Gallery,
  Error,
} from '../pages';
import ProtectedRoute from '../pages/ProtectedRoute';
import PATH from '../lib/const/path';

const routes = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: 'signup',
    element: (
      <ProtectedRoute>
        <SignUp />,
      </ProtectedRoute>
    ),
  },
  {
    path: 'useradd',
    element: (
      <ProtectedRoute>
        <UserAdd />,
      </ProtectedRoute>
    ),
  },
  {
    path: 'home',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'userprofile',
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'workspaceapplication',
        element: (
          <ProtectedRoute>
            <WorkspaceApplication />
          </ProtectedRoute>
        ),
      },
      {
        path: 'gallery',
        element: (
          <ProtectedRoute>
            <Gallery />,
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <ProtectedRoute>
        <Error />,
      </ProtectedRoute>
    ),
  },
];

export default routes;
