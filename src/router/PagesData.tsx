import {
  Login,
  SignUp,
  Home,
  UserAdd,
  UserProfile,
  WorkspaceApplication,
  Gallery,
  NotFound,
} from '../pages';

export const PagesData = [
  {
    path: '',
    element: <Login />,
    title: 'home',
  },
  {
    path: 'signup',
    element: <SignUp />,
    title: 'signup',
  },
  {
    path: 'useradd',
    element: <UserAdd />,
    title: 'useradd',
  },
  {
    path: 'home',
    element: <Home />,
    title: 'home',
  },
  {
    path: 'userprofile',
    element: <UserProfile />,
    title: 'userprofile',
  },
  {
    path: 'workspaceapplication',
    element: <WorkspaceApplication />,
    title: 'workspaceapplication',
  },
  {
    path: 'gallery',
    element: <Gallery />,
    title: 'gallery',
  },
  {
    path: '*',
    element: <NotFound />,
    title: 'notfound',
  },
];
