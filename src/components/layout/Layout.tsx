import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { PropsWithChildren } from 'react';

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
