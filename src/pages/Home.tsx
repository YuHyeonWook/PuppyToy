import React from 'react';
import Header from '../components/Header';
import Time from '../components/Time';
import DogRecommend from '../components/DogRecommend';
import Footer from '../components/Footer';

export const Home = () => {
  return (
    <>
      <Header />
      <Time />
      <DogRecommend />
      <Footer />
    </>
  );
};
