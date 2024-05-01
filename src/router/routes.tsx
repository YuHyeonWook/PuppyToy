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
import { PATH } from '../lib/constants/path';

const routes = [
  {
    path: PATH.LOGIN,
    element: <Login />,
  },
  {
    path: PATH.SIGNUP,
    element: (
      <ProtectedRoute>
        <SignUp />,
      </ProtectedRoute>
    ),
  },
  {
    path: PATH.USER_ADD,
    element: (
      <ProtectedRoute>
        <UserAdd />,
      </ProtectedRoute>
    ),
  },
  {
    path: PATH.HOME,
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: PATH.USER_PROFILE,
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: PATH.WORKSPACE_APPLICATION,
    element: (
      <ProtectedRoute>
        <WorkspaceApplication />
      </ProtectedRoute>
    ),
  },
  {
    path: PATH.GALLERY,
    element: (
      <ProtectedRoute>
        <Gallery />
      </ProtectedRoute>
    ),
  },

  {
    path: PATH.ERROR,
    element: (
      <ProtectedRoute>
        <Error />,
      </ProtectedRoute>
    ),
  },
];

export default routes;
