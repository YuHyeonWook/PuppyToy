import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import DogInfo from '../components/DogInfo';
import Footer from '../components/Footer';
import '@styles/Gallery.scss';
import '@styles/Loading.scss';
import Loading from '../components/Loading';
import { fetchDogs } from '../api/fetchDogs';

export const Gallery = () => {
  const [dogsData, setDogsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDogs = async () => {
      setIsLoading(true);
      const dogsData = await fetchDogs({ limitNumber: 16 });
      setDogsData(dogsData);
      setIsLoading(false);
    };
    getDogs();
  }, []);

  return (
    <>
      <Header />
      <div className={`gallery ${isLoading ? 'loading' : 'loaded'}`}>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="dogs">
            {dogsData.map((dog) => (
              <DogInfo key={dog.id} dog={dog} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
