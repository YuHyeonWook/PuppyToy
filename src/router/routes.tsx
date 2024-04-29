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

const routes = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <SignUp />,
  },
  {
    path: 'useradd',
    element: <UserAdd />,
  },
  {
    path: 'home',
    element: <Home />,
    children: [
      {
        path: 'userprofile',
        element: <UserProfile />,
      },
      {
        path: 'workspaceapplication',
        element: <WorkspaceApplication />,
      },
      {
        path: 'gallery',
        element: <Gallery />,
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
];

export default routes;
