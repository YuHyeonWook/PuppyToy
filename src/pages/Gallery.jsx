import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../styles/Gallery.scss';
import '../styles/LoadingStyle.scss';
import Dog from '../components/Dog';

const Gallery = () => {
  const [dogsData, setDogsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = 'live_3qoCzy9xbdRPc32Nij1GI4AdVa4jUW6cJvlZ9gAz84kxNbWOlxC8994mgKDMupyf';

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://api.thedogapi.com/v1/images/search', {
          params: {
            limit: 16,
            size: 'small',
          },
          headers: {
            'x-api-key': apiKey,
          },
        });
        setDogsData(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
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
        <h1>강아지 갤러리</h1>
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
    </>
  );
};

export default Gallery;
