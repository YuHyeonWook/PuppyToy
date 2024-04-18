import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../styles/Gallery.scss';
import '../styles/Loading.scss';
import Dog from '../components/Dog';
import Footer from '../components/Footer';

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
      <div className="gallery">
        <div className="dogs">
          {dogsData.map((dog) => (
            <Dog key={dog.id} dog={dog} />
          ))}
        </div>
        {isLoading && (
          <div className="spinner">
            <span className="spinner-inner-1"></span>
            <span className="spinner-inner-2"></span>
            <span className="spinner-inner-3"></span>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
