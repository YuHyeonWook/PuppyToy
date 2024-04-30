import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import DogInfo from '../components/DogInfo';
import Footer from '../components/Footer';
import '@styles/Gallery.scss';
import '@styles/Loading.scss';
import Loading from '../components/Loading';

export const Gallery = () => {
  const [dogsData, setDogsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://api.thedogapi.com/v1/images/search', {
          params: {
            limit: 16,
            size: 'small',
            has_breeds: true,
          },
          headers: {
            'x-api-key': import.meta.env.VITE_THEDOG_API_KEY,
          },
        });
        setDogsData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error API dogs:', error);
      }
    };
    fetchDogs();
  }, []);

  return (
    <>
      <Header />
      <div className="gallery" style={{ height: `${isLoading ? '80vh' : 'auto'}` }}>
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
